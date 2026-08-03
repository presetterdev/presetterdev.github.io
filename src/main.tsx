import { MantineProvider } from "@mantine/core";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

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

createRoot(rootElement).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
);
