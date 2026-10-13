import { Button, Group, Kbd, Modal, Slider, Text, Title } from "@mantine/core";
import {
  type ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { pocketSynth } from "../content";
import {
  type Clock,
  type Pattern,
  type PresetId,
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
import { Mark } from "./Mark";
import classes from "./PocketSynth.module.css";

interface Key {
  key: string;
  midi: number;
  black: boolean;
}

// One octave from C4 on the home row, sharps on the row above.
const keyboard: readonly Key[] = [
  { key: "a", midi: 60, black: false },
  { key: "w", midi: 61, black: true },
  { key: "s", midi: 62, black: false },
  { key: "e", midi: 63, black: true },
  { key: "d", midi: 64, black: false },
  { key: "f", midi: 65, black: false },
  { key: "t", midi: 66, black: true },
  { key: "g", midi: 67, black: false },
  { key: "y", midi: 68, black: true },
  { key: "h", midi: 69, black: false },
  { key: "u", midi: 70, black: true },
  { key: "j", midi: 71, black: false },
  { key: "k", midi: 72, black: false },
];
const whiteKeys = keyboard.filter((key) => !key.black).length;

// Dispatched on window by anything that wants to open the synth without a
// keyboard, such as the not-found page's hint on a phone.
export const openEvent = "presetter:synth";

function isTyping(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable)
  );
}

function toggled(pattern: Pattern, column: number, row: number): Pattern {
  return pattern.map((col, c) =>
    c === column ? col.map((on, r) => (r === row ? !on : on)) : col,
  );
}

