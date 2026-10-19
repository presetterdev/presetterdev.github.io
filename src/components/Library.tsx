import { Slider } from "@mantine/core";
import {
  type KeyboardEvent,
  type ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  type LibrarySound,
  type Character,
  categories,
  librarySounds,
  characters,
} from "../content";
import { m } from "../paraglide/messages.js";
import {
  type Category,
  type Clock,
  type Pattern,
  type SoundId,
  type Synth,
  columns,
  createClock,
  createSynth,
  markPattern,
  midiName,
  patternFrom,
  rowMidi,
  rows,
} from "../synth";
import classes from "./Library.module.css";

const first: LibrarySound | undefined = librarySounds[0];
// How long the library may sit out of view before it fades out, and how
// long the fade takes, in milliseconds.
const offscreenWait = 3000;
const fadeLength = 1500;
const steps = Array.from({ length: columns }, (_, column) => column);
const notes = Array.from({ length: rows }, (_, row) => row);

// One synth for the page, made on first use: creating it makes an audio
// context, which only a gesture may start.
let shared: Synth | undefined;

function pageSynth(): Synth {
  shared ??= createSynth();
  return shared;
}

// Where the library's sound comes from. Tests pass fakes.
export interface AudioEngine {
  synth: () => Synth;
  clock: typeof createClock;
}

const pageAudio: AudioEngine = { synth: pageSynth, clock: createClock };

interface LibraryProps {
  audio?: AudioEngine;
}

function optionId(id: SoundId): string {
  return `library-${id}`;
}

function categoryLabel(id: Category): string {
  return categories.find((item) => item.id === id)?.label() ?? "";
}

function characterLabel(id: Character): string {
  return characters.find((item) => item.id === id)?.label() ?? "";
}

function rowName(sound: LibrarySound): string {
  return m.library_row({
    plugin: sound.plugin,
    category: categoryLabel(sound.category),
  });
}

function toggled(pattern: Pattern, column: number, row: number): Pattern {
  return pattern.map((col, c) =>
    c === column ? col.map((on, r) => (r === row ? !on : on)) : col,
  );
}

// A preview waveform as dot columns, shaped a little differently per sound.
// Fixed, so server and client agree.
function Wave({ seed }: { seed: number }): ReactElement {
  const length = 64;
  const dots: ReactElement[] = [];
  for (let step = 0; step < length; step += 1) {
    const envelope =
      Math.exp((-2.4 * step) / length) *
      (0.55 + 0.45 * Math.abs(Math.sin(step * 0.7 + seed)));
    const height = Math.round(envelope * 3);
    for (let offset = -height; offset <= height; offset += 1) {
      dots.push(
        <circle
          key={`${String(step)}:${String(offset)}`}
          cx={step * 6 + 1.5}
          cy={(3 + offset) * 4 + 2}
          r={1.3}
        />,
      );
    }
  }
  return (
    <svg
      className={classes["wave"]}
      viewBox={`0 0 ${String(length * 6)} 28`}
      preserveAspectRatio="xMinYMid meet"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {dots}
    </svg>
  );
}

// The clip in miniature: the button that opens the editor.
function Thumbnail({ pattern }: { pattern: Pattern }): ReactElement {
  const dots: ReactElement[] = [];
  for (const column of steps) {
    for (const row of notes) {
      dots.push(
        <circle
          key={`${String(column)}:${String(row)}`}
          cx={column * 4 + 1.5}
          cy={row * 4 + 1.5}
          r={1.3}
          className={
            pattern[column]?.[row] === true ? classes["thumbOn"] : undefined
          }
        />,
      );
    }
  }
  return (
    <svg
      className={classes["thumb"]}
      viewBox={`0 0 ${String(columns * 4 - 1)} ${String(rows * 4 - 1)}`}
      aria-hidden="true"
      focusable="false"
    >
      {dots}
    </svg>
  );
}

