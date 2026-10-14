import {
  useElementSize,
  useMediaQuery,
  useReducedMotion,
} from "@mantine/hooks";
import { type ReactElement, useEffect, useRef, useState } from "react";

import { type ReadoutFrame, readout } from "../content";
import { glyphColumns, glyphRows, lit } from "../dotFont";
import { type PresetId, type Synth, createSynth } from "../synth";
import classes from "./Readout.module.css";

// Characters per line. Wide puts the filters and the plugin on one line
// and the preset on the next, the way a two-line hardware display would;
// narrow stacks all three. The query matches the stylesheet's, which
// reserves the face's height before the canvas draws.
const wideColumns = 26;
const narrowColumns = 15;
const wideQuery = "(min-width: 43.25em)";

// One character cell is the glyph plus a dark gap column, and a line is
// the glyph plus two dark rows, so the grid is continuous like a real
// matrix and the lines don't touch.
const cellWidth = glyphColumns + 1;
const cellHeight = glyphRows + 2;

// Milliseconds a frame stays up, and how long a change takes to sweep
// across the display from left to right.
const dwell = 1700;
const sweep = 160;
const sweepPerColumn = 2;

const play = "▶";

// A short phrase per patch: note, start offset and length in seconds.
const phrases: Readonly<
  Record<PresetId, readonly (readonly [number, number, number])[]>
> = {
  pad: [
    [60, 0, 1.3],
    [63, 0, 1.3],
    [67, 0, 1.3],
    [70, 0, 1.3],
  ],
  keys: [
    [60, 0, 0.35],
    [67, 0.14, 0.35],
    [72, 0.28, 0.35],
    [75, 0.42, 0.7],
  ],
  // The bass patch already sits an octave down.
  bass: [
    [60, 0, 0.22],
    [60, 0.25, 0.22],
    [67, 0.5, 0.2],
    [63, 0.75, 0.45],
  ],
  lead: [
    [67, 0, 0.2],
    [70, 0.15, 0.2],
    [72, 0.3, 0.2],
    [75, 0.45, 0.6],
  ],
};

function phraseLength(patch: PresetId): number {
  let end = 0;
  for (const [, at, hold] of phrases[patch]) end = Math.max(end, at + hold);
  return end + 0.4;
}

function clip(text: string, columns: number): string {
  return text.length > columns ? text.slice(0, columns) : text;
}

// Left text, right text, and the space between, exactly `columns` wide.
function spread(left: string, right: string, columns: number): string {
  const l = clip(left, columns);
  const r = clip(right, Math.max(0, columns - l.length - 1));
  return l + " ".repeat(Math.max(1, columns - l.length - r.length)) + r;
}

function lines(frame: ReadoutFrame, wide: boolean): readonly string[] {
  const tags = frame.tags.join("  ");
  if (wide) {
    return [
      spread(tags, frame.plugin, wideColumns),
      spread(frame.preset, play, wideColumns),
    ];
  }
  return [
    clip(tags, narrowColumns).padEnd(narrowColumns),
    clip(frame.plugin, narrowColumns).padEnd(narrowColumns),
    spread(frame.preset, play, narrowColumns),
  ];
}

interface Grid {
  columns: number;
  rows: number;
  // One entry per dot: 1 lit, 0 dark.
  target: Float32Array;
}

function grid(text: readonly string[], columns: number): Grid {
  // The trailing gap rows and column are dropped.
  const rows = text.length * cellHeight - (cellHeight - glyphRows);
  const width = columns * cellWidth - (cellWidth - glyphColumns);
  const target = new Float32Array(width * rows);
  text.forEach((line, lineIndex) => {
    for (let c = 0; c < line.length; c += 1) {
      const char = line[c] ?? " ";
      for (let gy = 0; gy < glyphRows; gy += 1) {
        for (let gx = 0; gx < glyphColumns; gx += 1) {
          if (!lit(char, gx, gy)) continue;
          const x = c * cellWidth + gx;
          const y = lineIndex * cellHeight + gy;
          target[y * width + x] = 1;
        }
      }
    }
  });
  return { columns: width, rows, target };
}

interface Painter {
  // Sets a new target; the dots sweep to it, or jump if `instant`.
  show(text: readonly string[], columns: number, instant: boolean): void;
  resize(width: number, dpr: number): void;
  // Lights the play glyph white while a sound is playing.
  playing(on: boolean): void;
  stop(): void;
}

