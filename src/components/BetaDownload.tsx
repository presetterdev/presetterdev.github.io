import {
  Alert,
  Anchor,
  Button,
  Group,
  List,
  PasswordInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { ParaglideMessage } from "@inlang/paraglide-js-react";
import {
  type ChangeEvent,
  type FormEvent,
  type ReactElement,
  type ReactNode,
  useEffect,
  useState,
} from "react";

import { betaDownload as download, betaSteps } from "../content";
import { m } from "../paraglide/messages.js";
import { site } from "../seo";
import { Section } from "./Section";

type Status =
  | "idle"
  | "checking"
  | "fetching"
  | "decrypting"
  | "ready"
  | "wrong"
  | "failed";

function fromBase64(text: string): Uint8Array<ArrayBuffer> {
  const binary = atob(text);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

// The same derivation scripts/seal-beta.mjs used to seal the build.
async function deriveKey(password: string): Promise<CryptoKey> {
  const raw = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: fromBase64(download.salt),
      iterations: download.iterations,
    },
    raw,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  );
}

function decrypt(
  key: CryptoKey,
  iv: string,
  sealed: ArrayBuffer | Uint8Array<ArrayBuffer>,
): Promise<ArrayBuffer> {
  return crypto.subtle.decrypt(
    { name: "AES-GCM", iv: fromBase64(iv) },
    key,
    sealed,
  );
}

// A wrong password fails the small check token, before the build is
// fetched; the build itself is fetched sealed and opened in the browser, so
// the copy the public repository holds is useless on its own.
async function unseal(
  password: string,
  setStatus: (status: Status) => void,
): Promise<string | undefined> {
  const key = await deriveKey(password);
  try {
    await decrypt(key, download.check.iv, fromBase64(download.check.data));
  } catch {
    setStatus("wrong");
    return undefined;
  }
  setStatus("fetching");
  const response = await fetch(download.file);
  if (!response.ok) {
    throw new Error(`${download.file}: ${response.status}`);
  }
  const sealed = await response.arrayBuffer();
  setStatus("decrypting");
  const plain = await decrypt(key, download.iv, sealed);
  const digest = toHex(await crypto.subtle.digest("SHA-256", plain));
  if (digest !== download.sha256) {
    throw new Error("digest mismatch");
  }
  const blob = new Blob([plain], { type: "application/x-apple-diskimage" });
  return URL.createObjectURL(blob);
}

// What the page says while it works, and when it fails.
const said: Record<
  "checking" | "fetching" | "decrypting" | "wrong" | "failed",
  () => string
> = {
  checking: m.beta_status_checking,
  fetching: m.beta_status_fetching,
  decrypting: m.beta_status_decrypting,
  wrong: m.beta_status_wrong,
  failed: m.beta_status_failed,
};

function megabytes(bytes: number): string {
  return `${(bytes / 1_000_000).toFixed(1)} MB`;
}

// Where the messages' link tags render.
const howToMarkup = {
  link: ({ children }: { children?: ReactNode }): ReactElement => (
    <Anchor href="/#how-it-works">{children}</Anchor>
  ),
};
const agreementMarkup = {
  link: ({ children }: { children?: ReactNode }): ReactElement => (
    <Anchor href="/license" c="dimmed" underline="always">
      {children}
    </Anchor>
  ),
};

export function BetaDownload(): ReactElement {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [url, setUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    document.title = `${m.beta_title()} — ${site.name}`;
  }, []);

  // The object URL holds the whole build in memory; release it on leave.
  useEffect(
    () => (): void => {
      if (url !== undefined) URL.revokeObjectURL(url);
    },
    [url],
  );

  const busy =
    status === "checking" || status === "fetching" || status === "decrypting";

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (busy || password === "") return;
    setStatus("checking");
    unseal(password, setStatus)
      .then((result) => {
        if (result === undefined) return;
        setUrl(result);
        setStatus("ready");
        const anchor = document.createElement("a");
        anchor.href = result;
        anchor.download = download.name;
        anchor.click();
      })
      .catch(() => {
        setStatus("failed");
      });
  }

  function onChange(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.currentTarget.value);
    if (status === "wrong" || status === "failed") setStatus("idle");
  }

  return (
    <Section id="beta" tight>
      <Stack gap="md" maw={640}>
        <Title order={1} fz={{ base: 34, md: 44 }}>
          {m.beta_title()}
        </Title>
        <Text size="lg" lh={1.55}>
          {m.beta_lede()}
        </Text>

        {status === "ready" && url !== undefined ? (
          <Stack gap="sm" mt="sm">
            <Title order={3}>{m.beta_ready_title()}</Title>
            <Text c="dimmed">{m.beta_ready_body()}</Text>
            <Group gap="md" align="center">
              <Button
                component="a"
                href={url}
                download={download.name}
                color="ink"
                c="brand.4"
              >
                {m.beta_ready_button()}
              </Button>
              <Text size="sm" c="dimmed">
                {m.beta_ready_file({
                  name: download.name,
                  size: megabytes(download.size),
                  version: download.version,
                })}
              </Text>
            </Group>
            <Text size="xs" c="dimmed" ff="monospace">
              {m.beta_ready_sha({ digest: download.sha256 })}
            </Text>
          </Stack>
        ) : (
          <form onSubmit={onSubmit}>
            <Stack gap="sm" mt="sm">
              <PasswordInput
                label={m.beta_password()}
                value={password}
                onChange={onChange}
                autoComplete="off"
                disabled={busy}
                maw={360}
              />
              <Group gap="md" align="center">
                <Button
                  type="submit"
                  loading={busy}
                  disabled={password === ""}
                  color="ink"
                  c="brand.4"
                >
                  {m.beta_unlock()}
                </Button>
                {busy ? (
                  <Text size="sm" c="dimmed">
                    {said[status]()}
                  </Text>
                ) : undefined}
              </Group>
              {status === "wrong" || status === "failed" ? (
                <Alert color="red" variant="light" maw={480}>
                  {said[status]()}
                </Alert>
              ) : undefined}
            </Stack>
          </form>
        )}

        <Title order={3} mt="xl">
          {m.beta_install_title()}
        </Title>
        <List type="ordered" spacing="xs">
          {betaSteps.map((step) => (
            <List.Item key={step()}>
              <Text lh={1.55}>{step()}</Text>
            </List.Item>
          ))}
        </List>
        <Text lh={1.55}>
          <ParaglideMessage
            message={m.beta_install_after}
            markup={howToMarkup}
          />
        </Text>
        <Text size="sm" c="dimmed" mt="md">
          <ParaglideMessage
            message={m.beta_agreement}
            markup={agreementMarkup}
          />
        </Text>
      </Stack>
    </Section>
  );
}
