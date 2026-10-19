import { Box, Container, Text } from "@mantine/core";
import type { ReactElement } from "react";

import { contact, footerLinks } from "../content";
import { m } from "../paraglide/messages.js";
import { openEvent } from "./PocketSynth";
import classes from "./SiteFooter.module.css";
import { Wordmark } from "./Wordmark";

export function SiteFooter(): ReactElement {
  return (
    <Box component="footer" className={classes["footer"]}>
      <Container size={1080}>
        <div className={classes["top"]}>
          <Wordmark />
          <nav className={classes["links"]} aria-label={m.footer_nav_label()}>
            {footerLinks.map((link) => (
              <a key={link.href} href={link.href} className={classes["link"]}>
                {link.label()}
              </a>
            ))}
            <a href={contact.href} className={classes["link"]}>
              {contact.email}
            </a>
            <button
              type="button"
              className={classes["link"]}
              onClick={() => {
                window.dispatchEvent(new Event(openEvent));
              }}
            >
              {m.footer_synth()}
            </button>
          </nav>
        </div>
        <div className={classes["bottom"]}>
          <Text size="sm" c="dimmed">
            {m.footer_copyright()}
          </Text>
          <Text size="xs" c="dimmed" maw={640} mt={6} lh={1.5}>
            {m.footer_disclaimer()}
          </Text>
        </div>
      </Container>
    </Box>
  );
}