// Draws the display on a canvas: a few thousand dots, each with a
// brightness that eases toward its target, so a change ripples across the
// face from left to right instead of flipping.
function createPainter(canvas: HTMLCanvasElement, accent: string): Painter {
  const context = canvas.getContext("2d");
  let current: Grid | undefined;
  let level = new Float32Array(0);
  let from = new Float32Array(0);
  let started = 0;
  let instantly = false;
  let frame: number | undefined;
  let width = 0;
  let dpr = 1;
  let lastColumns = 0;
  let isPlaying = false;

  function paint(): void {
    if (context === null || current === undefined) return;
    const pitch = width / current.columns;
    context.save();
    context.scale(dpr, dpr);
    context.clearRect(0, 0, width, pitch * current.rows);
    const radius = pitch * 0.36;
    for (let y = 0; y < current.rows; y += 1) {
      for (let x = 0; x < current.columns; x += 1) {
        const value = level[y * current.columns + x] ?? 0;
        const inPlayGlyph =
          isPlaying &&
          x >= current.columns - glyphColumns &&
          y >= current.rows - glyphRows;
        const colour = inPlayGlyph && value > 0.5 ? "#ffffff" : accent;
        const cx = (x + 0.5) * pitch;
        const cy = (y + 0.5) * pitch;
        // A lit LED blooms a little past its own edge.
        if (value > 0.02) {
          context.globalAlpha = 0.16 * value;
          context.fillStyle = colour;
          context.beginPath();
          context.arc(cx, cy, radius * 2, 0, Math.PI * 2);
          context.fill();
        }
        context.globalAlpha = 0.12 + 0.88 * value;
        context.fillStyle = colour;
        context.beginPath();
        context.arc(cx, cy, radius * (0.9 + 0.1 * value), 0, Math.PI * 2);
        context.fill();
      }
    }
    context.restore();
  }

  function tick(now: number): void {
    if (current === undefined) return;
    let settled = true;
    for (let y = 0; y < current.rows; y += 1) {
      for (let x = 0; x < current.columns; x += 1) {
        const i = y * current.columns + x;
        const target = current.target[i] ?? 0;
        const start = started + (instantly ? 0 : x * sweepPerColumn);
        const t = instantly ? 1 : Math.min(1, (now - start) / sweep);
        const eased = t < 0 ? 0 : 1 - (1 - t) * (1 - t);
        const origin = from[i] ?? 0;
        level[i] = origin + (target - origin) * eased;
        if (t < 1) settled = false;
      }
    }
    paint();
    frame = settled ? undefined : window.requestAnimationFrame(tick);
  }

  function begin(instant: boolean): void {
    if (frame !== undefined) window.cancelAnimationFrame(frame);
    from = Float32Array.from(level);
    started = performance.now();
    instantly = instant;
    frame = window.requestAnimationFrame(tick);
  }

  return {
    show(text, columns, instant): void {
      const next = grid(text, columns);
      let jump = instant;
      if (columns !== lastColumns || level.length !== next.target.length) {
        level = new Float32Array(next.target.length);
        lastColumns = columns;
        jump = true;
      }
      current = next;
      begin(jump);
    },
    resize(nextWidth, nextDpr): void {
      width = nextWidth;
      dpr = nextDpr;
      if (current === undefined) return;
      // The face is a box of the grid's aspect ratio (see the stylesheet);
      // the canvas fills it, so only the backing store needs sizing.
      const height = (nextWidth / current.columns) * current.rows;
      canvas.width = Math.round(nextWidth * nextDpr);
      canvas.height = Math.round(height * nextDpr);
      paint();
    },
    playing(on): void {
      isPlaying = on;
      paint();
    },
    stop(): void {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
    },
  };
}

export function Readout(): ReactElement {
  const { ref, width } = useElementSize<HTMLDivElement>();
  const wide = useMediaQuery(wideQuery, true, {
    getInitialValueInEffect: true,
  });
  const reduced = useReducedMotion();
  const canvas = useRef<HTMLCanvasElement>(null);
  const painter = useRef<Painter | undefined>(undefined);
  const synth = useRef<Synth | undefined>(undefined);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const frame = readout.frames[index % readout.frames.length];

  // The painter lives as long as the canvas does.
  useEffect(() => {
    const element = canvas.current;
    if (element === null) return undefined;
    const accent = getComputedStyle(element).getPropertyValue("--pt-accent");
    const p = createPainter(element, accent.trim() || "#7dd3fc");
    painter.current = p;
    return (): void => {
      p.stop();
      painter.current = undefined;
    };
  }, []);

  // A new frame, or a new layout, redraws the face.
  useEffect(() => {
    if (frame === undefined) return;
    painter.current?.show(
      lines(frame, wide),
      wide ? wideColumns : narrowColumns,
      reduced,
    );
  }, [frame, wide, reduced]);

  useEffect(() => {
    if (width === 0) return;
    painter.current?.resize(width, window.devicePixelRatio || 1);
  }, [width, wide]);

  useEffect(() => {
    painter.current?.playing(playing);
  }, [playing]);

  // The display scrolls on its own, except while a sound plays or when the
  // visitor has asked for less motion.
  useEffect(() => {
    if (reduced || playing) return undefined;
    const timer = window.setInterval(() => {
      setIndex((value) => value + 1);
    }, dwell);
    return (): void => {
      window.clearInterval(timer);
    };
  }, [reduced, playing]);

  function hear(): void {
    if (frame === undefined || playing) return;
    synth.current ??= createSynth();
    const s = synth.current;
    s.wake();
    const now = s.now();
    const voices = phrases[frame.patch].length;
    const scale = voices > 1 ? 1.4 / Math.sqrt(voices) : 1;
    for (const [midi, at, hold] of phrases[frame.patch]) {
      s.play(frame.patch, midi, now + at, hold, scale);
    }
    setPlaying(true);
    window.setTimeout(
      () => {
        setPlaying(false);
        // With motion reduced the display only moves when asked.
        if (reduced) setIndex((value) => value + 1);
      },
      phraseLength(frame.patch) * 1000,
    );
  }

  return (
    <figure className={classes["figure"]}>
      <button
        type="button"
        className={classes["display"]}
        onClick={hear}
        aria-label={readout.label}
      >
        <div ref={ref} className={classes["face"]}>
          <canvas ref={canvas} className={classes["canvas"]} aria-hidden />
        </div>
      </button>
      <figcaption className={classes["caption"]}>{readout.caption}</figcaption>
    </figure>
  );
}
