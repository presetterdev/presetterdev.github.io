import { Grid, Text } from "@mantine/core";
import type { ReactElement } from "react";

import { cta, hero } from "../content";
import { BrowserMock } from "./BrowserMock";
import { CtaButton } from "./CtaButton";
import classes from "./Hero.module.css";
import { Section } from "./Section";
import { WindowFrame } from "./WindowFrame";

export function Hero(): ReactElement {
  return (
    <Section id="top" tight>
      <Grid gap={{ base: 40, md: 56 }} align="center">
        <Grid.Col span={{ base: 12, md: 7 }}>
          <h1 className={classes["title"]}>
            {hero.titleLines.map((line) => (
              <span key={line} className={classes["line"]}>
                {line}{" "}
              </span>
            ))}
          </h1>
          <p className={classes["lede"]}>{hero.lede}</p>
          <CtaButton size="lg" mt="md" />
          <Text size="sm" c="dimmed" mt="sm" maw={440}>
            {cta.micro}
          </Text>
          <Text size="xs" c="dimmed" mt="md" maw={420}>
            {hero.trust}
          </Text>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <div className={classes["visual"]}>
            <WindowFrame title="Ableton Live 12">
              <BrowserMock />
            </WindowFrame>
          </div>
        </Grid.Col>
      </Grid>
    </Section>
  );
}
