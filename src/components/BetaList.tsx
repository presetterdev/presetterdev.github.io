import { ParaglideMessage } from "@inlang/paraglide-js-react";
import { Anchor, Box, Text } from "@mantine/core";
import type { ReactElement } from "react";

import { contact } from "../content";
import { m } from "../paraglide/messages.js";
import { EarlyAccessForm } from "./EarlyAccessForm";
import { Section } from "./Section";

// Where the message's email tag renders.
const markup = {
  email: (): ReactElement => (
    <Anchor href={contact.href} fw={600} underline="always">
      {contact.email}
    </Anchor>
  ),
};

// The ask: the sign-up form, and the email address for anyone who would
// rather just write.
export function BetaList(): ReactElement {
  return (
    <Section id="waitlist" title={m.waitlist_title()}>
      <Text size="lg" lh={1.55}>
        {m.waitlist_body()}
      </Text>
      <Box mt="xl">
        <EarlyAccessForm />
      </Box>
      <Text c="dimmed" mt="lg">
        <ParaglideMessage message={m.waitlist_or_email} markup={markup} />
      </Text>
    </Section>
  );
}
