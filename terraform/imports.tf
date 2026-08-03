# Adopting the existing objects into a fresh state.
#
# State is per-user and never committed, so everyone starts empty and adopts
# what already exists instead of trying to recreate it. `tofu apply` does that
# on its own through these blocks, and they are no-ops once the objects are in
# state.
#
# They get in the way exactly once: the first apply of all, when none of these
# objects exist yet and an import of a missing object is an error. Comment this
# file out for that run, then put it back.

import {
  to = github_repository.repo
  id = var.github_repository_name
}

import {
  to = github_repository_pages.repo
  id = var.github_repository_name
}

import {
  to = github_repository_vulnerability_alerts.repo
  id = var.github_repository_name
}

import {
  to = github_branch_protection.main
  id = "${var.github_repository_name}:${local.protected_branch}"
}
