import { Grid, Title } from "@mantine/core";
import type { ReactElement } from "react";

import { howItWorks } from "../content";
import { BrowserTree } from "./BrowserTree";
import classes from "./HowItWorks.module.css";
import { Section } from "./Section";

export function HowItWorks(): ReactElement {
  return (
    <Section id="how-it-works" band>
      <Grid gap={{ base: 40, md: 64 }} align="center">
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Title order={2}>{howItWorks.title}</Title>
          <ol className={classes["steps"]}>
            {howItWorks.steps.map((step) => (
              <li key={step.title} className={classes["step"]}>
                <div>
                  <h3 className={classes["stepTitle"]}>{step.title}</h3>
                  <p className={classes["stepBody"]}>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <BrowserTree />
        </Grid.Col>
      </Grid>
    </Section>
  );
}
