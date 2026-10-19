import { VisuallyHidden } from "@mantine/core";
import type { ReactElement } from "react";

import { features, setupSteps } from "../content";
import { m } from "../paraglide/messages.js";
import { DotText } from "./DotText";
import classes from "./HowItWorks.module.css";
import { Screenshot } from "./Screenshot";
import { Section } from "./Section";

// The setup steps light up a dot each, in the colours of the first three
// sounds, so the third step shows all three lit.
const meter = ["bass", "keys", "pad"] as const;

export function HowItWorks(): ReactElement {
  return (
    <Section id="how-it-works" title={m.how_title()} wide>
      <div className={classes["grid"]}>
        <Screenshot />
        <ul className={classes["features"]}>
          {features.map((feature) => (
            <li
              key={feature.category}
              className={classes["feature"]}
              data-category={feature.category}
            >
              <h3 className={classes["featureTitle"]}>{feature.title()}</h3>
              <p className={classes["featureBody"]}>{feature.body()}</p>
            </li>
          ))}
        </ul>
      </div>
      <h3 className={classes["stepsTitle"]}>
        <VisuallyHidden>{m.how_setup_title()}</VisuallyHidden>
        <DotText lines={[m.how_setup_title()]} pitch={3.2} />
      </h3>
      <ol className={classes["steps"]}>
        {setupSteps.map((step, index) => (
          <li key={step()} className={classes["step"]}>
            <span className={classes["meter"]} aria-hidden="true">
              {meter.map((category, dot) => (
                <span
                  key={category}
                  className={classes["meterDot"]}
                  data-category={category}
                  data-lit={dot <= index || undefined}
                />
              ))}
            </span>
            {step()}
          </li>
        ))}
      </ol>
      <p className={classes["note"]}>{m.how_setup_note()}</p>
    </Section>
  );
}
