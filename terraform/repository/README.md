# Repository settings

OpenTofu configuration for the site's GitHub repository: merge options, Pages at
`presetter.audio`, branch protection on `main` and vulnerability alerts. It also
reads the domain's DNS, which is edited by hand at Porkbun, and fails the plan
when it isn't what Pages needs.

## Running it

1. Install OpenTofu 1.12 or newer, e.g. `brew install opentofu`.
2. Log in to GitHub with an account that is an admin of the repository:

   ```sh
   gh auth login
   ```

   The provider takes its token from the GitHub CLI, or from `GITHUB_TOKEN` when
   that is set.

3. Plan, read it, apply:

   ```sh
   cd terraform/repository
   tofu init
   tofu plan
   tofu apply
   ```

State stays on your machine and is never committed. Your first plan adopts what
already exists through the import blocks in `imports.tf`, so it should show
imports and no changes.

An import of a GitHub setting fails when the setting doesn't exist yet. That
happens once, on the apply that first creates a newly added resource: comment
the block out for that apply, then put it back.
