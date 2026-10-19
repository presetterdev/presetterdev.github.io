import { Button, type ButtonProps, type MantineSpacing } from "@mantine/core";
import type { ReactElement } from "react";

import { cta } from "../content";
import { m } from "../paraglide/messages.js";

interface CtaButtonProps {
  size?: ButtonProps["size"];
  mt?: MantineSpacing;
}

const noMargin: MantineSpacing = 0;

// The one action on the page. With Tally's script loaded, the click opens
// the form as a modal; without it, the anchor scrolls to the inline form.
export function CtaButton({
  size = "md",
  mt = noMargin,
}: CtaButtonProps): ReactElement {
  return (
    <Button
      component="a"
      href={cta.href}
      size={size}
      mt={mt}
      color="ink"
      c="brand.4"
      data-tally-open={cta.tallyId}
      data-tally-layout="modal"
      data-tally-width="480"
      data-tally-overlay="1"
      data-tally-emoji-text="🎛️"
      data-tally-emoji-animation="wave"
    >
      {m.cta_join()}
    </Button>
  );
}
