import { Box, Container, Text } from "@mantine/core";
import type { ReactElement } from "react";

import { contact, footer } from "../content";
import { openEvent } from "./PocketSynth";
import classes from "./SiteFooter.module.css";
import { Wordmark } from "./Wordmark";

export function SiteFooter(): ReactElement {
  return (
    <Box component="footer" className={classes["footer"]}>
      <Container size={1080}>
        <div className={classes["top"]}>
          <Wordmark />
          <nav className={classes["links"]} aria-label="Footer">
            {footer.links.map((link) => (
              <a key={link.href} href={link.href} className={classes["link"]}>
                {link.label}
              </a>
            ))}
            <a href={contact.href} className={classes["link"]}>
              {contact.email}
            </a>
          </nav>
        </div>
        <div className={classes["bottom"]}>
          <Text size="sm" c="dimmed">
            {footer.copyright}
          </Text>
          <Text size="xs" c="dimmed" maw={640} mt={6} lh={1.5}>
            {footer.disclaimer}
          </Text>
          <button
            type="button"
            className={classes["hint"]}
            onClick={() => {
              window.dispatchEvent(new Event(openEvent));
            }}
          >
            {footer.hint}
          </button>
        </div>
      </Container>
    </Box>
  );
}
