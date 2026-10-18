import { VisuallyHidden } from "@mantine/core";
import type { ReactElement } from "react";

import { contact, cta, hero } from "../content";
import { CtaButton } from "./CtaButton";
import { DotText } from "./DotText";
import classes from "./Hero.module.css";
import { Section } from "./Section";

export function Hero(): ReactElement {
  return (
    <Section id="top" tight wide>
      <h1 className={classes["title"]}>
        <VisuallyHidden>{hero.titleLines.join(" ")}</VisuallyHidden>
        <DotText lines={hero.titleLines} pitch={11} unlit />
      </h1>
      <p className={classes["lede"]}>{hero.lede}</p>
      <div className={classes["actions"]}>
        <CtaButton size="lg" />
        <p className={classes["micro"]}>{cta.micro}</p>
      </div>
      <p className={classes["contact"]}>
        {hero.questions}{" "}
        <a href={contact.href} className={classes["email"]}>
          {contact.email}
        </a>
      </p>
    </Section>
  );
}
