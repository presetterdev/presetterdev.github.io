import { Box, Container, VisuallyHidden } from "@mantine/core";
import type { ReactElement, ReactNode } from "react";

import { DotText } from "./DotText";
import classes from "./Section.module.css";

interface SectionProps {
  id: string;
  // Set above the content in the mark's dot face, as a label rather than a
  // headline. Write it in capitals: the face has no lower case.
  title?: string;
  // The hero sits directly under the header and wants less air above it.
  tight?: boolean;
  // Lets the content run past the prose measure, for tables and lists.
  wide?: boolean;
  children: ReactNode;
}

// One page section: consistent vertical rhythm and a shared measure, so
// individual sections only decide what goes inside. Sections after the
// first are separated by a hairline rather than a change of background.
export function Section({
  id,
  title,
  tight,
  wide,
  children,
}: SectionProps): ReactElement {
  const names = [classes["section"]];
  if (tight === true) names.push(classes["tight"]);
  const body = [classes["body"]];
  if (wide === true) body.push(classes["wide"]);
  return (
    <Box component="section" id={id} className={names.join(" ")}>
      <Container size={1200}>
        {title === undefined ? undefined : (
          <h2 className={classes["title"]}>
            <VisuallyHidden>{title}</VisuallyHidden>
            <DotText lines={[title]} pitch={3.2} />
          </h2>
        )}
        <div className={body.join(" ")}>{children}</div>
      </Container>
    </Box>
  );
}
