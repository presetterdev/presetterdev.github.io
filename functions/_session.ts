// Hashing shared by the middleware and scripts/preview-password.ts, which
// must agree byte for byte. Only web APIs, so it runs in Workers and Node.

export async function sha256(text: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text),
  );
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

// The session cookie holds a value derived from the password, never the
// password itself; the middleware keeps only its hash.
export async function sessionFor(password: string): Promise<string> {
  return sha256(`presetter-preview-session\n${password}`);
}
