import { Box, Container, Group } from "@mantine/core";
import type { ReactElement } from "react";

import { nav } from "../content";
import { CtaButton } from "./CtaButton";
import classes from "./SiteHeader.module.css";
import { Wordmark } from "./Wordmark";

export function SiteHeader(): ReactElement {
  return (
    <Box component="header" className={classes["header"]}>
      <Container size={1080}>
        <Group justify="space-between" h={64} wrap="nowrap">
          <a href="#top" className={classes["brand"]}>
            <Wordmark />
          </a>
          <Group gap="xl" visibleFrom="sm" component="nav">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className={classes["link"]}>
                {item.label}
              </a>
            ))}
          </Group>
          <CtaButton size="sm" />
        </Group>
      </Container>
    </Box>
  );
}
