// A 5×7 dot-matrix typeface: the grid the mark is drawn on, extended to
// the rest of the alphabet. Each glyph is seven rows of five cells, top to
// bottom, "X" lit and "." dark. The readout in components/Readout.tsx is
// the only thing that sets type in it.

export const glyphColumns = 5;
export const glyphRows = 7;

const blank: readonly string[] = [
  ".....",
  ".....",
  ".....",
  ".....",
  ".....",
  ".....",
  ".....",
];

const glyphs: Readonly<Record<string, readonly string[]>> = {
  " ": blank,
  A: [".XXX.", "X...X", "X...X", "XXXXX", "X...X", "X...X", "X...X"],
  B: ["XXXX.", "X...X", "X...X", "XXXX.", "X...X", "X...X", "XXXX."],
  C: [".XXX.", "X...X", "X....", "X....", "X....", "X...X", ".XXX."],
  D: ["XXXX.", "X...X", "X...X", "X...X", "X...X", "X...X", "XXXX."],
  E: ["XXXXX", "X....", "X....", "XXXX.", "X....", "X....", "XXXXX"],
  F: ["XXXXX", "X....", "X....", "XXXX.", "X....", "X....", "X...."],
  G: [".XXX.", "X...X", "X....", "X.XXX", "X...X", "X...X", ".XXXX"],
  H: ["X...X", "X...X", "X...X", "XXXXX", "X...X", "X...X", "X...X"],
  I: [".XXX.", "..X..", "..X..", "..X..", "..X..", "..X..", ".XXX."],
  J: ["..XXX", "...X.", "...X.", "...X.", "...X.", "X..X.", ".XX.."],
  K: ["X...X", "X..X.", "X.X..", "XX...", "X.X..", "X..X.", "X...X"],
  L: ["X....", "X....", "X....", "X....", "X....", "X....", "XXXXX"],
  M: ["X...X", "XX.XX", "X.X.X", "X.X.X", "X...X", "X...X", "X...X"],
  N: ["X...X", "X...X", "XX..X", "X.X.X", "X..XX", "X...X", "X...X"],
  O: [".XXX.", "X...X", "X...X", "X...X", "X...X", "X...X", ".XXX."],
  // The mark itself.
  P: ["XXXX.", "X...X", "X...X", "XXXX.", "X....", "X....", "X...."],
  Q: [".XXX.", "X...X", "X...X", "X...X", "X.X.X", "X..X.", ".XX.X"],
  R: ["XXXX.", "X...X", "X...X", "XXXX.", "X.X..", "X..X.", "X...X"],
  S: [".XXXX", "X....", "X....", ".XXX.", "....X", "....X", "XXXX."],
  T: ["XXXXX", "..X..", "..X..", "..X..", "..X..", "..X..", "..X.."],
  U: ["X...X", "X...X", "X...X", "X...X", "X...X", "X...X", ".XXX."],
  V: ["X...X", "X...X", "X...X", "X...X", "X...X", ".X.X.", "..X.."],
  W: ["X...X", "X...X", "X...X", "X.X.X", "X.X.X", "X.X.X", ".X.X."],
  X: ["X...X", "X...X", ".X.X.", "..X..", ".X.X.", "X...X", "X...X"],
  Y: ["X...X", "X...X", "X...X", ".X.X.", "..X..", "..X..", "..X.."],
  Z: ["XXXXX", "....X", "...X.", "..X..", ".X...", "X....", "XXXXX"],
  "0": [".XXX.", "X...X", "X..XX", "X.X.X", "XX..X", "X...X", ".XXX."],
  "1": ["..X..", ".XX..", "..X..", "..X..", "..X..", "..X..", ".XXX."],
  "2": [".XXX.", "X...X", "....X", "...X.", "..X..", ".X...", "XXXXX"],
  "3": ["XXXXX", "...X.", "..X..", "...X.", "....X", "X...X", ".XXX."],
  "4": ["...X.", "..XX.", ".X.X.", "X..X.", "XXXXX", "...X.", "...X."],
  "5": ["XXXXX", "X....", "XXXX.", "....X", "....X", "X...X", ".XXX."],
  "6": ["..XX.", ".X...", "X....", "XXXX.", "X...X", "X...X", ".XXX."],
  "7": ["XXXXX", "....X", "...X.", "..X..", ".X...", ".X...", ".X..."],
  "8": [".XXX.", "X...X", "X...X", ".XXX.", "X...X", "X...X", ".XXX."],
  "9": [".XXX.", "X...X", "X...X", ".XXXX", "....X", "...X.", ".XX.."],
  ".": [".....", ".....", ".....", ".....", ".....", ".XX..", ".XX.."],
  ",": [".....", ".....", ".....", ".....", ".XX..", "..X..", ".X..."],
  ":": [".....", ".XX..", ".XX..", ".....", ".XX..", ".XX..", "....."],
  "'": [".XX..", "..X..", ".X...", ".....", ".....", ".....", "....."],
  "-": [".....", ".....", ".....", "XXXXX", ".....", ".....", "....."],
  "+": [".....", "..X..", "..X..", "XXXXX", "..X..", "..X..", "....."],
  "/": [".....", "....X", "...X.", "..X..", ".X...", "X....", "....."],
  "&": [".XX..", "X..X.", "X..X.", ".XX..", "X.X.X", "X..X.", ".XX.X"],
  "·": [".....", ".....", ".....", ".XX..", ".XX..", ".....", "....."],
  // Play.
  "▶": ["X....", "XX...", "XXX..", "XXXX.", "XXX..", "XX...", "X...."],
};

// The rows of one character. Lowercase letters map to their capitals and
// anything the face lacks renders blank, so a typo never throws.
export function glyph(char: string): readonly string[] {
  return glyphs[char.toUpperCase()] ?? blank;
}

// Whether the cell at (column, row) of a character is lit.
export function lit(char: string, column: number, row: number): boolean {
  return glyph(char)[row]?.[column] === "X";
}