// A compact library shaped like the results side of Live's browser: filters
// on top, a list of sounds, a preview strip. Every sound plays the same
// clip, which folds out of the strip for editing. Silent until asked: the
// clock starts and sound comes on from a row, the play button or the sound
// toggle, all of which count as the gesture browsers require.
export function Library({ audio = pageAudio }: LibraryProps): ReactElement {
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [character, setCharacter] = useState<Character | undefined>(undefined);
  const [selected, setSelected] = useState<SoundId>(first?.id ?? "diva-lead");
  const [muted, setMuted] = useState(true);
  const [running, setRunning] = useState(false);
  const [editing, setEditing] = useState(false);
  const [pattern, setPattern] = useState<Pattern>(() =>
    patternFrom(markPattern),
  );
  const [bpm, setBpm] = useState(112);
  const [current, setCurrent] = useState<number | undefined>(undefined);

  const clock = useRef<Clock | undefined>(undefined);
  // What the clock reads on each tick, kept current without restarting it.
  const live = useRef({ pattern, sound: selected, bpm });
  useEffect(() => {
    live.current = { pattern, sound: selected, bpm };
  }, [pattern, selected, bpm]);
  const flashes = useRef<{ step: number; at: number }[]>([]);
  const root = useRef<HTMLElement>(null);

  const visible = librarySounds.filter(
    (sound) =>
      (category === undefined || sound.category === category) &&
      (character === undefined || sound.character === character),
  );
  const sound = librarySounds.find((item) => item.id === selected) ?? first;

  function hear(): void {
    const s = audio.synth();
    s.mute(false);
    setMuted(false);
    clock.current ??= audio.clock(
      s,
      () => live.current,
      (step, at) => {
        flashes.current.push({ step, at });
      },
    );
    clock.current.start();
    setRunning(true);
  }

  function stop(): void {
    clock.current?.stop();
    setRunning(false);
    setCurrent(undefined);
    flashes.current = [];
  }

  function toggleSound(): void {
    if (muted) {
      hear();
      return;
    }
    audio.synth().mute(true);
    setMuted(true);
  }

  function choose(id: SoundId): void {
    setSelected(id);
    live.current = { ...live.current, sound: id };
  }

  // A filter that hides the selected sound moves the selection to the first
  // one still shown, so what plays is always on screen.
  function filterBy(
    nextCategory: Category | undefined,
    nextCharacter: Character | undefined,
  ): void {
    setCategory(nextCategory);
    setCharacter(nextCharacter);
    const shown = librarySounds.filter(
      (item) =>
        (nextCategory === undefined || item.category === nextCategory) &&
        (nextCharacter === undefined || item.character === nextCharacter),
    );
    const [head] = shown;
    if (head !== undefined && !shown.some((item) => item.id === selected)) {
      choose(head.id);
    }
  }

  function onListKey(event: KeyboardEvent<HTMLUListElement>): void {
    const index = visible.findIndex((item) => item.id === selected);
    let next: number | undefined;
    if (event.key === "ArrowDown")
      next = Math.min(visible.length - 1, index + 1);
    if (event.key === "ArrowUp") next = Math.max(0, index - 1);
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = visible.length - 1;
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      if (running) stop();
      else hear();
      return;
    }
    const target = next === undefined ? undefined : visible[next];
    if (target === undefined) return;
    event.preventDefault();
    choose(target.id);
  }

  function toggleCell(column: number, row: number): void {
    const next = toggled(pattern, column, row);
    setPattern(next);
    live.current = { ...live.current, pattern: next };
  }

  function replace(next: Pattern): void {
    setPattern(next);
    live.current = { ...live.current, pattern: next };
  }

  // Lights the column the audio has actually reached.
  useEffect(() => {
    if (!running) return undefined;
    const s = audio.synth();
    let frame = 0;
    const paint = (): void => {
      const now = s.now();
      let latest: number | undefined;
      while (
        flashes.current.length > 0 &&
        (flashes.current[0]?.at ?? Infinity) <= now
      ) {
        latest = flashes.current.shift()?.step;
      }
      if (latest !== undefined) setCurrent(latest);
      frame = window.requestAnimationFrame(paint);
    };
    frame = window.requestAnimationFrame(paint);
    return (): void => {
      window.cancelAnimationFrame(frame);
    };
  }, [running, audio]);

  // Playing on out of sight is a nuisance: after a while off screen, the
  // clip fades out and stops. Scrolling back does not restart it.
  useEffect(() => {
    const node = root.current;
    if (!running || node === null) return undefined;
    // Running means the synth already exists.
    const synth = audio.synth();
    let wait: number | undefined;
    let fade: number | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting === true) {
        window.clearTimeout(wait);
        wait = undefined;
        return;
      }
      wait ??= window.setTimeout(() => {
        synth.mute(true, fadeLength / 1000);
        setMuted(true);
        fade = window.setTimeout(() => {
          clock.current?.stop();
          flashes.current = [];
          setRunning(false);
          setCurrent(undefined);
        }, fadeLength);
      }, offscreenWait);
    });
    observer.observe(node);
    return (): void => {
      observer.disconnect();
      window.clearTimeout(wait);
      window.clearTimeout(fade);
    };
  }, [running, audio]);

  // Nothing keeps sounding once the page goes away.
  useEffect(
    () => (): void => {
      clock.current?.stop();
    },
    [],
  );

  return (
    <section
      ref={root}
      className={classes["library"]}
      aria-label={m.library_label()}
    >
      <div className={classes["panel"]} data-category={sound?.category}>
        <div className={classes["filters"]}>
          <span className={classes["key"]}>{m.library_sounds()}</span>
          <div className={classes["chips"]}>
            {categories.map((item) => (
              <button
                key={item.id}
                type="button"
                className={classes["chip"]}
                data-category={item.id}
                aria-pressed={category === item.id}
                onClick={() => {
                  filterBy(
                    category === item.id ? undefined : item.id,
                    character,
                  );
                }}
              >
                <span className={classes["chipDot"]} aria-hidden="true" />
                {item.label()}
              </button>
            ))}
          </div>
          <span className={classes["key"]}>{m.library_characters()}</span>
          <div className={classes["chips"]}>
            {characters.map((item) => (
              <button
                key={item.id}
                type="button"
                className={classes["chip"]}
                aria-pressed={character === item.id}
                onClick={() => {
                  filterBy(
                    category,
                    character === item.id ? undefined : item.id,
                  );
                }}
              >
                {item.label()}
              </button>
            ))}
          </div>
        </div>

        <div className={classes["head"]}>
          <span className={classes["key"]}>{m.library_name()}</span>
          <button
            type="button"
            className={classes["sound"]}
            aria-pressed={!muted}
            onClick={toggleSound}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
              {muted ? (
                <path d="M17 9l5 6M22 9l-5 6" />
              ) : (
                <path d="M17 8.5a5 5 0 0 1 0 7" />
              )}
            </svg>
            {muted ? m.library_sound_off() : m.library_sound_on()}
          </button>
        </div>

        {visible.length === 0 ? (
          <p className={classes["empty"]}>{m.library_empty()}</p>
        ) : (
          <ul
            className={classes["list"]}
            role="listbox"
            tabIndex={0}
            aria-label={m.library_label()}
            aria-activedescendant={optionId(selected)}
            onKeyDown={onListKey}
          >
            {visible.map((item) => (
              <li
                key={item.id}
                id={optionId(item.id)}
                role="option"
                aria-selected={item.id === selected}
                className={classes["row"]}
                data-category={item.category}
                onClick={() => {
                  choose(item.id);
                  if (!running || muted) hear();
                }}
              >
                <span className={classes["dot"]} aria-hidden="true" />
                <span className={classes["name"]}>
                  {rowName(item)}
                  {item.id === selected ? (
                    <span className={classes["mark"]} aria-hidden="true">
                      *
                    </span>
                  ) : undefined}
                </span>
                <span className={classes["tags"]}>
                  {categoryLabel(item.category)} ·{" "}
                  {characterLabel(item.character)} · {item.tags()}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className={classes["strip"]}>
          <button
            type="button"
            className={classes["play"]}
            aria-label={running ? m.library_stop() : m.library_play()}
            onClick={() => {
              if (running) stop();
              else hear();
            }}
          >
            <svg viewBox="0 0 10 10" aria-hidden="true" focusable="false">
              {running ? (
                <rect x="2" y="2" width="6" height="6" />
              ) : (
                <path d="M3 1.5v7l5.5-3.5z" />
              )}
            </svg>
          </button>
          <Wave
            seed={librarySounds.findIndex((item) => item.id === selected) + 1}
          />
          <button
            type="button"
            className={classes["clip"]}
            aria-expanded={editing}
            aria-controls="library-clip"
            aria-label={m.library_clip_edit()}
            onClick={() => {
              setEditing((value) => !value);
            }}
          >
            <Thumbnail pattern={pattern} />
          </button>
        </div>

        {editing ? (
          <div id="library-clip" className={classes["editor"]}>
            <div className={classes["grid"]} role="grid">
              {notes.map((row) => (
                <div key={row} role="row" className={classes["gridRow"]}>
                  {steps.map((column) => (
                    <button
                      key={column}
                      type="button"
                      role="gridcell"
                      className={classes["cell"]}
                      data-now={column === current || undefined}
                      aria-pressed={pattern[column]?.[row] === true}
                      aria-label={m.library_clip_step({
                        step: column + 1,
                        note: midiName(rowMidi[row] ?? 60),
                      })}
                      onClick={() => {
                        toggleCell(column, row);
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className={classes["controls"]}>
              <Slider
                min={80}
                max={160}
                step={1}
                value={bpm}
                onChange={setBpm}
                label={(value) => m.library_clip_bpm({ bpm: value })}
                aria-label={m.library_clip_tempo()}
                size="xs"
                color="ink"
                w={110}
              />
              <span className={classes["bpm"]}>
                {m.library_clip_bpm({ bpm })}
              </span>
              <button
                type="button"
                className={classes["chip"]}
                onClick={() => {
                  replace(patternFrom(markPattern));
                }}
              >
                {m.library_clip_reset()}
              </button>
              <button
                type="button"
                className={classes["chip"]}
                onClick={() => {
                  replace(patternFrom([]));
                }}
              >
                {m.library_clip_clear()}
              </button>
              <span className={classes["hint"]}>{m.library_clip_hint()}</span>
            </div>
          </div>
        ) : undefined}
      </div>
      <p className={classes["caption"]}>
        {m.library_caption({ plugin: sound?.plugin ?? "" })}
      </p>
    </section>
  );
}
