variable "github_owner" {
  description = "GitHub organization that owns the repository."
  type        = string
  default     = "presetterdev"
}

variable "github_repository_name" {
  description = "Name of the repository."
  type        = string
  # Use the actual site name for a cleaner pages URL (i.e. with no
  # subpath in the URL. When we have a custom domain, we're free to
  # change this to something more current.
  default = "presetterdev.github.io"
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
  homepage_url = "https://presetter.audio"
  visibility   = "public"

  has_issues   = true
  has_projects = false
  has_wiki     = false

  # Squash for the usual single logical change, rebase when the individual
  # commits are worth keeping. Both leave main linear; merge commits do not,
  # and GitHub offers no way to mark one of the two as the default -- it lists
  # squash first and then remembers each person's last choice.
  allow_merge_commit     = false
  allow_rebase_merge     = true
  allow_squash_merge     = true
  delete_branch_on_merge = true

  # Make a squash commit read like a commit someone wrote, rather than the
  # defaults, which take the title from the sole commit when a pull request
  # has exactly one and concatenate every work-in-progress message into the
  # body otherwise.
  squash_merge_commit_title   = "PR_TITLE"
  squash_merge_commit_message = "PR_BODY"
}

# Pages serves the artifact the CI workflow uploads, not a branch, at the
# custom domain. DNS for presetter.audio lives at the registrar: A records
# for the apex to GitHub Pages' four IPs, and a CNAME for www to
# presetterdev.github.io. public/CNAME carries the same name into every
# deploy so a settings change can't silently drop it.
resource "github_repository_pages" "repo" {
  repository = github_repository.repo.name
  build_type = "workflow"
  cname      = "presetter.audio"
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

  # Organization owners keep a deliberate override: stepping outside the rules
  # below takes an admin clicking past a warning, rather than a rule quietly
  # not applying.
  enforce_admins = false

  # No merge commits on main. Squash is already the only merge button the
  # repository offers; this is the guarantee at the branch itself.
  required_linear_history = true

  required_status_checks {
    strict   = true
    contexts = ["check"]
  }

  required_pull_request_reviews {
    required_approving_review_count = 0
    dismiss_stale_reviews           = true
  }
}
