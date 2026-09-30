import { Container } from "@mantine/core";
import type { ReactElement } from "react";

import { CtaButton } from "./CtaButton";
import classes from "./MidCta.module.css";

interface MidCtaProps {
  title: string;
  body: string;
}

// A repeat of the primary action, placed where belief peaks.
export function MidCta({ title, body }: MidCtaProps): ReactElement {
  return (
    <Container size={1080} mb={{ base: 48, md: 72 }}>
      <div className={classes["band"]}>
        <div>
          <p className={classes["title"]}>{title}</p>
          <p className={classes["body"]}>{body}</p>
        </div>
        <CtaButton size="md" />
      </div>
    </Container>
  );
}
