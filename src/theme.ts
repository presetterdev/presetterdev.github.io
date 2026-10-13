import {
  Button,
  type MantineColorsTuple,
  Title,
  createTheme,
  rem,
} from "@mantine/core";

const fontFamily =
  "'Instrument Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', " +
  "sans-serif";

// The brand blue is the app icon's: #7dd3fc at index 4, the primary shade.
// Text on it is dark (autoContrast). The site has one colour scheme, so the
// shade is one number: Mantine decides the text colour from the light-mode
// shade, and a separate darker light shade would turn the text white.
const brand: MantineColorsTuple = [
  "#e6f6fe",
  "#cdeefd",
  "#aee3fb",
  "#93daf9",
  "#7dd3fc",
  "#5cc4f2",
  "#3eafe3",
  "#2a94c4",
  "#1f78a0",
  "#175c7c",
];

// Everything visual that is site-wide belongs here rather than in per-component
// styles, so a restyle is one file. Accent and category colours for plain CSS
// are the --pt-* custom properties in index.css, derived from this palette.
export const theme = createTheme({
  colors: { brand },
  primaryColor: "brand",
  primaryShade: 4,
  autoContrast: true,
  luminanceThreshold: 0.5,
  defaultRadius: "md",
  fontFamily,
  headings: {
    fontFamily,
    fontWeight: "600",
    sizes: {
      h1: { fontSize: rem(56), lineHeight: "1.02" },
      h2: { fontSize: rem(38), lineHeight: "1.1" },
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
          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.24)",
        },
      },
    }),
  },
});
