import { Text } from "@mantine/core";
import type { ReactElement } from "react";

import { howItWorks } from "../content";
import classes from "./HowItWorks.module.css";
import { Screenshot } from "./Screenshot";
import { Section } from "./Section";

export function HowItWorks(): ReactElement {
  return (
    <Section id="how-it-works" title={howItWorks.title}>
      <Text size="lg" lh={1.55}>
        {howItWorks.lede}
      </Text>
      <ol className={classes["steps"]}>
        {howItWorks.steps.map((step) => (
          <li key={step.title} className={classes["step"]}>
            <h3 className={classes["stepTitle"]}>{step.title}</h3>
            <p className={classes["stepBody"]}>{step.body}</p>
          </li>
        ))}
      </ol>
      <Text size="sm" c="dimmed" mt="lg">
        {howItWorks.note}
      </Text>
      <Screenshot />
    </Section>
  );
}
