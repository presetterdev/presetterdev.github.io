import { Text, Title } from "@mantine/core";
import type { ReactElement } from "react";

import { origin } from "../content";
import { Section } from "./Section";

export function Origin(): ReactElement {
  return (
    <Section id="origin">
      <Title order={2}>{origin.title}</Title>
      <Text size="lg" mt="lg" maw={640} lh={1.55}>
        {origin.body}
      </Text>
    </Section>
  );
}
