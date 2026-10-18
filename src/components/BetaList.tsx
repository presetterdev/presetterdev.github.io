import { Anchor, Box, Text } from "@mantine/core";
import type { ReactElement } from "react";

import { betaList, contact } from "../content";
import { EarlyAccessForm } from "./EarlyAccessForm";
import { Section } from "./Section";

// The ask: the sign-up form, and the email address for anyone who would
// rather just write.
export function BetaList(): ReactElement {
  return (
    <Section id="waitlist" title={betaList.title}>
      <Text size="lg" lh={1.55}>
        {betaList.body}
      </Text>
      <Box mt="xl">
        <EarlyAccessForm />
      </Box>
      <Text c="dimmed" mt="lg">
        {betaList.orEmail}{" "}
        <Anchor href={contact.href} fw={600} underline="always">
          {contact.email}
        </Anchor>
      </Text>
    </Section>
  );
}
