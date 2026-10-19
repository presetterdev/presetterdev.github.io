// Runs in front of every request to a pull request preview on Cloudflare
// Pages; production is on GitHub Pages and never sees this file. Previews are
// public URLs behind one login the team shares.
//
// The login is a plain HTML form rather than HTTP basic auth, so password
// managers recognise and fill it. Only hashes of the password are kept here,
// so nothing secret lives in the repository or in Cloudflare. They come from
// `npm run preview-password`; until they are set, every request is refused.
//
// Typed by hand rather than with @cloudflare/workers-types: this is the only
// file that runs on Workers, and it needs nothing beyond the web platform.

const passwordSha256 = "969f90264fc1d91ee4e8fb22b7140dc8b9fd7814879b4004aba279e2162d1874";
const sessionSha256 = "96d1b2e10e94ae39317dbe28f36599f844f256183fe5a7e863f546d5c3210507";

const loginPath = "/__login";
const cookieName = "preview";
// Thirty days.
const cookieMaxAge = 60 * 60 * 24 * 30;

interface Context {
  request: Request;
  next: () => Promise<Response>;
}

async function sha256(text: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text),
  );
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

// The session cookie holds a value derived from the password, never the
// password itself; only its hash is kept above.
export async function sessionFor(password: string): Promise<string> {
  return sha256(`presetter-preview-session\n${password}`);
}

// Compares two hex digests without stopping at the first difference.
function same(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

function cookie(request: Request, name: string): string | undefined {
  const header = request.headers.get("Cookie") ?? "";
  for (const part of header.split(";")) {
    const [key, ...value] = part.trim().split("=");
    if (key === name) return value.join("=");
  }
  return undefined;
}

// Every preview of the project shares one login: the cookie is set on the
// project's own pages.dev name, which covers pr-<n>.<project>.pages.dev.
function cookieDomain(host: string): string | undefined {
  const labels = host.split(".");
  if (!host.endsWith(".pages.dev") || labels.length < 3) return undefined;
  return labels.slice(-3).join(".");
}

// Only a path on this site, so the login can't be used to redirect elsewhere.
function safeNext(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return "/";
  return value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

function escape(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
}

function loginPage(next: string, failed: boolean): Response {
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Presetter preview</title>
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center;
    background: #7dd3fc; color: #04212e;
    font: 16px/1.5 ui-sans-serif, system-ui, -apple-system, sans-serif; }
  form { display: grid; gap: 12px; width: min(320px, 90vw); }
  h1 { margin: 0 0 8px; font-size: 22px; }
  label { display: grid; gap: 4px; font-size: 14px; font-weight: 600; }
  input { font: inherit; padding: 10px 12px; border: 1px solid #5cb8e0;
    border-radius: 8px; background: #e6f6fe; color: #04212e; }
  button { font: inherit; font-weight: 600; padding: 10px; border: 0;
    border-radius: 999px; background: #04212e; color: #7dd3fc;
    cursor: pointer; }
  p { margin: 0; font-size: 14px; }
</style>
</head>
<body>
<form method="post" action="${loginPath}">
  <h1>Presetter preview</h1>
  ${failed ? "<p>That password didn't work.</p>" : ""}
  <label>Username
    <input name="username" value="presetter" autocomplete="username" readonly>
  </label>
  <label>Password
    <input name="password" type="password" autocomplete="current-password"
      required autofocus>
  </label>
  <input type="hidden" name="next" value="${escape(next)}">
  <button type="submit">Log in</button>
</form>
</body>
</html>`;
  return new Response(html, {
    status: 401,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}

async function logIn(request: Request): Promise<Response> {
  const form = await request.formData();
  const next = safeNext(form.get("next"));
  const password = form.get("password");
  if (
    typeof password !== "string" ||
    !same(await sha256(password), passwordSha256)
  ) {
    return loginPage(next, true);
  }
  const url = new URL(request.url);
  const attributes = [
    `${cookieName}=${await sessionFor(password)}`,
    "Path=/",
    `Max-Age=${String(cookieMaxAge)}`,
    "Secure",
    "HttpOnly",
    "SameSite=Lax",
  ];
  const domain = cookieDomain(url.hostname);
  if (domain !== undefined) attributes.push(`Domain=${domain}`);
  return new Response(undefined, {
    status: 303,
    headers: {
      Location: next,
      "Set-Cookie": attributes.join("; "),
      "Cache-Control": "no-store",
    },
  });
}

export async function onRequest(context: Context): Promise<Response> {
  const { request } = context;
  // A missing hash must not turn into an open preview.
  if (passwordSha256 === "" || sessionSha256 === "") {
    return new Response("Preview login is not configured.", { status: 503 });
  }
  const url = new URL(request.url);
  if (url.pathname === loginPath && request.method === "POST") {
    return logIn(request);
  }
  const session = cookie(request, cookieName);
  if (session === undefined || !same(await sha256(session), sessionSha256)) {
    return loginPage(url.pathname + url.search, false);
  }
  const response = await context.next();
  const marked = new Response(response.body, response);
  // Previews are throwaway copies of the site; keep them out of search.
  marked.headers.set("X-Robots-Tag", "noindex");
  return marked;
}
