// Sets the preview login's password: asks for it twice without echoing it,
// then writes its hashes into functions/_middleware.ts. Neither hash reveals
// the password, so the change is safe to commit.
//
// SHA-256 is fast to guess against, so use a long generated password.

import { readFile, writeFile } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { Writable } from "node:stream";

import { sessionFor, sha256 } from "../functions/_session.ts";

const file = new URL("../functions/_middleware.ts", import.meta.url);
const lines =
  /const passwordSha256 =\s*"[0-9a-f]*";\nconst sessionSha256 =\s*"[0-9a-f]*";\n/;

// Readline echoes what is typed to its output; this one shows the prompt
// and swallows the rest.
let muted = false;
const output = new Writable({
  write(chunk: Buffer | string, _encoding, callback): void {
    if (!muted) process.stdout.write(chunk);
    callback();
  },
});

async function ask(prompt: string): Promise<string> {
  const reader = createInterface({
    input: process.stdin,
    output,
    terminal: true,
  });
  muted = false;
  const answer = reader.question(prompt);
  muted = true;
  const value = await answer;
  reader.close();
  process.stdout.write("\n");
  return value;
}

const password = await ask("Password: ");
if (password.length < 16) {
  process.stderr.write("Use a password of at least 16 characters.\n");
  process.exit(1);
}
if ((await ask("Again: ")) !== password) {
  process.stderr.write("Those didn't match.\n");
  process.exit(1);
}

const source = await readFile(file, "utf8");
if (!lines.test(source)) {
  process.stderr.write("Couldn't find the hash lines in the middleware.\n");
  process.exit(1);
}
const passwordHash = await sha256(password);
const sessionHash = await sha256(await sessionFor(password));
await writeFile(
  file,
  source.replace(
    lines,
    // Laid out the way Prettier formats them.
    `const passwordSha256 =\n  "${passwordHash}";\n` +
      `const sessionSha256 =\n  "${sessionHash}";\n`,
  ),
);
process.stdout.write("Updated functions/_middleware.ts. Commit it.\n");
