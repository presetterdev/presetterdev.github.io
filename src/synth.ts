// The pocket synth's sound: a small polysynth and a step clock on the Web
// Audio API, with no samples and no libraries. The component in
// components/PocketSynth.tsx owns the UI; this file owns the audio graph.

export type PresetId = "pad" | "keys" | "bass" | "lead";

interface Patch {
  oscillators: readonly OscillatorType[];
  detune: number;
  octave: number;
  cutoff: number;
  resonance: number;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  gain: number;
  send: number;
  vibrato: number;
}

export const patches: Record<PresetId, Patch> = {
  pad: {
    oscillators: ["sawtooth", "sawtooth"],
    detune: 9,
    octave: 0,
    cutoff: 1400,
    resonance: 0.6,
    attack: 0.22,
    decay: 0.3,
    sustain: 0.8,
    release: 0.9,
    gain: 0.11,
    send: 0.35,
    vibrato: 0,
  },
  keys: {
    oscillators: ["triangle", "sine"],
    detune: 3,
    octave: 0,
    cutoff: 3200,
    resonance: 0.4,
    attack: 0.004,
    decay: 0.35,
    sustain: 0.25,
    release: 0.45,
    gain: 0.16,
    send: 0.25,
    vibrato: 0,
  },
  bass: {
    oscillators: ["square", "sawtooth"],
    detune: 4,
    octave: -1,
    cutoff: 520,
    resonance: 1.2,
    attack: 0.006,
    decay: 0.18,
    sustain: 0.5,
    release: 0.18,
    gain: 0.17,
    send: 0.05,
    vibrato: 0,
  },
  lead: {
    oscillators: ["sawtooth", "square"],
    detune: 6,
    octave: 0,
    cutoff: 2600,
    resonance: 0.9,
    attack: 0.02,
    decay: 0.2,
    sustain: 0.6,
    release: 0.3,
    gain: 0.12,
    send: 0.3,
    vibrato: 5,
  },
};

export const columns = 16;
export const rows = 7;

// C minor pentatonic, top row highest, so nothing a visitor taps can clash.
export const rowMidi: readonly number[] = [75, 72, 70, 67, 65, 63, 60];

// The mark's lit dots as (column, row): the riff the grid opens with.
export const markPattern: readonly (readonly [number, number])[] = [
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
  [0, 1],
  [4, 1],
  [0, 2],
  [4, 2],
  [0, 3],
  [1, 3],
  [2, 3],
  [3, 3],
  [0, 4],
  [0, 5],
  [0, 6],
];

export type Pattern = readonly (readonly boolean[])[];

export function patternFrom(
  cells: readonly (readonly [number, number])[],
): Pattern {
  const grid = Array.from({ length: columns }, () =>
    Array.from({ length: rows }, () => false),
  );
  for (const [column, row] of cells) {
    const col = grid[column];
    if (col !== undefined && row < rows) col[row] = true;
  }
  return grid;
}

export function midiName(midi: number): string {
  const names = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  return `${names[midi % 12] ?? ""}${Math.floor(midi / 12) - 1}`;
}

export interface Synth {
  // Starts the audio context, which browsers allow only after a gesture.
  wake(): void;
  now(): number;
  play(
    preset: PresetId,
    midi: number,
    when: number,
    hold: number,
    scale?: number,
  ): void;
}

