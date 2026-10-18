import { type ReactElement, useEffect, useRef, useState } from "react";

import { type SoundRow, sounds } from "../content";
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

// Four rows, each playing one of the hidden synth's patches when tapped.
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

  function hear(row: SoundRow): void {
    synth.current ??= createSynth();
    playPhrase(synth.current, row.patch);
    setPlaying(row.patch);
  }

  return (
    <Section id="sounds" title={sounds.title} wide>
      <ul className={classes["rows"]}>
        {sounds.rows.map((row) => (
          <li key={row.patch}>
            <button
              type="button"
              className={classes["row"]}
              data-category={row.patch}
              data-playing={playing === row.patch || undefined}
              aria-label={`${sounds.label} ${row.name}`}
              onClick={() => {
                hear(row);
              }}
            >
              <span className={classes["dot"]} aria-hidden="true" />
              <span className={classes["name"]}>{row.name}</span>
              <span className={classes["kind"]}>{row.kind}</span>
              <Wave patch={row.patch} />
            </button>
          </li>
        ))}
      </ul>
      <p className={classes["note"]}>
        {sounds.note}{" "}
        <button
          type="button"
          className={classes["open"]}
          onClick={() => {
            window.dispatchEvent(new Event(openEvent));
          }}
        >
          {sounds.noteAction}
        </button>
      </p>
    </Section>
  );
}
