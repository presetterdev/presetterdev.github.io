import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  // The repository is an organization site, so Pages serves it at the root.
  base: "/",
  plugins: [
    // Must precede the react plugin: it rewrites route files before they are
    // compiled.
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
  ],
});
