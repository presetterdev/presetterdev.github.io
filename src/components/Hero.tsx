import type { ReactElement } from "react";

import { contact, cta, hero } from "../content";
import { CtaButton } from "./CtaButton";
import classes from "./Hero.module.css";
import { Readout } from "./Readout";
import { Section } from "./Section";

export function Hero(): ReactElement {
  return (
    <Section id="top" tight>
      <div className={classes["copy"]}>
        <h1 className={classes["title"]}>
          {hero.titleLines.map((line) => (
            <span key={line} className={classes["line"]}>
              {line}{" "}
            </span>
          ))}
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
      </div>
      <div className={classes["readout"]}>
        <Readout />
      </div>
    </Section>
  );
}
