import { Text } from "@mantine/core";
import type { ReactElement } from "react";

import { type PriceLine, pricing } from "../content";
import { CtaButton } from "./CtaButton";
import classes from "./Pricing.module.css";
import { Section } from "./Section";

function Line({ line }: { line: PriceLine }): ReactElement {
  return (
    <div className={classes["line"]}>
      <span className={classes["price"]}>{line.price}</span>
      <span className={classes["note"]}>{line.note}</span>
    </div>
  );
}

export function Pricing(): ReactElement {
  return (
    <Section id="price" title={pricing.title}>
      {pricing.showPrice ? (
        <div className={classes["lines"]}>
          <Line line={pricing.launch} />
          <Line line={pricing.regular} />
        </div>
      ) : undefined}
      <Text size="lg" lh={1.55} fw={600} mt={pricing.showPrice ? "lg" : 0}>
        {pricing.model}
      </Text>
      {pricing.showPrice ? undefined : (
        <Text size="lg" lh={1.55} mt="md">
          {pricing.unpriced}
        </Text>
      )}
      <Text size="lg" lh={1.55} mt="md">
        {pricing.beta}
      </Text>
      <Text c="dimmed" lh={1.55} mt="md">
        {pricing.opinion}
      </Text>
      <CtaButton size="md" mt="xl" />
    </Section>
  );
}
