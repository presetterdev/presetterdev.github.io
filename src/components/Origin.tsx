import type { ReactElement } from "react";

import { origin } from "../content";
import { Prose } from "./Prose";
import { Section } from "./Section";

export function Origin(): ReactElement {
  return (
    <Section id="why" title={origin.title}>
      <Prose paragraphs={origin.body} lede />
    </Section>
  );
}
