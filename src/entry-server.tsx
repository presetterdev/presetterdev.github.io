import { MantineProvider } from "@mantine/core";
import {
  RouterProvider,
  createMemoryHistory,
  createRouter,
} from "@tanstack/react-router";
import { renderToString } from "react-dom/server";

import { routeTree } from "./routeTree.gen";
import { headTags, pageHeadTags } from "./seo";
import { theme } from "./theme";

// Build-time render of one page, so crawlers that don't run JavaScript
// (most AI crawlers don't) get the whole page. src/prerender.ts writes the
// result into dist/<path>/index.html; main.tsx hydrates it in the browser.
export async function render(
  path: string,
): Promise<{ html: string; head: string }> {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  await router.load();
  const html = renderToString(
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <RouterProvider router={router} />
    </MantineProvider>,
  );
  return { html, head: path === "/" ? headTags() : pageHeadTags(path) };
}
