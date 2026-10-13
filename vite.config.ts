import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  // The repository is an organization site, so Pages serves it at the root.
  base: "/",
  build: {
    // Pages are prerendered, so their styles have to arrive with the HTML.
    // With CSS split per route chunk, a component's styles only load once
    // its JavaScript runs, and the first paint is unstyled markup that then
    // jumps into place.
    cssCodeSplit: false,
  },
  plugins: [
    // Must precede the react plugin: it rewrites route files before they are
    // compiled.
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
  ],
});
