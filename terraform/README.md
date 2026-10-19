# Repository settings

OpenTofu configuration for the site's GitHub repository: merge options, Pages at
`presetter.audio`, branch protection on `main` and vulnerability alerts. It also
reads the domain's DNS, which is edited by hand at Porkbun, and fails the plan
when it isn't what Pages needs.

With a Cloudflare token it also manages pull request previews: the Cloudflare
Pages project, the token CI deploys with, and the GitHub `preview` environment
that hands both to the workflow. Without one, that part is skipped and the rest
works as usual.

## Running it

1. Install OpenTofu 1.12 or newer, e.g. `brew install opentofu`.
2. Log in to GitHub with an account that is an admin of the repository:

   ```sh
   gh auth login
   ```

   The provider takes its token from the GitHub CLI, or from `GITHUB_TOKEN` when
   that is set.

3. Optionally, for the previews, give it a Cloudflare API token through this
   variable, never as `CLOUDFLARE_API_TOKEN`:

   ```sh
   export TF_VAR_cloudflare_api_token=...
   ```

   Make the token under Manage Account › Account API Tokens with two
   permissions: Account › Cloudflare Pages › Edit and Account › Account API
   Tokens › Edit.

4. Plan, read it, apply:

   ```sh
   cd terraform
   tofu init
   tofu plan
   tofu apply
   ```

State stays on your machine and is never committed. Your first plan adopts what
already exists through the import blocks in `imports.tf`, so it should show
imports and no changes.

An import of a GitHub setting fails when the setting doesn't exist yet. That
happens once, on the apply that first creates a newly added resource: comment
the block out for that apply, then put it back. The preview imports check first
and need none of this.

## Previews

The very first time, apply without a Cloudflare token, then again with one: the
preview setup reads the GitHub environment the first apply creates.

To replace the deploy token, if it leaked or for any other reason:

```sh
tofu apply -var replace_preview_token=true \
  -replace=module.preview.cloudflare_account_token.deploy
```

The old token is revoked and the GitHub secret is rewritten. Everyone else's
next plan stops with the command that brings their state up to date.

The previews' login is a shared password whose hashes live in
`functions/_middleware.ts`. To change it, run `npm run preview-password` and
commit the result.
