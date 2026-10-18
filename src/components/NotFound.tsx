import { Anchor, Button, Stack, Text, Title } from "@mantine/core";
import { type ReactElement, useEffect } from "react";

import { notFound } from "../content";
import { site } from "../seo";
import { openEvent } from "./PocketSynth";
import { Section } from "./Section";

// Rendered by the router for any path without a route, inside the usual
// header and footer. The prerender writes it to 404.html, which Pages
// serves for unknown addresses, so what the browser paints first is this
// page and not the home page swapped out after hydration.
export function NotFound(): ReactElement {
  useEffect(() => {
    document.title = `${notFound.title} — ${site.name}`;
  }, []);
  return (
    <Section id="not-found" tight>
      <Stack gap="md" maw={640} align="flex-start">
        <Text size="sm" c="dimmed" fw={600}>
          404
        </Text>
        <Title order={1} fz={{ base: 34, md: 44 }}>
          {notFound.title}
        </Title>
        <Text size="lg" lh={1.55}>
          {notFound.body}
        </Text>
        <Text size="sm" c="dimmed">
          {notFound.hint}{" "}
          <Anchor
            component="button"
            type="button"
            size="sm"
            c="dimmed"
            underline="always"
            onClick={() => {
              window.dispatchEvent(new Event(openEvent));
            }}
          >
            {notFound.hintAction}
          </Anchor>
        </Text>
        <Button
          component="a"
          href={notFound.href}
          mt="sm"
          color="ink"
          c="brand.4"
        >
          {notFound.cta}
        </Button>
      </Stack>
    </Section>
  );
}
