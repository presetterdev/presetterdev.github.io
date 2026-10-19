// Turns messages/en.yaml, the file people edit, into the JSON that
// Paraglide's message-format plugin reads.
//
//   node scripts/messages.ts
//
// inlang has no maintained YAML plugin (the one on npm is a third-party
// Rails-format reader at 0.1), so this small step stands in for one. The
// YAML is checked here rather than trusted: every value has to be a string,
// since YAML would happily read a bare `true` or `0.2` as something else.
//
// Groups exist for the people reading the file. The code sees flat names,
// the group path joined with underscores: `hero: { title: ... }` becomes
// `hero_title`, called as m.hero_title(). Nested JSON would compile to
// dotted names instead, which can only be reached as m["hero.title"].
//
// The output sits inside project.inlang, which belongs to the compiler and
// is gitignored; nothing there is edited by hand.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

import { parse } from "yaml";

export const messagesSource = "messages/en.yaml";
const output = "project.inlang/messages/en.json";
const name = /^[a-z][a-z0-9_]*$/;

// Collects every message under `path` into `into`, keyed by its flat name.
// `paths` remembers where each flat name came from, since `a: { b_c }` and
// `a_b: { c }` both flatten to a_b_c.
function flatten(
  value: unknown,
  path: readonly string[],
  into: Record<string, string>,
  paths: Map<string, string>,
): void {
  const where = path.join(".");
  if (typeof value === "string") {
    const flat = path.join("_");
    const earlier = paths.get(flat);
    if (earlier !== undefined) {
      throw new Error(
        `${messagesSource}: ${earlier} and ${where} both become ${flat}; ` +
          "rename one.",
      );
    }
    paths.set(flat, where);
    into[flat] = value;
    return;
  }
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(
      `${messagesSource}: ${where === "" ? "the file" : where} must be ` +
        `text or a group, got ${JSON.stringify(value)}. Put quotes around it.`,
    );
  }
  for (const [key, child] of Object.entries(value)) {
    if (!name.test(key)) {
      throw new Error(
        `${messagesSource}: "${[...path, key].join(".")}" is not a valid ` +
          "name; use lower case, digits and underscores.",
      );
    }
    flatten(child, [...path, key], into, paths);
  }
}

export function writeMessages(): void {
  const parsed: unknown = parse(readFileSync(messagesSource, "utf8"));
  if (typeof parsed === "string") {
    throw new Error(`${messagesSource}: expected groups of messages.`);
  }
  const messages: Record<string, string> = {};
  flatten(parsed, [], messages, new Map());
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(
    output,
    `${JSON.stringify(
      {
        $schema: "https://inlang.com/schema/inlang-message-format",
        ...messages,
      },
      undefined,
      2,
    )}\n`,
  );
}

if (import.meta.main) writeMessages();
