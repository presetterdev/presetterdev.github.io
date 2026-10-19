# Adopting the existing objects into a fresh state.
#
# State is per-user and never committed, so everyone starts empty and adopts
# what already exists instead of trying to recreate it. These are no-ops once
# the objects are in state.
#
# The environment's import fails on the one apply that first creates the
# environment; comment it out for that run. The rest are adopted only when
# they exist, so they never need that.

import {
  to = github_repository_environment.preview
  id = "${var.github_repository_name}:${local.environment}"
}

import {
  for_each = toset(compact([local.adopt.project]))
  to       = cloudflare_pages_project.preview
  id       = each.value
}

import {
  for_each = toset(compact([local.adopt.token]))
  to       = cloudflare_account_token.deploy
  id       = each.value
}

import {
  for_each = toset(compact([local.adopt.secret]))
  to       = github_actions_environment_secret.token
  id       = each.value
}

import {
  for_each = toset(compact([local.adopt.account]))
  to       = github_actions_environment_variable.account
  id       = each.value
}
