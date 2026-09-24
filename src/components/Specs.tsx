import { Box, Title } from "@mantine/core";
import type { ReactElement } from "react";

import { specs } from "../content";
import { DefinitionRows } from "./DefinitionRows";
import { Section } from "./Section";

export function Specs(): ReactElement {
  return (
    <Section id="specs">
      <Title order={2}>{specs.title}</Title>
      <Box mt={40} maw={760}>
        <DefinitionRows
          items={specs.items.map((item) => ({
            term: item.term,
            body: item.value,
          }))}
        />
      </Box>
    </Section>
  );
}
