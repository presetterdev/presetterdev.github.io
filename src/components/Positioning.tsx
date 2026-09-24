import { Stack, Text, Title } from "@mantine/core";
import type { ReactElement } from "react";

import { positioning } from "../content";
import { Comparison } from "./Comparison";
import { Section } from "./Section";

export function Positioning(): ReactElement {
  return (
    <Section id="why">
      <Title order={2} maw={760}>
        {positioning.title}
      </Title>
      <Stack gap="md" mt="lg" maw={640}>
        {positioning.body.map((paragraph) => (
          <Text key={paragraph} size="lg" lh={1.55}>
            {paragraph}
          </Text>
        ))}
      </Stack>
      <Comparison />
    </Section>
  );
}
