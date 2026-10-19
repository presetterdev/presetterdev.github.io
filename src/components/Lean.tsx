import type { ReactElement } from "react";

import { leanPoints } from "../content";
import { m } from "../paraglide/messages.js";
import classes from "./Lean.module.css";
import { Section } from "./Section";

// The four bullets take the four sound colours in the synth's order.
const colours = ["bass", "keys", "pad", "lead"] as const;

// What Presetter doesn't do, which for a utility is most of the pitch.
export function Lean(): ReactElement {
  return (
    <Section id="lean" wide>
      <ul className={classes["list"]}>
        {leanPoints.map((point, index) => (
          <li
            key={point()}
            className={classes["item"]}
            data-category={colours[index % colours.length]}
          >
            {point()}
          </li>
        ))}
      </ul>
      <p className={classes["specs"]}>{m.lean_specs()}</p>
    </Section>
  );
}
