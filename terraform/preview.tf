# Pull request previews on Cloudflare Pages, in ./preview. They are managed
# only when a Cloudflare token is given, so everything else plans and applies
# with GitHub access alone:
#
#   TF_VAR_cloudflare_api_token=... tofu plan
#
# Without one the module is disabled, which forgets its objects from your
# state rather than deleting them.

variable "replace_preview_token" {
  description = "Set on the apply that replaces the preview deploy token; see the README."
  type        = bool
  default     = false
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token; leave unset to skip the preview setup."
  type        = string
  default     = null
  sensitive   = true
}

locals {
  cloudflare = nonsensitive(var.cloudflare_api_token != null)

  # Not a secret: it names the account, it doesn't grant access to it. It's
  # the first part of the dashboard's URL after logging in.
  cloudflare_account_id = "2428fd89017b196e35a0cd4374de4c50"
}

# Give the token through the variable only. The provider would also pick up
# CLOUDFLARE_API_TOKEN from the environment, without the module being
# enabled; a deploy token in your state would then be revoked rather than
# forgotten.
provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

module "preview" {
  source = "./preview"

  account_id  = local.cloudflare_account_id
  repository  = github_repository.repo.name
  environment = github_repository_environment.preview.environment

  replace_token = var.replace_preview_token

  lifecycle {
    enabled = local.cloudflare
  }
}

# A check that fails is reported as a warning, not an error, on plan and
# apply; it only makes the skip visible.
check "preview_managed" {
  assert {
    condition     = local.cloudflare
    error_message = "Skipping the pull request previews (Cloudflare Pages project, deploy token, GitHub secret): no Cloudflare token. Set TF_VAR_cloudflare_api_token to manage them."
  }
}
