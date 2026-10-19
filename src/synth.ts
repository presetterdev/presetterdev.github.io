// The library's sound: a small polysynth and a step clock on the Web Audio
// API, with no samples and no libraries. components/Library.tsx owns the UI;
// this file owns the audio graph.

// The four kinds of sound. Each keeps one colour wherever it appears.
export type Category = "pad" | "keys" | "bass" | "lead";

// The library's sounds. Each is a patch made here, aimed at the kind of
// sound its row names, not a copy of any plugin.
export type SoundId =
  | "diva-lead"
  | "omnisphere-pad"
  | "serum2-bass"
  | "keyscape-keys"
  | "pigments-pad"
  | "massivex-bass"
  | "serum-lead"
  | "kontakt-keys";

// A low-frequency oscillator on one voice: pitch in cents, cutoff in Hz, or
// gain as a fraction of the level.
interface Lfo {
  target: "pitch" | "cutoff" | "gain";
  rate: number;
  depth: number;
}

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
  lfo?: Lfo;
}

export const patches: Record<SoundId, Patch> = {
  "diva-lead": {
    oscillators: ["sawtooth", "sawtooth"],
    detune: 8,
    octave: 0,
    cutoff: 1800,
    resonance: 1.4,
    attack: 0.015,
    decay: 0.25,
    sustain: 0.7,
    release: 0.25,
    gain: 0.12,
    send: 0.25,
    lfo: { target: "pitch", rate: 5.5, depth: 6 },
  },
  "omnisphere-pad": {
    oscillators: ["sawtooth", "sawtooth"],
    detune: 14,
    octave: 0,
    cutoff: 1100,
    resonance: 0.8,
    attack: 0.35,
    decay: 0.4,
    sustain: 0.85,
    release: 1.2,
    gain: 0.1,
    send: 0.5,
    lfo: { target: "cutoff", rate: 0.35, depth: 500 },
  },
  "serum2-bass": {
    oscillators: ["square", "sawtooth"],
    detune: 5,
    octave: -1,
    cutoff: 500,
    resonance: 6,
    attack: 0.005,
    decay: 0.2,
    sustain: 0.6,
    release: 0.15,
    gain: 0.16,
    send: 0.05,
    lfo: { target: "cutoff", rate: 7.5, depth: 450 },
  },
  "keyscape-keys": {
    oscillators: ["sine", "triangle"],
    detune: 2,
    octave: 0,
    cutoff: 2800,
    resonance: 0.3,
    attack: 0.003,
    decay: 0.6,
    sustain: 0.15,
    release: 0.5,
    gain: 0.18,
    send: 0.2,
    lfo: { target: "gain", rate: 4.5, depth: 0.3 },
  },
  "pigments-pad": {
    oscillators: ["sawtooth", "sawtooth"],
    detune: 22,
    octave: 0,
    cutoff: 3200,
    resonance: 0.5,
    attack: 0.15,
    decay: 0.3,
    sustain: 0.8,
    release: 0.8,
    gain: 0.08,
    send: 0.45,
  },
  "massivex-bass": {
    oscillators: ["sine", "triangle"],
    detune: 0,
    octave: -1,
    cutoff: 420,
    resonance: 0.7,
    attack: 0.004,
    decay: 0.25,
    sustain: 0.7,
    release: 0.12,
    gain: 0.22,
    send: 0.02,
  },
  "serum-lead": {
    oscillators: ["sawtooth", "square"],
    detune: 6,
    octave: 0,
    cutoff: 1500,
    resonance: 2,
    attack: 0.002,
    decay: 0.14,
    sustain: 0,
    release: 0.12,
    gain: 0.14,
    send: 0.35,
  },
  "kontakt-keys": {
    oscillators: ["triangle", "sine"],
    detune: 1,
    octave: 0,
    cutoff: 4000,
    resonance: 0.2,
    attack: 0.002,
    decay: 0.9,
    sustain: 0,
    release: 0.6,
    gain: 0.2,
    send: 0.15,
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
  // Silences everything without stopping it, over `fade` seconds.
  mute(muted: boolean, fade?: number): void;
  // Copies the latest samples of the mix into `into`, muted or not; zeros
  // before anything has played. For drawing, not for listening.
  scope(into: Float32Array<ArrayBuffer>): void;
  play(
    sound: SoundId,
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
  let out: GainNode | undefined;
  let analyser: AnalyserNode | undefined;
  let send: GainNode | undefined;
  // Silent until someone asks for sound.
  let muted = true;

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
    // The mix, then the mute, so the scope still sees a muted mix.
    master = context.createGain();
    master.gain.value = 0.9;
    out = context.createGain();
    out.gain.value = muted ? 0 : 1;
    master.connect(out).connect(limiter).connect(context.destination);
    analyser = context.createAnalyser();
    analyser.fftSize = 1024;
    master.connect(analyser);
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
    mute(value, fade = 0.06): void {
      muted = value;
      if (context !== undefined && out !== undefined) {
        // setTargetAtTime is within 5% of the target after three time
        // constants.
        out.gain.setTargetAtTime(value ? 0 : 1, context.currentTime, fade / 3);
      }
    },
    scope(into): void {
      if (analyser === undefined) into.fill(0);
      else analyser.getFloatTimeDomainData(into);
    },
    play(sound, midi, when, hold, scale = 1): void {
      const g = graph();
      const patch = patches[sound];
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
      // Tremolo sits between the filter and the envelope, so it scales the
      // level without fighting the envelope's own automation.
      const trem = g.context.createGain();
      filter.connect(trem).connect(env);
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
      // An LFO's output adds to the parameter it drives.
      let wobble: GainNode | undefined;
      if (patch.lfo !== undefined) {
        const lfo = g.context.createOscillator();
        lfo.frequency.value = patch.lfo.rate;
        wobble = g.context.createGain();
        wobble.gain.value = patch.lfo.depth;
        lfo.connect(wobble);
        lfo.start(when);
        lfo.stop(end + 0.1);
        if (patch.lfo.target === "cutoff") wobble.connect(filter.frequency);
        if (patch.lfo.target === "gain") {
          trem.gain.value = 1 - patch.lfo.depth;
          wobble.connect(trem.gain);
        }
      }
      patch.oscillators.forEach((type, index) => {
        const osc = g.context.createOscillator();
        osc.type = type;
        osc.frequency.value = frequency;
        osc.detune.value = (index === 0 ? -1 : 1) * patch.detune;
        if (patch.lfo?.target === "pitch") wobble?.connect(osc.detune);
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
  read: () => { pattern: Pattern; sound: SoundId; bpm: number },
  onStep: (step: number, at: number) => void,
): Clock {
  const lookahead = 0.12;
  const tick = 25;
  let timer: number | undefined;
  let step = 0;
  let next = 0;

  function schedule(): void {
    const { pattern, sound, bpm } = read();
    const duration = 60 / bpm / 4;
    while (next < synth.now() + lookahead) {
      const column = pattern[step] ?? [];
      const voices = column.filter(Boolean).length;
      const scale = voices > 1 ? 1 / Math.sqrt(voices) : 1;
      column.forEach((on, row) => {
        const midi = rowMidi[row];
        if (on && midi !== undefined) {
          synth.play(sound, midi, next, duration * 0.9, scale);
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
