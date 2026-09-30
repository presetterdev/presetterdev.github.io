import { Title } from "@mantine/core";
import type { ReactElement } from "react";

import { pricing } from "../content";
import { CtaButton } from "./CtaButton";
import classes from "./Pricing.module.css";
import { Section } from "./Section";

export function Pricing(): ReactElement {
  return (
    <Section id="pricing" band>
      <Title order={2}>{pricing.title}</Title>
      <div className={classes["card"]}>
        <span className={classes["badge"]}>{pricing.badge}</span>
        <div className={classes["price"]}>
          <span>{pricing.launchPrice}</span>
          <span className={classes["regular"]}>
            <s>{pricing.regularPrice}</s> after launch
          </span>
        </div>
        <p className={classes["note"]}>{pricing.note}</p>
        <ul className={classes["includes"]}>
          {pricing.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <CtaButton size="md" mt="xl" />
      </div>
    </Section>
  );
}
