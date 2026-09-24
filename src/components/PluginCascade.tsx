import type { ReactElement } from "react";

import { comparison } from "../content";
import classes from "./PluginCascade.module.css";

// Today: a plugin window per vendor, each with its own browser and its own
// name for the same kind of sound.
export function PluginCascade(): ReactElement {
  const vendors = comparison.today.windows.map((w) => w.vendor).join(", ");
  return (
    <div
      className={classes["stack"]}
      role="img"
      aria-label={`Five stacked plugin windows — ${vendors} — each with its own preset browser.`}
    >
      {comparison.today.windows.map((window) => (
        <div key={window.vendor} className={classes["window"]}>
          <div className={classes["bar"]}>
            <span className={classes["dot"]} />
            <span className={classes["dot"]} />
            <span className={classes["dot"]} />
            <span className={classes["vendor"]}>{window.vendor}</span>
          </div>
          <div className={classes["category"]}>
            <span>Category</span>
            <span className={classes["categoryValue"]}>{window.category}</span>
          </div>
          <ul className={classes["list"]}>
            {window.presets.map((preset) => (
              <li key={preset} className={classes["preset"]}>
                {preset}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
