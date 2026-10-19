import { type ReactElement, useEffect, useRef, useState } from "react";

import { type Patch, patches, soundRows } from "../content";
import { m } from "../paraglide/messages.js";
import {
  type PresetId,
  type Synth,
  createSynth,
  phraseLength,
  playPhrase,
} from "../synth";
import { openEvent } from "./PocketSynth";
import { Section } from "./Section";
import classes from "./Sounds.module.css";

// The preview drawn as dot columns: 48 steps of a decaying envelope, each
// patch shaped a little differently. Fixed, so server and client agree.
const steps = 48;
const tallest = 4;
const seeds: Record<PresetId, number> = { bass: 1, keys: 4, pad: 2, lead: 3 };

function Wave({ patch }: { patch: PresetId }): ReactElement {
  const dots: ReactElement[] = [];
  for (let step = 0; step < steps; step += 1) {
    const envelope =
      Math.exp((-2.2 * step) / steps) *
      (0.55 + 0.45 * Math.abs(Math.sin(step * 0.7 + seeds[patch])));
    const height = Math.max(0, Math.round(envelope * (tallest + 1)) - 1);
    for (let offset = -height; offset <= height; offset += 1) {
      dots.push(
        <circle
          key={`${String(step)}:${String(offset)}`}
          cx={step * 11 + 2}
          cy={(tallest + offset) * 6 + 2}
          r={2}
        />,
      );
    }
  }
  return (
    <svg
      className={classes["wave"]}
      viewBox={`0 0 ${String(steps * 11 - 7)} ${String(tallest * 12 + 4)}`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {dots}
    </svg>
  );
}

const rows: readonly Patch[] = soundRows.flatMap((id) =>
  patches.filter((patch) => patch.id === id),
);

// Four rows, each playing one of the synth's patches when tapped.
export function Sounds(): ReactElement {
  const synth = useRef<Synth | undefined>(undefined);
  const [playing, setPlaying] = useState<PresetId | undefined>(undefined);

  // A row lights for as long as its phrase sounds.
  useEffect(() => {
    if (playing === undefined) return undefined;
    const timer = window.setTimeout(
      () => {
        setPlaying(undefined);
      },
      phraseLength(playing) * 1000,
    );
    return (): void => {
      window.clearTimeout(timer);
    };
  }, [playing]);

  function hear(row: Patch): void {
    synth.current ??= createSynth();
    playPhrase(synth.current, row.id);
    setPlaying(row.id);
  }

  return (
    <Section id="sounds" title={m.sounds_title()} wide>
      <ul className={classes["rows"]}>
        {rows.map((row) => (
          <li key={row.id}>
            <button
              type="button"
              className={classes["row"]}
              data-category={row.id}
              data-playing={playing === row.id || undefined}
              aria-label={m.sounds_play({ name: row.name() })}
              onClick={() => {
                hear(row);
              }}
            >
              <span className={classes["dot"]} aria-hidden="true" />
              <span className={classes["name"]}>{row.name()}</span>
              <span className={classes["kind"]}>{row.kind()}</span>
              <Wave patch={row.id} />
            </button>
          </li>
        ))}
      </ul>
      <p className={classes["note"]}>
        {m.sounds_note()}{" "}
        <button
          type="button"
          className={classes["open"]}
          onClick={() => {
            window.dispatchEvent(new Event(openEvent));
          }}
        >
          {m.sounds_note_action()}
        </button>
      </p>
    </Section>
  );
}
