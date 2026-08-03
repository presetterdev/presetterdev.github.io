# Architecture

A static single-page React application, built by Vite and served by GitHub
Pages. No backend, no database, no server-side rendering.

React 19, Mantine, TanStack Router, Vite, TypeScript 7, Oxlint with tsgolint,
Prettier.

## Linting covers the whole source tree

Type-aware linting is a constraint here, not a convenience. Every source file is
`.ts` or `.tsx`, which Oxlint and tsgolint analyse completely; no templating
language sits outside that coverage.

Comment width is the one gap, since Oxlint implements no `max-len` rule and
Prettier does not rewrap comment text. `eslint-plugin-comment-length` closes it,
loaded through Oxlint's ESLint-compatible JS plugin API. That API is alpha; if
it breaks, the comment rules are dropped rather than ESLint reinstated.

Documentation is held to the same standard: Prettier formats Markdown and
markdownlint checks its structure. Width is Prettier's to enforce, so `MD013` is
off.

## Rendering is client-side

The site ships an application shell and renders in the browser, so crawlers and
link unfurls see only the metadata in `index.html`. That suffices while the site
is one page with fixed metadata.

A second page needing its own title, description or preview image forces
prerendering to static HTML at build time. Prerendering this stack is the
smaller change and keeps the coverage above. A generator such as Astro is the
larger one, justified only by a shift toward content, and it displaces Mantine,
which assumes a single React root.

Pages stay thin and logic stays in components, which is what holds both options
open.

## The route table is generated and committed

TanStack Router derives `src/routeTree.gen.ts` from the files in `src/routes/`.
Committed generated files drift from their sources, so CI regenerates it and
fails on any difference. It is excluded from linting and formatting.

## Media is imported, not referenced by path

Images and video live in `src/media/`, not `public/`, and the code displaying
them imports them. A missing file is therefore a build failure rather than a
production 404, and the build fingerprints filenames for cache busting.
Everything imported is copied through the build, so video large enough to slow
it belongs on another host.

## The site is served from the domain root

The repository is named `presetterdev.github.io`, so Pages serves it at the
organization root and Vite's `base` is `/`. The router derives its `basepath`
from that value, leaving one place to change for a custom domain or a subpath.

## Deployment is a workflow artifact

CI uploads `dist/` as a Pages artifact and a second job deploys it; Pages is not
pointed at a branch. `index.html` is copied to `404.html`: a static host has no
server-side routing, so unknown paths must return the shell for the router to
resolve.

## The repository configures itself

`terraform/` describes Pages, branch protection and vulnerability alerts, so
those settings are reviewable and reproducible rather than remembered.

State is per-user and never committed, and there is no remote backend.
`terraform/imports.tf` adopts the existing objects instead, so a fresh clone
converges on the real configuration rather than trying to recreate it. Nothing
has to be shared, kept in sync, or scrubbed before it reaches the repository.
