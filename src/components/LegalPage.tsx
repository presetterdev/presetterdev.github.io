import { List, Stack, Text, Title } from "@mantine/core";
import { type ReactElement, useEffect } from "react";

import { type LegalDoc, type LegalSection } from "../content";
import { site } from "../seo";
import { Section } from "./Section";

interface LegalPageProps {
  doc: LegalDoc;
}

function Paragraphs({
  items,
}: {
  items: readonly string[];
}): ReactElement | undefined {
  if (items.length === 0) return undefined;
  return (
    <>
      {items.map((paragraph) => (
        <Text key={paragraph} lh={1.6}>
          {paragraph}
        </Text>
      ))}
    </>
  );
}

function LegalSectionBlock({
  section,
}: {
  section: LegalSection;
}): ReactElement {
  return (
    <Stack gap="sm" component="section">
      <Title order={3} mt="md">
        {section.heading}
      </Title>
      <Paragraphs items={section.paragraphs} />
      {section.bullets === undefined ? undefined : (
        <List spacing="xs" withPadding>
          {section.bullets.map((bullet) => (
            <List.Item key={bullet}>
              <Text lh={1.6}>{bullet}</Text>
            </List.Item>
          ))}
        </List>
      )}
      <Paragraphs items={section.after ?? []} />
    </Stack>
  );
}

// A plain reading page: title, date, intro, then headed sections. The
// prerender writes the title into <head>; this keeps it right after a
// client-side navigation.
export function LegalPage({ doc }: LegalPageProps): ReactElement {
  useEffect(() => {
    document.title = `${doc.title} — ${site.name}`;
  }, [doc.title]);
  return (
    <Section id={doc.slug} tight>
      <Stack gap="md" maw={720}>
        <Title order={1} fz={{ base: 34, md: 44 }}>
          {doc.title}
        </Title>
        <Text c="dimmed">Updated {doc.updated}</Text>
        <Paragraphs items={doc.intro} />
        {doc.sections.map((section) => (
          <LegalSectionBlock key={section.heading} section={section} />
        ))}
      </Stack>
    </Section>
  );
}
