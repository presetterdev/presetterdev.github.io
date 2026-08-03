# Conventions

## Before committing

Run `npm run check`. It must exit zero, and it is what CI runs. For formatting
complaints, `npm run format` fixes them; for overlong comments,
`npx oxlint --fix` rewraps them.

## Do not weaken the checks

Never relax a rule, add an ignore comment, or ignore a file to make an error go
away. Fix the code. Changing a rule is its own commit, explaining why.

Enforced: no `any`, no type assertions, explicit return types, comments no wider
than 80 columns (URLs and code samples may overflow).

## Layout

```text
src/routes/        one file per page
src/components/    components shared between pages
src/media/         images/ and video/
src/theme.ts       colors, fonts, radii, spacing
src/index.css      global styles
terraform/         the GitHub repository's settings
```

## Adding a page

Add a file to `src/routes/`; its name is the URL. `src/routeTree.gen.ts`
regenerates on dev or build — commit it too, since CI fails when it is stale.

## Adding media

Drop the file in `src/media/images/` or `src/media/video/` and import it:

```tsx
import shot from "../media/images/shot.png";

<Image src={shot} alt="The plugin browser" />;
```

Import it, never a path string: a typo becomes a build error rather than a
broken image, and the build fingerprints the file for cache busting.

## Building UI

Prefer Mantine components over raw HTML and hand-written CSS. Site-wide visual
choices belong in `src/theme.ts`.

## Commits

Conventional Commits, with a body saying why. No period on the subject.
