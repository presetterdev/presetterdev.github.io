import type { ReactElement } from "react";

import { tree } from "../content";
import classes from "./BrowserTree.module.css";
import { WindowFrame } from "./WindowFrame";

function Chevron(): ReactElement {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="m3 2 3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Where the Pack lands: Packs › Presetter in Live's browser.
export function BrowserTree(): ReactElement {
  const last = tree.path[tree.path.length - 1];
  return (
    <div>
      <WindowFrame title="Ableton Live 12">
        <div
          className={`${classes["panel"]} ${classes["after"]}`}
          role="img"
          aria-label={`${tree.path.join(" › ")} — ${tree.caption}`}
        >
          <div className={classes["path"]}>
            {tree.path.map((segment) => (
              <span
                key={segment}
                className={segment === last ? classes["pathLast"] : undefined}
              >
                {segment}
                {segment === last ? undefined : " ›"}
              </span>
            ))}
          </div>
          <ul className={classes["list"]}>
            {tree.rows.map((row) => (
              <li key={row.name} className={classes["row"]}>
                <span className={classes["chevron"]}>
                  <Chevron />
                </span>
                <span className={classes["name"]}>{row.name}</span>
                <span className={classes["detail"]}>{row.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </WindowFrame>
      <p className={classes["caption"]}>{tree.caption}</p>
    </div>
  );
}
