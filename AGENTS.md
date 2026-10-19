# Conventions

## Making a change

Work on a branch. Before pushing it, run `npm run check`; it must exit zero, and
it is what CI runs. `npm run format` fixes formatting complaints and
`npx oxlint --fix` rewraps overlong comments.

Then open a pull request. Nothing else reaches `main`, and it will not merge
until CI is green.

## Do not weaken the checks

Never relax a rule, add an ignore comment, or ignore a file to make an error go
away. Fix the code. Changing a rule is its own commit, explaining why.

Enforced: no `any`, no type assertions, explicit return types, no colours
outside `src/tokens.css`, comments no wider than 80 columns (URLs and code
samples may overflow).

## Layout

```text
messages/en.yaml   every word on the site
src/routes/        one file per page
src/components/    components shared between pages
src/media/         images/ and video/
src/theme.ts       Mantine: the two base colours, fonts, radii
src/tokens.css     every other colour
src/index.css      global styles
terraform/         the GitHub repository's settings
```

## Changing words

Edit `messages/en.yaml`. Components never contain text of their own; lint
rejects words written into markup. The legal pages are the exception: each is
one dated document in `src/legal.ts`.

## Tests

Behaviour that a click or a key press drives gets a test beside its component,
as `Name.test.tsx`, run by `npm test` (Vitest, Testing Library, jsdom) and by
`npm run check`. Test what a visitor does and sees, not the component's
internals; pass fakes in for anything the browser does that jsdom cannot, like
audio.

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

Prefer Mantine components over raw HTML and hand-written CSS. Colours live in
`src/tokens.css` as `--pt-*` custom properties; component styles use those, and
lint rejects a colour written anywhere else. Fonts and radii are in
`src/theme.ts`.

## Commits

Conventional Commits, with a body saying why. No period on the subject.

A squash merge takes the pull request's title and description as the commit
message, so write those the way you would write a commit. CI rejects a title
that is not a valid Conventional Commit. Rebase merging is there for when the
individual commits are worth keeping, and then each of them has to stand on its
own — nothing checks those, so the care has to come from you.
