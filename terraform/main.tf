variable "github_owner" {
  description = "GitHub organization that owns the repository."
  type        = string
  default     = "presetterdev"
}

variable "github_repository_name" {
  description = "Name of the repository."
  type        = string
  default     = "presetterdev.github.io"
}

locals {
  # The branch CI deploys from, and so the only one worth protecting.
  protected_branch = "main"
}

# Use the GitHub CLI for auth.
provider "github" {
  owner = var.github_owner
}

resource "github_repository" "repo" {
  name         = var.github_repository_name
  description  = "Presetter's website."
  homepage_url = "https://presetterdev.github.io"
  visibility   = "public"

  has_issues   = true
  has_projects = false
  has_wiki     = false

  allow_merge_commit     = false
  allow_rebase_merge     = false
  allow_squash_merge     = true
  delete_branch_on_merge = true
}

# Pages serves the artifact the CI workflow uploads, not a branch.
resource "github_repository_pages" "repo" {
  repository = github_repository.repo.name
  build_type = "workflow"
}

resource "github_repository_vulnerability_alerts" "repo" {
  repository = github_repository.repo.name
}

# What actually stops an unreviewed change reaching production: main only
# moves through a pull request whose CI job passed.
#
# This holds on a free organization plan only because the repository is
# public; branch protection does not apply to a private repository on a free
# plan. Making this repository private means paying for Team or losing the
# guard, so `visibility` above is load-bearing.
resource "github_branch_protection" "main" {
  repository_id = github_repository.repo.node_id
  pattern       = local.protected_branch

  required_status_checks {
    strict   = true
    contexts = ["check"]
  }

  required_pull_request_reviews {
    required_approving_review_count = 0
    dismiss_stale_reviews           = true
  }
}
