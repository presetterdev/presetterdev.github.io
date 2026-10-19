// Runs before every test file. jsdom lacks two browser APIs Mantine asks
// for when it renders; these stand-ins answer the way a desktop browser
// with no media-query matches would.

import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

window.matchMedia = (query: string): MediaQueryList => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => undefined,
  removeListener: () => undefined,
  addEventListener: () => undefined,
  removeEventListener: () => undefined,
  dispatchEvent: () => false,
});

window.ResizeObserver = class {
  observe(): void {
    // Sizes never change in jsdom.
  }
  unobserve(): void {
    // Nothing observed.
  }
  disconnect(): void {
    // Nothing observed.
  }
};
