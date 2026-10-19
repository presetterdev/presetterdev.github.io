import type { ReactElement } from "react";

import { site } from "../seo";
import { Mark } from "./Mark";
import classes from "./Wordmark.module.css";

// The mark in the ink colour beside the name in the site's own typeface,
// so it renders the same on every OS.
export function Wordmark(): ReactElement {
  return (
    <span className={classes["root"]} aria-label={site.name} role="img">
      <Mark className={classes["mark"]} />
      <span className={classes["word"]} aria-hidden="true">
        {site.name.toLowerCase()}
      </span>
    </span>
  );
}
