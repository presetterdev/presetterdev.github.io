import { Text } from "@mantine/core";
import type { ReactElement } from "react";

import { lean } from "../content";
import classes from "./Lean.module.css";
import { Section } from "./Section";

// What Presetter doesn't do, which for a utility is most of the pitch.
export function Lean(): ReactElement {
  return (
    <Section id="lean" title={lean.title}>
      <Text size="lg" lh={1.55}>
        {lean.lede}
      </Text>
      <ul className={classes["list"]}>
        {lean.items.map((item) => (
          <li key={item} className={classes["item"]}>
            {item}
          </li>
        ))}
      </ul>
      <Text size="sm" c="dimmed" mt="lg">
        {lean.specs}
      </Text>
    </Section>
  );
}
