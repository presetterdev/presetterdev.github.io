import { Outlet, createRootRoute } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const Route = createRootRoute({ component: RootLayout });

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
