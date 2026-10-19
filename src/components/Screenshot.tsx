import type { ReactElement } from "react";

import { m } from "../paraglide/messages.js";
import classes from "./Screenshot.module.css";

// The one real image the page wants: Live 12's browser with a pack open.
// Nothing is mocked in its place. Drop the file into src/media/images and
// the figure appears; until then the slot shows only in development.
const images = import.meta.glob<string>(
  "../media/images/live-browser.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" },
);
const [src] = Object.values(images);

export function Screenshot(): ReactElement | undefined {
  if (src === undefined) {
    if (!import.meta.env.DEV) return undefined;
    return (
      <p className={classes["placeholder"]}>{m.how_screenshot_placeholder()}</p>
    );
  }
  return (
    <figure className={classes["figure"]}>
      <img
        src={src}
        alt={m.how_screenshot_alt()}
        loading="lazy"
        className={classes["image"]}
      />
      <figcaption className={classes["caption"]}>
        {m.how_screenshot_caption()}
      </figcaption>
    </figure>
  );
}
