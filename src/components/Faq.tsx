import type { ReactElement } from "react";

import { faq } from "../content";
import { m } from "../paraglide/messages.js";
import classes from "./Faq.module.css";
import { Section } from "./Section";

// Questions and answers side by side, all open, like the back page of a
// manual. Nothing to click.
export function Faq(): ReactElement {
  return (
    <Section id="faq" title={m.faq_title()} wide>
      <dl className={classes["list"]}>
        {faq.map((item) => (
          <div key={item.question()} className={classes["row"]}>
            <dt className={classes["question"]}>{item.question()}</dt>
            <dd className={classes["answer"]}>{item.answer()}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
