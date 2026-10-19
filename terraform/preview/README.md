# Pull request previews

OpenTofu configuration for the previews: the Cloudflare Pages project, the token
CI deploys with, and the GitHub `preview` environment that hands both to the
workflow. It is separate from the repository settings so that those need no
Cloudflare access.

## Running it

Log in to GitHub as for the repository settings, then make a Cloudflare API
token under Manage Account › Account API Tokens with two permissions: Account ›
Cloudflare Pages › Edit and Account › Account API Tokens › Edit.

```sh
cd terraform/preview
tofu init
TF_VAR_cloudflare_api_token=... tofu apply
```

Without the variable, OpenTofu asks for the token. Your first plan adopts what
already exists, so it should show imports and no changes.

## Replacing the deploy token

If it leaked, or for any other reason:

```sh
tofu apply -var replace_token=true -replace=cloudflare_account_token.deploy
```

The old token is revoked and the GitHub secret is rewritten. Everyone else's
next plan stops with the command that brings their state up to date.

## The login

The previews' login is a shared password whose hashes live in
`functions/_middleware.ts`. To change it, run `npm run preview-password` and
commit the result.
