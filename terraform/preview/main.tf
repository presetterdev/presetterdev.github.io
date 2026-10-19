# Pull request previews: the Cloudflare Pages project they deploy to, the
# token CI deploys with, and the GitHub environment that hands both to the
# workflow. The login in front of the previews needs nothing here; see
# functions/_middleware.ts.

variable "github_owner" {
  description = "GitHub organization that owns the repository."
  type        = string
  default     = "presetterdev"
}

variable "github_repository_name" {
  description = "Repository whose pull requests are previewed."
  type        = string
  default     = "presetterdev.github.io"
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token to manage the previews with."
  type        = string
  sensitive   = true
}

variable "replace_token" {
  description = "Set on the apply that replaces the deploy token on purpose."
  type        = bool
  default     = false
}

# Use the GitHub CLI for auth.
provider "github" {
  owner = var.github_owner
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

locals {
  # Not a secret: it names the account, it doesn't grant access to it. It's
  # the first part of the dashboard's URL after logging in.
  account_id = "2428fd89017b196e35a0cd4374de4c50"

  repository   = var.github_repository_name
  environment  = "preview"
  project_name = "presetter-site-preview"
  token_name   = "presetter-site preview deploys"
  secret_name  = "CLOUDFLARE_API_TOKEN"
  account_name = "CLOUDFLARE_ACCOUNT_ID"
}

# The environment the preview job runs in, which holds nothing but what this
# configuration puts in it.
resource "github_repository_environment" "preview" {
  repository  = local.repository
  environment = local.environment
}

# What already exists, so imports.tf can adopt it instead of failing to create
# it twice. These name the environment rather than refer to the resource above:
# a data source depending on a resource with pending changes, an import among
# them, is read only at apply, too late for the imports.

data "cloudflare_pages_projects" "all" {
  account_id = local.account_id
}

data "cloudflare_account_tokens" "all" {
  account_id = local.account_id
}

data "cloudflare_account_api_token_permission_groups_list" "all" {
  account_id = local.account_id
}

data "github_actions_environment_secrets" "preview" {
  name        = local.repository
  environment = local.environment
}

data "github_actions_environment_variables" "preview" {
  name        = local.repository
  environment = local.environment
}

locals {
  secret_names   = [for secret in data.github_actions_environment_secrets.preview.secrets : secret.name]
  variable_names = [for variable in data.github_actions_environment_variables.preview.variables : variable.name]

  existing_token = one([
    for token in data.cloudflare_account_tokens.all.result :
    token.id if token.name == local.token_name
  ])

  pages_write = one([
    for group in data.cloudflare_account_api_token_permission_groups_list.all.result :
    group.id if group.name == "Pages Write"
  ])

  # Import IDs of the objects that already exist, null for those that don't.
  adopt = {
    project = contains([for project in data.cloudflare_pages_projects.all.result : project.name], local.project_name) ? "${local.account_id}/${local.project_name}" : null
    token   = local.existing_token == null ? null : "${local.account_id}/${local.existing_token}"
    secret  = contains(local.secret_names, local.secret_name) ? "${local.repository}:${local.environment}:${local.secret_name}" : null
    account = contains(local.variable_names, local.account_name) ? "${local.repository}:${local.environment}:${local.account_name}" : null
  }
}

# Nothing deploys to main here, so every deployment is a preview.
resource "cloudflare_pages_project" "preview" {
  account_id        = local.account_id
  name              = local.project_name
  production_branch = "main"
}

# The token CI deploys with. Nobody needs to know its value: anyone with a
# Cloudflare token of their own can replace it, which revokes the old one, and
# the GitHub secret below follows. See the README for the command.
resource "cloudflare_account_token" "deploy" {
  account_id = local.account_id
  name       = local.token_name

  policies = [{
    effect            = "allow"
    permission_groups = [{ id = local.pages_write }]
    resources = jsonencode({
      "com.cloudflare.api.account.${local.account_id}" = "*"
    })
  }]
}

# The deploy token this state last saw. When someone else replaces the token,
# the one in your state is gone from Cloudflare and your next plan would
# quietly create another; comparing this with the token Cloudflare has now
# stops that plan instead (see the secret's precondition). It is updated only
# on a deliberate replacement, so it still holds the old ID when that check
# runs.
resource "terraform_data" "token_seen" {
  input            = cloudflare_account_token.deploy.id
  triggers_replace = var.replace_token ? cloudflare_account_token.deploy.id : null

  lifecycle {
    ignore_changes = [input]
  }
}

# Holds the token's value for the preview job. Terraform only ever creates or
# replaces it, never updates it. For a state that adopted the token rather
# than created it, the value is unknown and the secret is left alone.
resource "github_actions_environment_secret" "token" {
  repository  = local.repository
  environment = github_repository_environment.preview.environment
  secret_name = local.secret_name
  value       = cloudflare_account_token.deploy.value == null ? "" : cloudflare_account_token.deploy.value

  lifecycle {
    # An update would push this state's copy of the value, which is empty for
    # anyone who adopted the token. The GitHub provider is built on the
    # legacy plugin SDK, for which OpenTofu discards every planned update
    # under `all`, including the ones the provider plans itself when the
    # secret changed elsewhere.
    ignore_changes       = all
    replace_triggered_by = [cloudflare_account_token.deploy.id]

    precondition {
      condition = (
        var.replace_token ||
        local.existing_token == null ||
        local.existing_token == terraform_data.token_seen.output
      )
      error_message = "Someone else has replaced the preview deploy token since your last apply. Forget the old one, and the next plan adopts the current one: tofu state rm cloudflare_account_token.deploy terraform_data.token_seen"
    }

    precondition {
      condition = (
        cloudflare_account_token.deploy.value != null ||
        contains(local.secret_names, local.secret_name)
      )
      error_message = "The ${local.secret_name} secret is missing and this state doesn't hold the token's value to recreate it. Replace the token: tofu apply -var replace_token=true -replace=cloudflare_account_token.deploy"
    }
  }
}

resource "github_actions_environment_variable" "account" {
  repository    = local.repository
  environment   = github_repository_environment.preview.environment
  variable_name = local.account_name
  value         = local.account_id
}
