import { Text, Title } from "@mantine/core";
import type { ReactElement } from "react";

import { worksWith } from "../content";
import { Section } from "./Section";
import classes from "./WorksWith.module.css";

export function WorksWith(): ReactElement {
  return (
    <Section id="plugins" band>
      <Title order={2}>{worksWith.title}</Title>
      <Text mt="sm" c="dimmed">
        {worksWith.intro}
      </Text>
      <div className={classes["groups"]}>
        {worksWith.vendors.map((vendor) => (
          <div key={vendor.name}>
            <p className={classes["vendor"]}>{vendor.name}</p>
            <div className={classes["chips"]}>
              {vendor.plugins.map((plugin) => (
                <span key={plugin} className={classes["chip"]}>
                  {plugin}
                </span>
              ))}
            </div>
            {vendor.effects === undefined ? undefined : (
              <p className={classes["effects"]}>
                Effects: {vendor.effects.join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className={classes["nks"]}>
        <p className={classes["nksTitle"]}>{worksWith.nksTitle}</p>
        <p className={classes["nksBody"]}>{worksWith.nks}</p>
        <div className={classes["chips"]}>
          {worksWith.nksChips.map((chip) => (
            <span
              key={chip}
              className={
                chip.endsWith("more") ? classes["chipMore"] : classes["chip"]
              }
            >
              {chip}
            </span>
          ))}
        </div>
        <Text size="sm" c="dimmed">
          {worksWith.request}
        </Text>
      </div>
    </Section>
  );
}
