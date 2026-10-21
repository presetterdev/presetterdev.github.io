// Sets the password for the beta download page.
//
//   node scripts/beta-password.ts <password>
//
// Prints the `salt`, `iterations` and `check` fields to paste into
// `beta.download` in src/content.ts. `check` is a short token sealed with
// AES-256-GCM under a key derived from the password with PBKDF2; the page
// derives the same key with WebCrypto and the password is right when the
// token opens. None of the three reveals the password, so they are safe to
// commit. The build itself is a GitHub release and is not sealed.
//
// The password is never written anywhere. Hand it to testers directly.
// Node 24 runs TypeScript directly; Node 22 needs --experimental-strip-types.

import { webcrypto } from "node:crypto";

const { subtle } = webcrypto;
const iterations = 600_000;

const [password] = process.argv.slice(2);
if (password === undefined) {
  console.error("usage: node scripts/beta-password.ts <password>");
  process.exit(1);
}

function base64(bytes: ArrayBuffer | Uint8Array<ArrayBuffer>): string {
  return Buffer.from(new Uint8Array(bytes)).toString("base64");
}

const salt = webcrypto.getRandomValues(new Uint8Array(16));
const raw = await subtle.importKey(
  "raw",
  new TextEncoder().encode(password),
  "PBKDF2",
  false,
  ["deriveKey"],
);
const key = await subtle.deriveKey(
  { name: "PBKDF2", hash: "SHA-256", salt, iterations },
  raw,
  { name: "AES-GCM", length: 256 },
  false,
  ["encrypt"],
);

const checkIv = webcrypto.getRandomValues(new Uint8Array(12));
const check = await subtle.encrypt(
  { name: "AES-GCM", iv: checkIv },
  key,
  new TextEncoder().encode("presetter-beta"),
);

const fields = {
  iterations,
  salt: base64(salt),
  check: { iv: base64(checkIv), data: base64(check) },
};
console.log(JSON.stringify(fields, undefined, 2));
