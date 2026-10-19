import type { ReactElement } from "react";

import { m } from "../paraglide/messages.js";
import { Prose } from "./Prose";
import { Section } from "./Section";

export function Origin(): ReactElement {
  return (
    <Section id="why" title={m.origin_title()}>
      <Prose text={m.origin_body()} lede />
    </Section>
  );
}
