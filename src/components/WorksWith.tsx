import { Text } from "@mantine/core";
import { type ReactElement, useEffect, useState } from "react";

import { nksExamples, vendors } from "../content";
import { m } from "../paraglide/messages.js";
import { DotText } from "./DotText";
import { Section } from "./Section";
import classes from "./WorksWith.module.css";

const names = vendors.flatMap((vendor) => vendor.plugins);
const dwell = 2200;

// The plugin names, one at a time, in the dot face. It holds still while
// the pointer or focus is on it. The server renders the first name; the
// cycle starts once the page is live.
function Cycler(): ReactElement {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (held) return undefined;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % names.length);
    }, dwell);
    return (): void => {
      window.clearInterval(timer);
    };
  }, [held]);

  const name = names[index] ?? "";
  return (
    <span
      className={classes["chip"]}
      tabIndex={0}
      onMouseEnter={() => {
        setHeld(true);
      }}
      onMouseLeave={() => {
        setHeld(false);
      }}
      onFocus={() => {
        setHeld(true);
      }}
      onBlur={() => {
        setHeld(false);
      }}
    >
      <span key={name} className={classes["name"]}>
        <DotText lines={[name.toUpperCase()]} pitch={5} unlit />
      </span>
    </span>
  );
}

export function WorksWith(): ReactElement {
  return (
    <Section id="plugins" title={m.works_title()} wide>
      <p className={classes["lead"]}>
        <span>{m.works_lead()}</span>
        <Cycler />
      </p>
      <Text size="lg" lh={1.55} maw="64ch" mt="xl">
        {m.works_intro()}
      </Text>
      <dl className={classes["vendors"]}>
        {vendors.map((vendor) => (
          <div key={vendor.name} className={classes["vendor"]}>
            <dt className={classes["vendorName"]}>{vendor.name}</dt>
            <dd className={classes["plugins"]}>{vendor.plugins.join(", ")}</dd>
            {vendor.effects === undefined ? undefined : (
              <dd className={classes["effects"]}>
                {m.works_effects({ plugins: vendor.effects.join(", ") })}
              </dd>
            )}
          </div>
        ))}
      </dl>
      <p className={classes["nksTitle"]}>{m.works_nks_title()}</p>
      <Text lh={1.55} mt={6} maw="64ch">
        {m.works_nks_body()}
      </Text>
      <Text c="dimmed" mt={6} maw="64ch">
        {m.works_nks_more({ plugins: nksExamples.join(", ") })}
      </Text>
      <Text size="sm" c="dimmed" mt="lg" maw="64ch">
        {m.works_request()}
      </Text>
    </Section>
  );
}
