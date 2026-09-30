import { MantineProvider } from "@mantine/core";
import {
  RouterProvider,
  createMemoryHistory,
  createRouter,
} from "@tanstack/react-router";
import { renderToString } from "react-dom/server";

import { routeTree } from "./routeTree.gen";
import { headTags } from "./seo";
import { theme } from "./theme";

// Build-time render of the home page, so crawlers that don't run JavaScript
// (most AI crawlers don't) get the whole page. scripts/prerender.mjs writes
// the result into dist/index.html; main.tsx hydrates it in the browser.
export async function render(): Promise<{ html: string; head: string }> {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  await router.load();
  const html = renderToString(
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <RouterProvider router={router} />
    </MantineProvider>,
  );
  return { html, head: headTags() };
}
