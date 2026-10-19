import { MantineProvider } from "@mantine/core";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { m } from "../paraglide/messages.js";
import type { Pattern, SoundId, Synth } from "../synth";
import { theme } from "../theme";
import { type AudioEngine, Library } from "./Library";

interface Heard {
  pattern: Pattern;
  sound: SoundId;
  bpm: number;
}

// A synth and clock that only record what they were asked to do.
function fakeAudio(): {
  audio: AudioEngine;
  mutes: (readonly [boolean, number | undefined])[];
  running: () => boolean;
  heard: () => Heard | undefined;
  step: (step: number, at: number) => void;
  setTime: (seconds: number) => void;
} {
  const mutes: (readonly [boolean, number | undefined])[] = [];
  let time = 0;
  let ticking = false;
  let read: (() => Heard) | undefined;
  let onStep: ((step: number, at: number) => void) | undefined;
  const synth: Synth = {
    wake: () => undefined,
    now: () => time,
    mute: (muted, fade) => {
      mutes.push([muted, fade]);
    },
    play: () => undefined,
  };
  return {
    audio: {
      synth: () => synth,
      clock: (_synth, reader, stepped) => {
        read = reader;
        onStep = stepped;
        return {
          start: () => {
            ticking = true;
          },
          stop: () => {
            ticking = false;
          },
          running: () => ticking,
        };
      },
    },
    mutes,
    running: () => ticking,
    heard: () => read?.(),
    step: (step, at) => {
      onStep?.(step, at);
    },
    setTime: (seconds) => {
      time = seconds;
    },
  };
}

// Lets a test say when the library is on screen.
class FakeObserver implements IntersectionObserver {
  static latest: FakeObserver | undefined;
  readonly root = null;
  readonly rootMargin = "";
  readonly scrollMargin = "";
  readonly thresholds: readonly number[] = [];
  private readonly callback: IntersectionObserverCallback;
  private target: Element | undefined;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    FakeObserver.latest = this;
  }

  observe(target: Element): void {
    this.target = target;
  }

  unobserve(): void {
    this.target = undefined;
  }

  disconnect(): void {
    this.target = undefined;
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  show(visible: boolean): void {
    if (this.target === undefined) return;
    this.callback(
      [
        {
          isIntersecting: visible,
          intersectionRatio: visible ? 1 : 0,
          boundingClientRect: new DOMRect(),
          intersectionRect: new DOMRect(),
          rootBounds: null,
          target: this.target,
          time: 0,
        },
      ],
      this,
    );
  }
}

function setup(): ReturnType<typeof fakeAudio> {
  const fake = fakeAudio();
  render(
    <MantineProvider theme={theme}>
      <Library audio={fake.audio} />
    </MantineProvider>,
  );
  return fake;
}

function rows(): HTMLElement[] {
  return screen.queryAllByRole("option");
}

// A row's name, without the selected row's asterisk or the tags.
function rowName(row: HTMLElement): string {
  return row.children[1]?.textContent.replace("*", "") ?? "";
}

function selectedName(): string {
  return rowName(screen.getByRole("option", { selected: true }));
}

