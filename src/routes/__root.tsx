import { Outlet, createRootRoute } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { NotFound } from "../components/NotFound";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

// Wraps every page: header above, footer below. Sections size themselves.
function RootLayout(): ReactElement {
  return (
    <>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
