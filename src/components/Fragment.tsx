import type { ReactElement } from "react";

import type { FeatureKind } from "../content";
import classes from "./Fragment.module.css";

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

function ArrowIcon(): ReactElement {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M3 8h9m-3.5-3.5L12 8l-3.5 3.5" strokeLinecap="round" />
    </svg>
  );
}

const waveHeights = [40, 90, 60, 100, 55, 80, 45] as const;

function Filters(): ReactElement {
  return (
    <>
      <div className={classes["filterLine"]}>
        <span className={classes["muted"]}>Sounds</span>
        <span className={classes["pillActive"]}>Synth Bass</span>
        <span className={classes["pill"]}>Pad</span>
        <span className={classes["pill"]}>Lead</span>
      </div>
      <div className={classes["filterLine"]}>
        <span className={classes["muted"]}>Character</span>
        <span className={classes["pillActive"]}>Deep</span>
        <span className={classes["pill"]}>Warm</span>
        <span className={classes["pill"]}>Dark</span>
      </div>
      <div className={classes["muted"]}>38 matches from 6 plugins</div>
    </>
  );
}

function Preview(): ReactElement {
  return (
    <>
      <div className={classes["row"]}>
        <span className={classes["icon"]}>
          <span className={classes["wave"]} aria-hidden="true">
            {waveHeights.map((h) => (
              <span
                key={h}
                className={classes["bar"]}
                style={{ height: `${h}%` }}
              />
            ))}
          </span>
        </span>
        <span className={classes["rowName"]}>Sub Pressure</span>
        <span className={classes["muted"]}>Serum 2</span>
      </div>
      <div className={classes["row"]}>
        <span className={classes["icon"]}>
          <PlayIcon />
        </span>
        <span className={classes["rowName"]}>Rubber Reese</span>
        <span className={classes["muted"]}>Massive X</span>
      </div>
    </>
  );
}

function Mapping(): ReactElement {
  return (
    <>
      <div className={classes["mapRow"]}>
        <span className={classes["muted"]}>Serum</span>
        <span>Pads</span>
        <span className={classes["icon"]}>
          <ArrowIcon />
        </span>
        <span className={classes["pillActive"]}>Pad</span>
      </div>
      <div className={classes["mapRow"]}>
        <span className={classes["muted"]}>Omnisphere</span>
        <span>Pads + Strings</span>
        <span className={classes["icon"]}>
          <ArrowIcon />
        </span>
        <span className={classes["pillActive"]}>Pad</span>
      </div>
      <div className={classes["mapRow"]}>
        <span className={classes["muted"]}>Kontakt</span>
        <span>Synth Pad</span>
        <span className={classes["icon"]}>
          <ArrowIcon />
        </span>
        <span className={classes["pillActive"]}>Pad</span>
      </div>
    </>
  );
}

function Vendor(): ReactElement {
  return (
    <div className={classes["pills"]}>
      <span className={classes["pillActive"]}>Arturia</span>
      <span className={classes["pill"]}>Xfer Records</span>
      <span className={classes["pill"]}>Spectrasonics</span>
      <span className={classes["pill"]}>u-he</span>
      <span className={classes["pill"]}>Native Instruments</span>
    </div>
  );
}

function Kinds(): ReactElement {
  return (
    <>
      <div className={classes["row"]}>
        <span className={classes["icon"]}>
          <PlayIcon />
        </span>
        <span className={classes["rowName"]}>Analog Halo</span>
        <span className={classes["kind"]}>Instrument</span>
      </div>
      <div className={classes["row"]}>
        <span className={classes["icon"]}>
          <PlayIcon />
        </span>
        <span className={classes["rowName"]}>Plate Bloom</span>
        <span className={classes["kind"]}>Effect</span>
      </div>
    </>
  );
}

function Load(): ReactElement {
  return (
    <>
      <div className={classes["load"]}>
        <span className={classes["rowName"]}>Analog Halo</span>
        <span className={classes["icon"]}>
          <ArrowIcon />
        </span>
        <span className={classes["pluginChip"]}>Pigments</span>
      </div>
      <div className={classes["knobs"]} aria-hidden="true">
        <span className={classes["knob"]} />
        <span className={classes["knob"]} />
        <span className={classes["knob"]} />
        <span className={classes["knob"]} />
        <span className={classes["muted"]}>Macros</span>
      </div>
    </>
  );
}

const fragments: Record<FeatureKind, () => ReactElement> = {
  filters: Filters,
  preview: Preview,
  mapping: Mapping,
  vendor: Vendor,
  kinds: Kinds,
  load: Load,
};

export function Fragment({ kind }: { kind: FeatureKind }): ReactElement {
  const Inner = fragments[kind];
  return (
    <div className={classes["tile"]} aria-hidden="true">
      <Inner />
    </div>
  );
}
