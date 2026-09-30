import type { ReactElement } from "react";

// The Tally form. The embed script in index.html resizes the frame to the
// form's real height once it loads; this height is the fallback.
const src =
  "https://tally.so/embed/gD2NoO?alignLeft=1&hideTitle=1" +
  "&transparentBackground=1&dynamicHeight=1";

export function EarlyAccessForm(): ReactElement {
  return (
    // Tally's form needs scripts and its own origin to submit, and a sandbox
    // that allows both is equivalent to none; the frame is a trusted first
    // party, so the rule is switched off here rather than faked.
    // eslint-disable-next-line react/iframe-missing-sandbox
    <iframe
      src={src}
      loading="lazy"
      width="100%"
      height={492}
      title="Presetter early-access form"
      style={{ border: 0, display: "block" }}
    />
  );
}
