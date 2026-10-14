import type { ReactElement } from "react";

import { whatItIs } from "../content";
import { Prose } from "./Prose";
import { Section } from "./Section";

export function WhatItIs(): ReactElement {
  return (
    <Section id="what-it-is" title={whatItIs.title}>
      <Prose paragraphs={whatItIs.body} />
    </Section>
  );
}
