import { Anchor } from "@mantine/core";
import type { ReactElement } from "react";

import { contact, origin } from "../content";
import { Prose } from "./Prose";
import { Section } from "./Section";

export function Origin(): ReactElement {
  return (
    <Section id="why" title={origin.title}>
      <Prose paragraphs={origin.body} lede />
      <Anchor
        href={contact.href}
        c="white"
        underline="always"
        mt="md"
        display="inline-block"
      >
        {contact.email}
      </Anchor>
    </Section>
  );
}