// The easter egg: the mark as a step sequencer, with four presets in the
// site's category colours and a keyboard to play over the loop. Hidden
// behind the P key on every page; the not-found page is the only hint.
export function PocketSynth(): ReactElement {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<PresetId>("pad");
  const [pattern, setPattern] = useState<Pattern>(() =>
    patternFrom(markPattern),
  );
  const [bpm, setBpm] = useState(112);
  const [running, setRunning] = useState(false);
  const [current, setCurrent] = useState<number | undefined>(undefined);
  const [lastNote, setLastNote] = useState("");
  const [lit, setLit] = useState<number | undefined>(undefined);

  const synth = useRef<Synth | undefined>(undefined);
  const clock = useRef<Clock | undefined>(undefined);
  const live = useRef({ pattern, preset, bpm });
  live.current = { pattern, preset, bpm };
  const flashes = useRef<{ step: number; at: number }[]>([]);

  function engine(): Synth {
    synth.current ??= createSynth();
    return synth.current;
  }

  const noteOn = useCallback((midi: number): void => {
    const s = engine();
    s.wake();
    s.play(live.current.preset, midi, s.now(), 0.35);
    setLit(midi);
    window.setTimeout(() => {
      setLit((value) => (value === midi ? undefined : value));
    }, 180);
    const label = pocketSynth.presets.find(
      (item) => item.id === live.current.preset,
    );
    setLastNote(`${midiName(midi)} · ${label?.label ?? ""}`);
  }, []);

  function stop(): void {
    clock.current?.stop();
    setRunning(false);
    setCurrent(undefined);
    flashes.current = [];
  }

  function start(): void {
    const s = engine();
    clock.current ??= createClock(
      s,
      () => live.current,
      (step, at) => {
        flashes.current.push({ step, at });
      },
    );
    clock.current.start();
    setRunning(true);
  }

  // Lights the column the audio has actually reached.
  useEffect(() => {
    if (!running) return undefined;
    let frame = 0;
    const paint = (): void => {
      const s = synth.current;
      if (s !== undefined) {
        const now = s.now();
        let latest: number | undefined;
        while (
          flashes.current.length > 0 &&
          (flashes.current[0]?.at ?? Infinity) <= now
        ) {
          latest = flashes.current.shift()?.step;
        }
        if (latest !== undefined) setCurrent(latest);
      }
      frame = window.requestAnimationFrame(paint);
    };
    frame = window.requestAnimationFrame(paint);
    return (): void => {
      window.cancelAnimationFrame(frame);
    };
  }, [running]);

  // P opens and closes it; while open, the home row plays and space runs
  // the clock. Nothing is captured while the visitor is typing in a field.
  useEffect(() => {
    const onKey = (event: KeyboardEvent): void => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTyping(event.target)) return;
      const key = event.key.toLowerCase();
      if (key === "p") {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }
      if (!open) return;
      if (key === " ") {
        event.preventDefault();
        if (clock.current?.running() === true) stop();
        else start();
        return;
      }
      if (event.repeat) return;
      const note = keyboard.find((item) => item.key === key);
      if (note !== undefined) noteOn(note.midi);
    };
    const onOpen = (): void => {
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(openEvent, onOpen);
    return (): void => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(openEvent, onOpen);
    };
  });

  function close(): void {
    stop();
    setOpen(false);
  }

  function choosePreset(id: PresetId): void {
    setPreset(id);
    live.current = { ...live.current, preset: id };
    const s = engine();
    s.wake();
    s.play(id, rowMidi[3] ?? 67, s.now(), 0.3);
  }

  function toggle(column: number, row: number): void {
    const next = toggled(pattern, column, row);
    setPattern(next);
    live.current = { ...live.current, pattern: next };
    const midi = rowMidi[row];
    if (next[column]?.[row] === true && midi !== undefined) {
      const s = engine();
      s.wake();
      s.play(live.current.preset, midi, s.now(), 0.25);
    }
  }

  let whiteIndex = 0;

  return (
    <Modal
      opened={open}
      onClose={close}
      size={820}
      centered
      padding="lg"
      radius="lg"
      title={
        <span className={classes["heading"]}>
          <Mark className={classes["mark"]} />
          <span>{pocketSynth.title}</span>
        </span>
      }
      classNames={{ content: classes["content"] ?? "" }}
    >
      <Text c="dimmed" mb="md" maw={560} lh={1.5}>
        {pocketSynth.lede}
      </Text>

      <Group gap={8} mb="md" role="group" aria-label={pocketSynth.presetLabel}>
        <Text size="xs" c="dimmed" mr={4}>
          {pocketSynth.presetLabel}
        </Text>
        {pocketSynth.presets.map((item) => (
          <button
            key={item.id}
            type="button"
            className={classes["chip"]}
            data-category={item.id}
            aria-pressed={preset === item.id}
            onClick={() => {
              choosePreset(item.id);
            }}
          >
            {item.label}
          </button>
        ))}
      </Group>

      <section
        className={classes["sequencer"]}
        data-category={preset}
        aria-label={pocketSynth.size}
      >
        <div className={classes["grid"]} role="grid">
          {Array.from({ length: rows }, (_, row) =>
            Array.from({ length: columns }, (__, column) => (
              <button
                key={`${column}-${row}`}
                type="button"
                role="gridcell"
                className={
                  column === current ? classes["dotNow"] : classes["dot"]
                }
                aria-pressed={pattern[column]?.[row] === true}
                aria-label={`Step ${column + 1}, ${midiName(rowMidi[row] ?? 60)}`}
                onClick={() => {
                  toggle(column, row);
                }}
              />
            )),
          )}
        </div>
        <div className={classes["scale"]}>
          <span>{pocketSynth.scale}</span>
          <span>{pocketSynth.size}</span>
        </div>
        <Group gap="sm" align="center">
          <Button
            onClick={() => {
              if (running) stop();
              else start();
            }}
            miw={88}
          >
            {running ? pocketSynth.stop : pocketSynth.play}
          </Button>
          <Button
            variant="default"
            onClick={() => {
              const next = patternFrom(markPattern);
              setPattern(next);
              live.current = { ...live.current, pattern: next };
            }}
          >
            {pocketSynth.reset}
          </Button>
          <Button
            variant="default"
            onClick={() => {
              const next = patternFrom([]);
              setPattern(next);
              live.current = { ...live.current, pattern: next };
            }}
          >
            {pocketSynth.clear}
          </Button>
          <Group gap="sm" ml="auto" className={classes["tempo"]}>
            <Text size="sm" c="dimmed">
              {pocketSynth.tempo}
            </Text>
            <Slider
              min={80}
              max={160}
              step={1}
              value={bpm}
              onChange={(value) => {
                setBpm(value);
                live.current = { ...live.current, bpm: value };
              }}
              label={(value) => `${value} BPM`}
              aria-label={pocketSynth.tempo}
              w={140}
            />
            <Text size="sm" ff="monospace" miw={64}>
              {bpm} BPM
            </Text>
          </Group>
        </Group>
      </section>

      <section
        className={classes["keysWrap"]}
        data-category={preset}
        aria-label={pocketSynth.keysTitle}
      >
        <div className={classes["keysHead"]}>
          <Title order={3} fz={15}>
            {pocketSynth.keysTitle}
          </Title>
          <Text size="sm" c="dimmed">
            <Kbd>A</Kbd>–<Kbd>K</Kbd> white, <Kbd>W</Kbd> <Kbd>E</Kbd>{" "}
            <Kbd>T</Kbd> <Kbd>Y</Kbd> <Kbd>U</Kbd> black. Or tap.
          </Text>
        </div>
        <div className={classes["keys"]}>
          {keyboard.map((key) => {
            const position = whiteIndex;
            if (!key.black) whiteIndex += 1;
            const style = key.black
              ? {
                  left: `calc(100% / ${whiteKeys} * ${position} - 100% / ${whiteKeys} * 0.31)`,
                }
              : undefined;
            return (
              <div
                key={key.key}
                role="button"
                tabIndex={0}
                aria-label={midiName(key.midi)}
                className={[
                  key.black ? classes["keyBlack"] : classes["key"],
                  lit === key.midi ? classes["keyOn"] : "",
                ].join(" ")}
                style={style}
                onPointerDown={(event) => {
                  event.preventDefault();
                  noteOn(key.midi);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") noteOn(key.midi);
                }}
              >
                {key.key.toUpperCase()}
              </div>
            );
          })}
        </div>
        <Text size="xs" c="dimmed" ff="monospace" mih="1.4em">
          {lastNote}
        </Text>
      </section>

      <Text size="xs" c="dimmed" mt="md">
        {pocketSynth.dismiss}
      </Text>
    </Modal>
  );
}
