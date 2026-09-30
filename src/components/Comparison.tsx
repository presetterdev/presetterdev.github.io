import type { ReactElement } from "react";

import { comparison } from "../content";
import { BrowserMock } from "./BrowserMock";
import classes from "./Comparison.module.css";
import { PluginCascade } from "./PluginCascade";
import { WindowFrame } from "./WindowFrame";

// Today versus with Presetter: five plugin browsers, or one Live browser.
export function Comparison(): ReactElement {
  return (
    <div className={classes["pair"]}>
      <div>
        <p className={classes["label"]}>{comparison.today.label}</p>
        <PluginCascade />
        <p className={classes["caption"]}>{comparison.today.caption}</p>
      </div>
      <div>
        <p className={classes["labelAfter"]}>
          {comparison.withPresetter.label}
        </p>
        <WindowFrame title="Ableton Live 12">
          <BrowserMock />
        </WindowFrame>
        <p className={classes["caption"]}>{comparison.withPresetter.caption}</p>
      </div>
    </div>
  );
}
