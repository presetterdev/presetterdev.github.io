import { Container } from "@mantine/core";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import type { ReactElement } from "react";

export const Route = createRootRoute({ component: RootLayout });

// Wraps every page. Site-wide chrome (header, footer, nav) goes here.
function RootLayout(): ReactElement {
  return (
    <Container size="md" py="xl">
      <Outlet />
    </Container>
  );
}
