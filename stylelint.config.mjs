// Only one job: keep colours in src/tokens.css. A component that needs a
// colour asks for a --pt-* token, so a palette change is one file and the
// page and the synth's panel each get the right shade without the component
// knowing which surface it sits on. Formatting is Prettier's business.
const config = {
  rules: {
    "color-no-hex": true,
    "color-named": "never",
    "function-disallowed-list": [
      "rgb",
      "rgba",
      "hsl",
      "hsla",
      "hwb",
      "lab",
      "lch",
      "oklab",
      "oklch",
    ],
  },
  overrides: [
    {
      files: ["src/tokens.css"],
      rules: {
        "color-no-hex": null,
        "color-named": null,
        "function-disallowed-list": null,
      },
    },
  ],
};

export default config;
