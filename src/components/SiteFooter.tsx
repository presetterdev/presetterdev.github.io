import { Box, Container, Text } from "@mantine/core";
import type { ReactElement } from "react";

import { footer, hero } from "../content";
import classes from "./SiteFooter.module.css";
import { Wordmark } from "./Wordmark";

export function SiteFooter(): ReactElement {
  return (
    <Box component="footer" className={classes["footer"]}>
      <Container size={1080}>
        <div className={classes["grid"]}>
          <div>
            <Wordmark />
            <Text size="sm" c="dimmed" mt="md" maw={360}>
              {hero.lede}
            </Text>
          </div>
          {footer.columns.map((column) => (
            <div key={column.heading}>
              <p className={classes["heading"]}>{column.heading}</p>
              <ul className={classes["links"]}>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={classes["link"]}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={classes["bottom"]}>
          <Text size="sm" c="dimmed">
            {footer.copyright}
          </Text>
          <Text size="xs" c="dimmed" maw={640} mt={4}>
            {footer.disclaimer}
          </Text>
        </div>
      </Container>
    </Box>
  );
}
