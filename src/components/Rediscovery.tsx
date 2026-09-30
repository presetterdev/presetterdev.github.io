import { Grid, Text, Title } from "@mantine/core";
import type { ReactElement } from "react";

import { rediscovery } from "../content";
import classes from "./Rediscovery.module.css";
import { Section } from "./Section";

export function Rediscovery(): ReactElement {
  const { shelf } = rediscovery;
  return (
    <Section id="rediscovery">
      <Grid gap={{ base: 40, md: 64 }} align="center">
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Title order={2}>{rediscovery.title}</Title>
          <Text size="lg" mt="lg" maw={560} lh={1.55}>
            {rediscovery.body}
          </Text>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <div
            className={classes["shelf"]}
            role="img"
            aria-label={`Instruments by last opened, from today to never. ${shelf.result}`}
          >
            <div className={classes["head"]}>
              <span>Instrument</span>
              <span>{shelf.heading}</span>
            </div>
            <ul className={classes["list"]}>
              {shelf.rows.map((row) => (
                <li key={row.plugin} className={classes["row"]}>
                  <span>{row.plugin}</span>
                  <span className={classes["opened"]}>{row.opened}</span>
                </li>
              ))}
            </ul>
            <div className={classes["result"]}>{shelf.result}</div>
          </div>
        </Grid.Col>
      </Grid>
    </Section>
  );
}
