import { Box, Text, Title } from "@mantine/core";
import type { ReactElement } from "react";

import { earlyAccess } from "../content";
import { EarlyAccessForm } from "./EarlyAccessForm";
import { Section } from "./Section";

export function EarlyAccess(): ReactElement {
  return (
    <Section id="early-access">
      <Title order={2}>{earlyAccess.title}</Title>
      <Text size="lg" mt="lg" maw={640} lh={1.55}>
        {earlyAccess.body}
      </Text>
      <Box mt="xl" maw={640}>
        <EarlyAccessForm />
      </Box>
    </Section>
  );
}
