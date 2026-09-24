import { Box, Container } from "@mantine/core";
import type { ReactElement, ReactNode } from "react";

import classes from "./Section.module.css";

interface SectionProps {
  id: string;
  // The hero sits directly under the header and wants less air above it.
  tight?: boolean;
  // A raised band separates a section from the ones around it.
  band?: boolean;
  children: ReactNode;
}

// One page section: consistent vertical rhythm and a shared measure, so
// individual sections only decide what goes inside.
export function Section({
  id,
  tight,
  band,
  children,
}: SectionProps): ReactElement {
  const names = [classes["section"]];
  if (tight === true) names.push(classes["tight"]);
  if (band === true) names.push(classes["band"]);
  return (
    <Box component="section" id={id} className={names.join(" ")}>
      <Container size={1080}>{children}</Container>
    </Box>
  );
}
