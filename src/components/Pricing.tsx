import { Text } from "@mantine/core";
import type { ReactElement } from "react";

import { type PriceLine, pricing } from "../content";
import { m } from "../paraglide/messages.js";
import { CtaButton } from "./CtaButton";
import classes from "./Pricing.module.css";
import { Section } from "./Section";

function Line({ line }: { line: PriceLine }): ReactElement {
  return (
    <div className={classes["line"]}>
      <span className={classes["price"]}>
        {m.pricing_amount({ amount: line.amount })}
      </span>
      <span className={classes["note"]}>{line.note()}</span>
    </div>
  );
}

export function Pricing(): ReactElement {
  return (
    <Section id="price" title={m.pricing_title()}>
      {pricing.showPrice ? (
        <div className={classes["lines"]}>
          <Line line={pricing.launch} />
          <Line line={pricing.regular} />
        </div>
      ) : undefined}
      <Text size="lg" lh={1.55} fw={600} mt={pricing.showPrice ? "lg" : 0}>
        {m.pricing_model()}
      </Text>
      {pricing.showPrice ? undefined : (
        <Text size="lg" lh={1.55} mt="md">
          {m.pricing_unpriced()}
        </Text>
      )}
      <Text size="lg" lh={1.55} mt="md">
        {m.pricing_beta()}
      </Text>
      <Text c="dimmed" lh={1.55} mt="md">
        {m.pricing_opinion()}
      </Text>
      <CtaButton size="md" mt="xl" />
    </Section>
  );
}
