import { readFile, writeFile } from "node:fs/promises";

import { render } from "./entry-server";

// Runs after `vite build`, as the SSR bundle's entry: renders the home page
// to static HTML and writes it into dist/index.html, so crawlers that don't
// execute JavaScript (most AI crawlers don't) see the whole page. main.tsx
// hydrates it in the browser.
const path = "dist/index.html";
const rootTag = '<div id="root"></div>';

const template = await readFile(path, "utf8");
if (!template.includes(rootTag)) {
  throw new Error(`${path} is missing ${rootTag}`);
}

const { html, head } = await render();
const output = template
  .replace(rootTag, `<div id="root">${html}</div>`)
  .replace("</head>", `    ${head}\n  </head>`);
await writeFile(path, output);
