// Seals a beta build for the password-gated download page.
//
//   node scripts/seal-beta.ts <build.dmg> <password>
//
// Writes public/dl/<build>.enc — the DMG encrypted with AES-256-GCM under a
// key derived from the password with PBKDF2 — and prints the object to
// paste in as `betaDownload` in src/content.ts. The repository is public,
// so the file it holds has to be useless without the password; the page
// decrypts it in the browser with the same WebCrypto calls used here.
//
// The password is never written anywhere. Hand it to testers directly.
// Node 24 runs TypeScript directly; Node 22 needs --experimental-strip-types.

import { webcrypto } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

const { subtle } = webcrypto;
const iterations = 600_000;
const outDir = join("public", "dl");

const [input, password] = process.argv.slice(2);
if (input === undefined || password === undefined) {
  console.error("usage: node scripts/seal-beta.ts <build.dmg> <password>");
  process.exit(1);
}

function base64(bytes: ArrayBuffer | Uint8Array<ArrayBuffer>): string {
  return Buffer.from(new Uint8Array(bytes)).toString("base64");
}

function hex(bytes: ArrayBuffer): string {
  return Buffer.from(new Uint8Array(bytes)).toString("hex");
}

const plain = await readFile(input);
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

// A tiny sealed token lets the page reject a wrong password before it
// fetches the whole build.
const checkIv = webcrypto.getRandomValues(new Uint8Array(12));
const check = await subtle.encrypt(
  { name: "AES-GCM", iv: checkIv },
  key,
  new TextEncoder().encode("presetter-beta"),
);

const iv = webcrypto.getRandomValues(new Uint8Array(12));
const sealed = await subtle.encrypt({ name: "AES-GCM", iv }, key, plain);
const sha256 = hex(await subtle.digest("SHA-256", plain));

const name = basename(input);
const outName = `${name.replace(/\.dmg$/i, "")}.enc`;
await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, outName), Buffer.from(sealed));

const download = {
  file: `/dl/${outName}`,
  name,
  size: plain.byteLength,
  sha256,
  iterations,
  salt: base64(salt),
  iv: base64(iv),
  check: { iv: base64(checkIv), data: base64(check) },
};
console.log(`wrote ${join(outDir, outName)} (${sealed.byteLength} bytes)\n`);
console.log(JSON.stringify(download, undefined, 2));
