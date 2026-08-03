# presetter-site

Presetter's website.

## Setup

Node 24, pinned in `.node-version`.

```sh
npm install
npm run dev
```

## Commands

- `npm run dev` — dev server
- `npm run build` — production build into `dist/`
- `npm run preview` — serve that build locally
- `npm run check` — lint, types, comment width, markdown, formatting
- `npm run format` — fix formatting

`npm run check` is what CI runs. Run it before pushing.

## Deployment

Pushing to `main` publishes to GitHub Pages. Pull requests only run checks, and
cannot merge until those pass.

## Repository settings

Pages, branch protection and alerts live in `terraform/`, not the web UI. State
is not committed: the first apply adopts what already exists.

```sh
gh auth login
cd terraform && tofu init && tofu apply
```
