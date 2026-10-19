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

// The ink the page is printed in: navy on the brand blue. Index 4 is the
// primary shade like brand's, so a button in "ink" is the navy itself, and
// its hover (index 5) goes one step darker.
const ink: MantineColorsTuple = [
  "#e3f1f7",
  "#9fc3d4",
  "#4f879f",
  "#123f54",
  "#04212e",
  "#031b26",
  "#02161f",
  "#021118",
  "#010c11",
  "#01070a",
];

// Mantine's side of the theme: the two base colours, type, radii. Every other
// colour is a --pt-* custom property in tokens.css, mixed from these two.
export const theme = createTheme({
  colors: { brand, ink },
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
      h2: { fontSize: rem(24), lineHeight: "1.2" },
      h3: { fontSize: rem(20), lineHeight: "1.3" },
    },
  },
  components: {
    // Headings in the ink of whatever surface they sit on: navy on the
    // page, white inside the dark synth panel, which sets no --pt-heading.
    Title: Title.extend({
      defaultProps: { c: "var(--pt-heading, white)" },
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
