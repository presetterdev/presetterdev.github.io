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

Pushing to `main` publishes to GitHub Pages. Pull requests run checks and cannot
merge until those pass; a pull request from a branch in this repository is also
deployed as a preview behind the team's shared login.

## Repository settings

GitHub settings are managed with OpenTofu in `terraform/`, not the web UI. Its
README covers credentials and running it.
