import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { type Plugin, defineConfig } from "vite";

import { messagesSource, writeMessages } from "./scripts/messages.ts";

// Keeps the JSON Paraglide reads in step with messages/en.yaml. `config`
// runs before any plugin starts building, so the JSON exists by the time
// Paraglide compiles; in dev, saving the YAML rewrites it, and Paraglide
// picks the change up from there.
function messagesFromYaml(): Plugin {
  return {
    name: "messages-from-yaml",
    config(): void {
      writeMessages();
    },
    configureServer(server): void {
      server.watcher.add(messagesSource);
      server.watcher.on("change", (file) => {
        if (!file.endsWith(messagesSource)) return;
        try {
          writeMessages();
        } catch (error) {
          server.config.logger.error(String(error));
        }
      });
    },
  };
}

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
    messagesFromYaml(),
    // Recompiles the messages into src/paraglide as they change, with the same
    // options as the "messages" script that a fresh install and the checks
    // run. One module per message lets an edit hot-swap only the components
    // using it.
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      strategy: ["baseLocale"],
      outputStructure: "message-modules",
      emitTsDeclarations: true,
    }),
  ],
});
