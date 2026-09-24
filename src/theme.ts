import { Button, Title, createTheme, rem } from "@mantine/core";

const fontFamily =
  "'Instrument Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', " +
  "sans-serif";

// Everything visual that is site-wide belongs here rather than in per-component
// styles, so a restyle is one file.
export const theme = createTheme({
  primaryColor: "violet",
  primaryShade: { light: 6, dark: 5 },
  defaultRadius: "md",
  fontFamily,
  headings: {
    fontFamily,
    fontWeight: "600",
    sizes: {
      h1: { fontSize: rem(56), lineHeight: "1.02" },
      h2: { fontSize: rem(40), lineHeight: "1.1" },
      h3: { fontSize: rem(20), lineHeight: "1.3" },
    },
  },
  components: {
    // Headings in white so they sit a step above body text.
    Title: Title.extend({
      defaultProps: { c: "white" },
      styles: { root: { letterSpacing: "-0.02em" } },
    }),
    Button: Button.extend({
      styles: {
        root: {
          fontWeight: 600,
          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.14)",
        },
      },
    }),
  },
});
