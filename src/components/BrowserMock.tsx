import type { ReactElement } from "react";

import { mock } from "../content";
import classes from "./BrowserMock.module.css";

interface FilterRowProps {
  group: string;
  options: readonly { label: string; active: boolean }[];
}

function FilterRow({ group, options }: FilterRowProps): ReactElement {
  return (
    <div className={classes["filterRow"]}>
      <span className={classes["filterGroup"]}>{group}</span>
      <span className={classes["tags"]}>
        {options.map((option) => (
          <span
            key={option.label}
            className={option.active ? classes["tagActive"] : classes["tag"]}
          >
            {option.label}
          </span>
        ))}
      </span>
    </div>
  );
}

function PlayIcon(): ReactElement {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M2.5 1.5v9l8-4.5z" />
    </svg>
  );
}

function Waveform(): ReactElement {
  return (
    <span className={classes["wave"]} aria-hidden="true">
      <span className={classes["bar"]} />
      <span className={classes["bar"]} />
      <span className={classes["bar"]} />
      <span className={classes["bar"]} />
    </span>
  );
}

// Live's browser with the Pack built: one filter bar, every plugin's pads
// in one list. Replace with the demo recording, in the same frame, once
// one exists.
export function BrowserMock(): ReactElement {
  return (
    <div
      className={classes["panel"]}
      role="img"
      aria-label={`Ableton Live's browser filtered to warm pads: ${mock.status}.`}
    >
      <div className={classes["filters"]}>
        {mock.filters.map((filter) => (
          <FilterRow
            key={filter.group}
            group={filter.group}
            options={filter.options}
          />
        ))}
      </div>
      <ul className={classes["list"]}>
        {mock.rows.map((row) => (
          <li
            key={row.preset}
            className={row.playing ? classes["rowPlaying"] : classes["row"]}
          >
            <span className={classes["icon"]}>
              {row.playing ? <Waveform /> : <PlayIcon />}
            </span>
            <span className={classes["name"]}>{row.preset}</span>
            <span className={classes["plugin"]}>{row.plugin}</span>
          </li>
        ))}
      </ul>
      <div className={classes["status"]}>{mock.status}</div>
    </div>
  );
}
