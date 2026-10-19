import { Text } from "@mantine/core";
import type { ReactElement } from "react";

interface ProseProps {
  // One paragraph per line. In messages/en.yaml that is a blank line, since
  // the long texts are folded blocks, where single line breaks are spaces.
  text: string;
  // Sets the first paragraph larger, as the lede.
  lede?: boolean;
}

// Running text. Sections pass their copy through here so every block of
// prose on the site has the same size and rhythm.
export function Prose({ text, lede = false }: ProseProps): ReactElement {
  const paragraphs = text.split(/\n+/);
  return (
    <>
      {paragraphs.map((paragraph, index) => {
        const first = lede && index === 0;
        return (
          <Text
            key={paragraph}
            fz={first ? { base: 22, md: 26 } : "lg"}
            lh={1.55}
            mt={index === 0 ? 0 : "md"}
            c="var(--mantine-color-text)"
          >
            {paragraph}
          </Text>
        );
      })}
    </>
  );
}
