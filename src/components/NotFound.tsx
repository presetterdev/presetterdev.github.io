import { ParaglideMessage } from "@inlang/paraglide-js-react";
import { Anchor, Button, Stack, Text, Title } from "@mantine/core";
import { type ReactElement, type ReactNode, useEffect } from "react";

import { m } from "../paraglide/messages.js";
import { site } from "../seo";
import { openEvent } from "./PocketSynth";
import { Section } from "./Section";

// Where the hint's open tag renders: a link that opens the synth.
const markup = {
  open: ({ children }: { children?: ReactNode }): ReactElement => (
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
      {children}
    </Anchor>
  ),
};

// Rendered by the router for any path without a route, inside the usual
// header and footer. The prerender writes it to 404.html, which Pages
// serves for unknown addresses, so what the browser paints first is this
// page and not the home page swapped out after hydration.
export function NotFound(): ReactElement {
  useEffect(() => {
    document.title = `${m.not_found_title()} — ${site.name}`;
  }, []);
  return (
    <Section id="not-found" tight>
      <Stack gap="md" maw={640} align="flex-start">
        <Text size="sm" c="dimmed" fw={600}>
          404
        </Text>
        <Title order={1} fz={{ base: 34, md: 44 }}>
          {m.not_found_title()}
        </Title>
        <Text size="lg" lh={1.55}>
          {m.not_found_body()}
        </Text>
        <Text size="sm" c="dimmed">
          <ParaglideMessage message={m.not_found_hint} markup={markup} />
        </Text>
        <Button component="a" href="/" mt="sm" color="ink" c="brand.4">
          {m.not_found_home()}
        </Button>
      </Stack>
    </Section>
  );
}
