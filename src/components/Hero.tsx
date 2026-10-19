import { VisuallyHidden } from "@mantine/core";
import { ParaglideMessage } from "@inlang/paraglide-js-react";
import type { ReactElement } from "react";

import { contact } from "../content";
import { m } from "../paraglide/messages.js";
import { CtaButton } from "./CtaButton";
import { DotText } from "./DotText";
import classes from "./Hero.module.css";
import { Library } from "./Library";
import { Section } from "./Section";

// Where each message's markup tags render. The adapter calls these as plain
// functions, not as components.
const markup = {
  email: (): ReactElement => (
    <a href={contact.href} className={classes["email"]}>
      {contact.email}
    </a>
  ),
};

export function Hero(): ReactElement {
  // Set in the mark's dot face, one line per line of the message. Only the
  // face's characters render; anything else comes out blank.
  const titleLines = m.hero_title().split("\n");
  return (
    <Section id="top" tight wide>
      <div className={classes["layout"]}>
        <div>
          <h1 className={classes["title"]}>
            <VisuallyHidden>{titleLines.join(" ")}</VisuallyHidden>
            <DotText lines={titleLines} pitch={7} unlit />
          </h1>
          <p className={classes["lede"]}>{m.hero_lede()}</p>
          <div className={classes["actions"]}>
            <CtaButton size="lg" />
            <p className={classes["micro"]}>{m.cta_micro()}</p>
          </div>
          <p className={classes["contact"]}>
            <ParaglideMessage message={m.hero_questions} markup={markup} />
          </p>
        </div>
        <Library />
      </div>
    </Section>
  );
}