beforeEach(() => {
  vi.stubGlobal("IntersectionObserver", FakeObserver);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("Library", () => {
  it("starts silent, with the first sound selected", () => {
    const fake = setup();
    expect(fake.running()).toBe(false);
    expect(
      screen.getByRole("button", { name: m.library_sound_off() }),
    ).toBeInTheDocument();
    expect(rows()).toHaveLength(8);
    expect(selectedName()).toBe("Diva Lead");
    expect(screen.getByText(/Not a real Diva patch/u)).toBeInTheDocument();
  });

  it("plays a row when it is clicked", async () => {
    const fake = setup();
    await userEvent.click(screen.getByText("Omnisphere Pad"));
    expect(fake.running()).toBe(true);
    expect(fake.mutes.at(-1)?.[0]).toBe(false);
    expect(fake.heard()?.sound).toBe("omnisphere-pad");
    expect(
      screen.getByRole("button", { name: m.library_sound_on() }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Not a real Omnisphere patch/u),
    ).toBeInTheDocument();
  });

  it("moves through the list with the arrow keys", async () => {
    const fake = setup();
    await userEvent.click(screen.getByRole("listbox"));
    await userEvent.keyboard("{ArrowDown}{ArrowDown}");
    expect(selectedName()).toBe("Serum 2 Bass");
    await userEvent.keyboard("{End}");
    expect(selectedName()).toBe("Kontakt Keys");
    await userEvent.keyboard("{ArrowDown}");
    expect(selectedName()).toBe("Kontakt Keys");
    await userEvent.keyboard("{Home}");
    expect(selectedName()).toBe("Diva Lead");
    await userEvent.keyboard(" ");
    expect(fake.running()).toBe(true);
    expect(fake.heard()?.sound).toBe("diva-lead");
    await userEvent.keyboard("{ArrowDown}");
    expect(fake.heard()?.sound).toBe("omnisphere-pad");
  });

  it("filters by kind and character, keeping a shown sound selected", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: "Bass" }));
    expect(rows().map(rowName)).toEqual(["Serum 2 Bass", "Massive X Bass"]);
    expect(selectedName()).toBe("Serum 2 Bass");
    await userEvent.click(screen.getByRole("button", { name: "Warm" }));
    expect(rows()).toHaveLength(0);
    expect(screen.getByText(m.library_empty())).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Bass" }));
    await userEvent.click(screen.getByRole("button", { name: "Warm" }));
    expect(rows()).toHaveLength(8);
  });

  it("mutes without stopping the clip", async () => {
    const fake = setup();
    await userEvent.click(screen.getByText("Serum Lead"));
    await userEvent.click(
      screen.getByRole("button", { name: m.library_sound_on() }),
    );
    expect(fake.mutes.at(-1)?.[0]).toBe(true);
    expect(fake.running()).toBe(true);
  });

  it("keeps the clip folded until its thumbnail is clicked", async () => {
    const fake = setup();
    expect(screen.queryAllByRole("gridcell")).toHaveLength(0);
    await userEvent.click(
      screen.getByRole("button", { name: m.library_clip_edit() }),
    );
    const cells = screen.getAllByRole("gridcell");
    expect(cells).toHaveLength(112);
    const lit = cells.filter(
      (cell) => cell.getAttribute("aria-pressed") === "true",
    );
    expect(lit).toHaveLength(15);
    await userEvent.click(screen.getByText("Diva Lead"));
    const [corner] = cells;
    if (corner === undefined) throw new Error("no cells");
    await userEvent.click(corner);
    expect(fake.heard()?.pattern[0]?.[0]).toBe(false);
    await userEvent.click(
      screen.getByRole("button", { name: m.library_clip_clear() }),
    );
    expect(fake.heard()?.pattern.flat().some(Boolean)).toBe(false);
  });

  it("lights the column the audio has reached", () => {
    // Synchronous clicks: user-event's own waiting stalls on fake timers.
    vi.useFakeTimers();
    const fake = setup();
    fireEvent.click(
      screen.getByRole("button", { name: m.library_clip_edit() }),
    );
    fireEvent.click(screen.getByText("Diva Lead"));
    fake.step(5, 1);
    act(() => {
      vi.advanceTimersByTime(50);
    });
    const grid = screen.getByRole("grid");
    expect(grid.querySelectorAll("[data-now]")).toHaveLength(0);
    fake.setTime(1);
    act(() => {
      vi.advanceTimersByTime(50);
    });
    const row = within(grid).getAllByRole("row")[0];
    expect(row?.children[5]).toHaveAttribute("data-now");
  });

  it("fades out and stops a while after leaving the screen", () => {
    // Synchronous clicks: user-event's own waiting stalls on fake timers.
    vi.useFakeTimers();
    const fake = setup();
    fireEvent.click(screen.getByText("Pigments Pad"));
    const observer = FakeObserver.latest;
    if (observer === undefined) throw new Error("not observed");

    act(() => {
      observer.show(false);
      vi.advanceTimersByTime(2000);
      observer.show(true);
      vi.advanceTimersByTime(5000);
    });
    expect(fake.running()).toBe(true);

    act(() => {
      observer.show(false);
      vi.advanceTimersByTime(3000);
    });
    expect(fake.mutes.at(-1)).toEqual([true, 1.5]);
    expect(fake.running()).toBe(true);
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(fake.running()).toBe(false);
    expect(
      screen.getByRole("button", { name: m.library_sound_off() }),
    ).toBeInTheDocument();
  });
});
