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

  domain = "presetter.audio"
}

# Use the GitHub CLI for auth.
provider "github" {
  owner = var.github_owner
}

resource "github_repository" "repo" {
  name         = var.github_repository_name
  description  = "Presetter's website."
  homepage_url = "https://${local.domain}"
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
# custom domain. This setting is the only record of the domain: Pages ignores a
# CNAME file when it publishes from a workflow.
resource "github_repository_pages" "repo" {
  repository = github_repository.repo.name
  build_type = "workflow"
  cname      = local.domain

  # GitHub refuses this until it holds a certificate for the domain, which it
  # requests only once the DNS below is in place and the domain is set above.
  # On the apply that first sets the domain, expect an error here; apply again
  # once the certificate shows as issued in the repository's Pages settings.
  https_enforced = true
}

# The environment the pull request preview job runs in. preview.tf fills it
# with what the job deploys with.
resource "github_repository_environment" "preview" {
  repository  = github_repository.repo.name
  environment = "preview"
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

# DNS for the domain is hosted at Porkbun and edited by hand in its web UI.
# Nothing here writes it, so no Porkbun credential is needed anywhere; the
# data sources below only read the live records, and a plan fails when they
# are not what Pages requires.
#
# A data source errors on read when its name does not resolve at all, before
# its postcondition can say anything. "no such host" therefore means the
# record is missing; the comment above each one names what to create.
#
# Any other A, AAAA or ALIAS record on the apex, such as Porkbun's parking
# page, keeps GitHub from issuing a certificate. The postconditions compare
# whole sets, so a stray record fails the plan too. Porkbun's email-forwarding
# MX and SPF records do not interfere and are not checked.
#
# https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

data "github_ip_ranges" "github" {}

locals {
  # The ranges come as single-address CIDRs. 192.30.252.153 and .154 are
  # deprecated Pages addresses still listed; Pages refuses to verify a domain
  # pointing at them.
  pages_ipv4 = toset([
    for range in data.github_ip_ranges.github.pages_ipv4 :
    split("/", range)[0] if !startswith(range, "192.30.252.")
  ])
  pages_ipv6 = toset([
    for range in data.github_ip_ranges.github.pages_ipv6 : split("/", range)[0]
  ])
}

# Four A records on the apex:
#   185.199.108.153
#   185.199.109.153
#   185.199.110.153
#   185.199.111.153
data "dns_a_record_set" "apex" {
  host = local.domain

  lifecycle {
    postcondition {
      condition     = toset(self.addrs) == local.pages_ipv4
      error_message = "A records for ${self.host} are [${join(", ", sort(self.addrs))}]; Pages needs exactly [${join(", ", sort(local.pages_ipv4))}]."
    }
  }
}

# Four AAAA records on the apex:
#   2606:50c0:8000::153
#   2606:50c0:8001::153
#   2606:50c0:8002::153
#   2606:50c0:8003::153
data "dns_aaaa_record_set" "apex" {
  host = local.domain

  lifecycle {
    postcondition {
      condition     = toset(self.addrs) == local.pages_ipv6
      error_message = "AAAA records for ${self.host} are [${join(", ", sort(self.addrs))}]; Pages needs exactly [${join(", ", sort(local.pages_ipv6))}]."
    }
  }
}

# A CNAME for www to presetterdev.github.io. Pages then redirects www to the
# apex.
data "dns_cname_record_set" "www" {
  host = "www.${local.domain}"

  lifecycle {
    postcondition {
      condition     = self.cname == "${var.github_owner}.github.io."
      error_message = "${self.host} is a CNAME for ${self.cname}; Pages needs ${var.github_owner}.github.io."
    }
  }
}

# Verifying the domain for the organization stops anyone else's Pages site
# from claiming it, or a subdomain of it, should this repository ever stop
# using it. GitHub shows the TXT record to create when the domain is added
# under the organization's settings, Pages, "Add a domain", and offers no API
# to read it back, so the value is copied here by hand.
locals {
  pages_challenge = "7d9346a961c6b5c4c87da8462d2749"
}

data "dns_txt_record_set" "pages_challenge" {
  host = "_github-pages-challenge-${var.github_owner}.${local.domain}"

  lifecycle {
    precondition {
      condition     = local.pages_challenge != null
      error_message = "Add ${local.domain} under https://github.com/organizations/${var.github_owner}/settings/pages and copy the TXT value it shows into local.pages_challenge."
    }
    postcondition {
      condition     = contains(self.records, coalesce(local.pages_challenge, "-"))
      error_message = "TXT records for ${self.host} are [${join(", ", self.records)}]; they must include the value in local.pages_challenge."
    }
  }
}
