import { Text } from "@mantine/core";
import type { ReactElement } from "react";

import { worksWith } from "../content";
import { Section } from "./Section";
import classes from "./WorksWith.module.css";

export function WorksWith(): ReactElement {
  return (
    <Section id="plugins" title={worksWith.title} wide>
      <Text size="lg" lh={1.55} maw="64ch">
        {worksWith.intro}
      </Text>
      <dl className={classes["vendors"]}>
        {worksWith.vendors.map((vendor) => (
          <div key={vendor.name} className={classes["vendor"]}>
            <dt className={classes["name"]}>{vendor.name}</dt>
            <dd className={classes["plugins"]}>{vendor.plugins.join(", ")}</dd>
            {vendor.effects === undefined ? undefined : (
              <dd className={classes["effects"]}>
                {worksWith.effectsLabel}: {vendor.effects.join(", ")}
              </dd>
            )}
          </div>
        ))}
      </dl>
      <p className={classes["nksTitle"]}>{worksWith.nksTitle}</p>
      <Text lh={1.55} mt={6} maw="64ch">
        {worksWith.nks}
      </Text>
      <Text c="dimmed" mt={6} maw="64ch">
        {worksWith.nksChips.join(", ")}, and more.
      </Text>
      <Text size="sm" c="dimmed" mt="lg" maw="64ch">
        {worksWith.request}
      </Text>
    </Section>
  );
}
