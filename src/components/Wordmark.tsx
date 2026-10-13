import type { ReactElement } from "react";

import { Mark } from "./Mark";
import classes from "./Wordmark.module.css";

// The mark in the accent colour beside the name in the site's own typeface,
// so it renders the same on every OS.
export function Wordmark(): ReactElement {
  return (
    <span className={classes["root"]} aria-label="Presetter" role="img">
      <Mark className={classes["mark"]} />
      <span className={classes["word"]} aria-hidden="true">
        presetter
      </span>
    </span>
  );
}
