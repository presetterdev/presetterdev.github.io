import type { ReactElement } from "react";

import classes from "./Wordmark.module.css";

// The three bars from the original SVG, with the word set in the site's own
// typeface instead of an embedded system font, so it renders the same on
// every OS.
export function Wordmark(): ReactElement {
  return (
    <span className={classes["root"]} aria-label="Presetter" role="img">
      <svg
        className={classes["bars"]}
        viewBox="0 0 36 48"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="0" y="14" width="8" height="20" rx="4" fill="#9775fa" />
        <rect x="14" y="6" width="8" height="36" rx="4" fill="#9775fa" />
        <rect x="28" y="18" width="8" height="12" rx="4" fill="#9775fa" />
      </svg>
      <span className={classes["word"]} aria-hidden="true">
        presetter
      </span>
    </span>
  );
}
