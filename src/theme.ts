import { createTheme } from "@mantine/core";

// Everything visual that is site-wide belongs here rather than in per-component
// styles, so a restyle is one file.
export const theme = createTheme({
  primaryColor: "violet",
  defaultRadius: "md",
  headings: {
    fontWeight: "600",
  },
});
