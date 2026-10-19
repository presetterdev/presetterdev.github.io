import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config.ts";

// The app's own Vite config, so tests compile exactly like the site, plus a
// browser-like DOM. Tests sit beside what they test as *.test.tsx.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: ["src/test/setup.ts"],
      include: ["src/**/*.test.{ts,tsx}"],
    },
  }),
);
