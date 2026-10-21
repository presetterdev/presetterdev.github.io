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
import {
  type ChangeEvent,
  type FormEvent,
  type ReactElement,
  useEffect,
  useState,
} from "react";

import { beta } from "../content";
import { site } from "../seo";
import { Section } from "./Section";

type Status = "idle" | "checking" | "ready" | "wrong" | "failed";

const { download } = beta;

function fromBase64(text: string): Uint8Array<ArrayBuffer> {
  const binary = atob(text);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// The same derivation scripts/beta-password.ts used to seal the check
// token.
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

// The password is right when it opens the small sealed token; nothing else
// is encrypted. The build is a public GitHub release, so the gate keeps the
// link out of the open rather than the build itself.
async function checkPassword(password: string): Promise<boolean> {
  const key = await deriveKey(password);
  try {
    await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: fromBase64(download.check.iv) },
      key,
      fromBase64(download.check.data),
    );
    return true;
  } catch {
    return false;
  }
}

function megabytes(bytes: number): string {
  return `${(bytes / 1_000_000).toFixed(1)} MB`;
}

export function BetaDownload(): ReactElement {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    document.title = `${beta.title} — ${site.name}`;
  }, []);

  const busy = status === "checking";

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (busy || password === "") return;
    setStatus("checking");
    checkPassword(password)
      .then((ok) => {
        if (!ok) {
          setStatus("wrong");
          return;
        }
        setStatus("ready");
        // GitHub serves the asset as an attachment, so following the link
        // starts the download without leaving the page.
        const anchor = document.createElement("a");
        anchor.href = download.url;
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
          {beta.title}
        </Title>
        <Text size="lg" lh={1.55}>
          {beta.lede}
        </Text>

        {status === "ready" ? (
          <Stack gap="sm" mt="sm">
            <Title order={3}>{beta.ready.title}</Title>
            <Text c="dimmed">{beta.ready.body}</Text>
            <Group gap="md" align="center">
              <Button component="a" href={download.url}>
                {beta.ready.button}
              </Button>
              <Text size="sm" c="dimmed">
                {download.name} · {megabytes(download.size)} · v
                {download.version}
              </Text>
            </Group>
            <Text size="xs" c="dimmed" ff="monospace">
              SHA-256 {download.sha256}
            </Text>
          </Stack>
        ) : (
          <form onSubmit={onSubmit}>
            <Stack gap="sm" mt="sm">
              <PasswordInput
                label={beta.passwordLabel}
                value={password}
                onChange={onChange}
                autoComplete="off"
                disabled={busy}
                maw={360}
              />
              <Group gap="md" align="center">
                <Button type="submit" loading={busy} disabled={password === ""}>
                  {beta.unlock}
                </Button>
                {busy ? (
                  <Text size="sm" c="dimmed">
                    {beta.states[status]}
                  </Text>
                ) : undefined}
              </Group>
              {status === "wrong" || status === "failed" ? (
                <Alert color="red" variant="light" maw={480}>
                  {beta.states[status]}
                </Alert>
              ) : undefined}
            </Stack>
          </form>
        )}

        <Title order={3} mt="xl">
          {beta.stepsTitle}
        </Title>
        <List type="ordered" spacing="xs">
          {beta.steps.map((step) => (
            <List.Item key={step}>
              <Text lh={1.55}>{step}</Text>
            </List.Item>
          ))}
        </List>
        <Text lh={1.55}>
          {beta.afterSteps}{" "}
          <Anchor href={beta.howToHref}>{beta.howToLabel}</Anchor>
        </Text>
        <Text size="sm" c="dimmed" mt="md">
          {beta.agreement}{" "}
          <Anchor href={beta.agreementHref} c="dimmed" underline="always">
            {beta.agreementLabel}
          </Anchor>
        </Text>
      </Stack>
    </Section>
  );
}
