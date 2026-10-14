import { Box, Container, Title } from "@mantine/core";
import type { ReactElement, ReactNode } from "react";

import classes from "./Section.module.css";

interface SectionProps {
  id: string;
  // With a title, the section lays out like a page of a manual: the title
  // in a narrow column on the left, the content beside it. Without one,
  // the children take the full measure.
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
      <Container size={1080}>
        {title === undefined ? (
          children
        ) : (
          <div className={classes["grid"]}>
            <Title order={2} className={classes["title"]}>
              {title}
            </Title>
            <div className={body.join(" ")}>{children}</div>
          </div>
        )}
      </Container>
    </Box>
  );
}
