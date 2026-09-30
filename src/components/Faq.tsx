import { Accordion, Text, Title } from "@mantine/core";
import type { ReactElement } from "react";

import { faq } from "../content";
import { Section } from "./Section";

export function Faq(): ReactElement {
  return (
    <Section id="faq">
      <Title order={2}>{faq.title}</Title>
      <Accordion mt="xl" maw={760} chevronPosition="right">
        {faq.items.map((item) => (
          <Accordion.Item key={item.question} value={item.question}>
            <Accordion.Control>
              <Text fw={600}>{item.question}</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text c="dimmed" lh={1.55}>
                {item.answer}
              </Text>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Section>
  );
}
