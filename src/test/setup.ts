// Runs before every test file. jsdom lacks a few browser APIs the site
// touches when it renders; these stand-ins answer the way a desktop
// browser with no media-query matches would.

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

// jsdom has no canvas; a component that draws must cope with no context.
Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  value: () => null,
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
