import { MantineProvider } from "@mantine/core";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import { routeTree } from "./routeTree.gen";
import { theme } from "./theme";

import "@mantine/core/styles.css";
import "./index.css";

// Keeps the router's idea of the URL prefix in step with Vite's `base`, so
// the subpath GitHub Pages serves us from is configured in exactly one place.
const router = createRouter({
  routeTree,
  basepath: import.meta.env.BASE_URL,
});

// Gives every useNavigate/Link call in the app the real route table's types.
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root");
if (rootElement === null) {
  throw new Error("index.html is missing its #root element.");
}

const app = (
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
);

// Production HTML is prerendered (see scripts/prerender.mjs), so the browser
// hydrates it; dev serves an empty root and renders from scratch. Before
// hydrating, the router loads its matches and is marked as hydrating, so it
// renders the same tree the server did instead of a Suspense boundary the
// server never wrote.
async function start(root: HTMLElement): Promise<void> {
  if (root.hasChildNodes()) {
    await router.load();
    router.ssr = { manifest: undefined };
    hydrateRoot(root, app);
  } else {
    createRoot(root).render(app);
  }
}

await start(rootElement);
