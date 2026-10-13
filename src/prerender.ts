import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import { beta, license, notFound, privacy } from "./content";
import { render } from "./entry-server";
import { site } from "./seo";

// Runs after `vite build`, as the SSR bundle's entry: renders each page to
// static HTML so crawlers that don't execute JavaScript (most AI crawlers
// don't) see the whole page. The home page overwrites dist/index.html; the
// others land at dist/<path>/index.html, which is where Pages looks for
// them. main.tsx hydrates each in the browser.
const dist = "dist";
const templatePath = join(dist, "index.html");
const rootTag = '<div id="root"></div>';

interface Page {
  path: string;
  // The home page keeps the title and description index.html carries.
  head: { title: string; description: string; noindex?: boolean } | undefined;
  // Where the page lands, when not dist/<path>/index.html.
  file?: string;
}

const pages: readonly Page[] = [
  { path: "/", head: undefined },
  {
    path: "/license",
    head: {
      title: license.title,
      description: `${license.title}, beta terms included.`,
    },
  },
  {
    path: "/privacy",
    head: {
      title: privacy.title,
      description:
        "What Presetter collects and why: your presets stay on your Mac; an " +
        "email address if you give one; a license-key check when the app " +
        "runs.",
    },
  },
  {
    path: "/beta",
    head: {
      title: beta.title,
      description: "Download page for invited Presetter beta testers.",
      noindex: true,
    },
  },
  {
    // No route matches this path, so the router renders the not-found page;
    // Pages serves 404.html for every address without a file.
    path: "/404",
    head: {
      title: notFound.title,
      description: notFound.body,
      noindex: true,
    },
    file: join(dist, "404.html"),
  },
];

const template = await readFile(templatePath, "utf8");
if (!template.includes(rootTag)) {
  throw new Error(`${templatePath} is missing ${rootTag}`);
}

function escape(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll('"', "&quot;");
}

async function prerender(page: Page): Promise<void> {
  const { html, head } = await render(page.path);
  let output = template
    .replace(rootTag, `<div id="root">${html}</div>`)
    .replace("</head>", `    ${head}\n  </head>`);
  if (page.head !== undefined) {
    output = output
      .replace(
        /<title>[\s\S]*?<\/title>/,
        `<title>${escape(page.head.title)} — ${site.name}</title>`,
      )
      .replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
        `<meta name="description" content="${escape(page.head.description)}" />`,
      );
    if (page.head.noindex === true) {
      output = output.replace(
        "</head>",
        '    <meta name="robots" content="noindex, nofollow" />\n  </head>',
      );
    }
  }
  const file =
    page.file ??
    (page.path === "/" ? templatePath : join(dist, page.path, "index.html"));
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, output);
}

await Promise.all(pages.map(prerender));
