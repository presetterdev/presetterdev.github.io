import { Title } from "@mantine/core";
import type { ReactElement } from "react";

import { features } from "../content";
import classes from "./Features.module.css";
import { Fragment } from "./Fragment";
import { Section } from "./Section";

export function Features(): ReactElement {
  return (
    <Section id="features">
      <Title order={2}>{features.title}</Title>
      <div className={classes["grid"]}>
        {features.items.map((item) => (
          <div key={item.title}>
            <Fragment kind={item.kind} />
            <h3 className={classes["title"]}>{item.title}</h3>
            <p className={classes["body"]}>{item.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
