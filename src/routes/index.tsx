import { Image, Stack, Text, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import type { ReactElement } from "react";

import wordmark from "../media/images/wordmark.svg";

export const Route = createFileRoute("/")({ component: Home });

function Home(): ReactElement {
  return (
    <Stack align="center" gap="lg" mt="xl">
      <Image src={wordmark} alt="Presetter" w={280} />
      <Title order={1} ta="center">
        Every preset you own, in one place
      </Title>
      <Text c="dimmed" ta="center" maw={520}>
        Presetter turns the presets already sitting on your drive into a
        browsable, taggable Ableton Live pack.
      </Text>
      <Text size="sm" c="dimmed">
        Placeholder copy — the real site is on its way.
      </Text>
    </Stack>
  );
}