// One instance per page; the context is created on the first sound.
export function createSynth(): Synth {
  let context: AudioContext | undefined;
  let master: GainNode | undefined;
  let send: GainNode | undefined;

  function graph(): {
    context: AudioContext;
    master: GainNode;
    send: GainNode;
  } {
    if (context !== undefined && master !== undefined && send !== undefined) {
      if (context.state === "suspended") void context.resume();
      return { context, master, send };
    }
    context = new AudioContext();
    const limiter = context.createDynamicsCompressor();
    limiter.threshold.value = -14;
    limiter.ratio.value = 4;
    limiter.attack.value = 0.004;
    limiter.release.value = 0.2;
    master = context.createGain();
    master.gain.value = 0.9;
    master.connect(limiter).connect(context.destination);
    // One shared echo, for space.
    const delay = context.createDelay(1);
    delay.delayTime.value = 0.32;
    const feedback = context.createGain();
    feedback.gain.value = 0.32;
    const tone = context.createBiquadFilter();
    tone.type = "lowpass";
    tone.frequency.value = 2400;
    send = context.createGain();
    send.connect(delay);
    delay.connect(tone);
    tone.connect(feedback);
    feedback.connect(delay);
    tone.connect(master);
    return { context, master, send };
  }

  return {
    wake(): void {
      graph();
    },
    now(): number {
      return graph().context.currentTime;
    },
    play(preset, midi, when, hold, scale = 1): void {
      const g = graph();
      const patch = patches[preset];
      const frequency = 440 * 2 ** ((midi + 12 * patch.octave - 69) / 12);
      const peak = patch.gain * scale;
      const env = g.context.createGain();
      env.gain.value = 0;
      const filter = g.context.createBiquadFilter();
      filter.type = "lowpass";
      filter.Q.value = patch.resonance;
      filter.frequency.setValueAtTime(patch.cutoff * 0.5, when);
      filter.frequency.linearRampToValueAtTime(
        patch.cutoff * 1.6,
        when + Math.max(0.01, patch.attack),
      );
      filter.frequency.exponentialRampToValueAtTime(
        patch.cutoff,
        when + patch.attack + patch.decay,
      );
      filter.connect(env);
      env.connect(g.master);
      const toEcho = g.context.createGain();
      toEcho.gain.value = patch.send;
      env.connect(toEcho);
      toEcho.connect(g.send);

      const sustainAt = Math.max(
        when + hold,
        when + patch.attack + patch.decay,
      );
      const end = sustainAt + patch.release;
      patch.oscillators.forEach((type, index) => {
        const osc = g.context.createOscillator();
        osc.type = type;
        osc.frequency.value = frequency;
        osc.detune.value = (index === 0 ? -1 : 1) * patch.detune;
        if (patch.vibrato > 0) {
          const lfo = g.context.createOscillator();
          const depth = g.context.createGain();
          lfo.frequency.value = 5.5;
          depth.gain.value = patch.vibrato;
          lfo.connect(depth).connect(osc.detune);
          lfo.start(when);
          lfo.stop(end + 0.1);
        }
        osc.connect(filter);
        osc.start(when);
        osc.stop(end + 0.05);
      });
      env.gain.setValueAtTime(0, when);
      env.gain.linearRampToValueAtTime(peak, when + patch.attack);
      env.gain.linearRampToValueAtTime(
        peak * patch.sustain,
        when + patch.attack + patch.decay,
      );
      env.gain.setValueAtTime(peak * patch.sustain, sustainAt);
      env.gain.linearRampToValueAtTime(0.0001, end);
    },
  };
}

export interface Clock {
  start(): void;
  stop(): void;
  running(): boolean;
}

// Schedules a little ahead of the audio clock on a coarse timer, the usual
// way to keep Web Audio steady while the page does other things. `step` is
// called with each step's index and start time as it is scheduled, so the
// UI can light the column when the audio actually reaches it.
export function createClock(
  synth: Synth,
  read: () => { pattern: Pattern; preset: PresetId; bpm: number },
  onStep: (step: number, at: number) => void,
): Clock {
  const lookahead = 0.12;
  const tick = 25;
  let timer: number | undefined;
  let step = 0;
  let next = 0;

  function schedule(): void {
    const { pattern, preset, bpm } = read();
    const duration = 60 / bpm / 4;
    while (next < synth.now() + lookahead) {
      const column = pattern[step] ?? [];
      const voices = column.filter(Boolean).length;
      const scale = voices > 1 ? 1 / Math.sqrt(voices) : 1;
      column.forEach((on, row) => {
        const midi = rowMidi[row];
        if (on && midi !== undefined) {
          synth.play(preset, midi, next, duration * 0.9, scale);
        }
      });
      onStep(step, next);
      step = (step + 1) % columns;
      next += duration;
    }
  }

  return {
    start(): void {
      if (timer !== undefined) return;
      synth.wake();
      step = 0;
      next = synth.now() + 0.05;
      timer = window.setInterval(schedule, tick);
    },
    stop(): void {
      if (timer === undefined) return;
      window.clearInterval(timer);
      timer = undefined;
    },
    running(): boolean {
      return timer !== undefined;
    },
  };
}
