import type { ReactElement } from "react";

import { glyphColumns, glyphRows, lit } from "../dotFont";

interface DotTextProps {
  // One entry per line. Every line shares one dot pitch.
  lines: readonly string[];
  // Dot pitch in pixels at full size; the drawing shrinks to fit narrower
  // containers but never grows past it.
  pitch: number;
  // Show the unlit dots of each character cell, like a display.
  unlit?: boolean;
  className?: string;
}

// Characters sit on a 6-wide cell (5 dots and a gap); lines on a 9-high one.
const cellWidth = glyphColumns + 1;
const lineHeight = glyphRows + 2;
const radius = 0.4;

// Text set in the mark's dot face, as one SVG in the current text colour.
// It is decoration: put the same words in the document as real text next to
// it, since this hides itself from assistive technology.
export function DotText({
  lines,
  pitch,
  unlit = false,
  className,
}: DotTextProps): ReactElement {
  const widest = Math.max(...lines.map((line) => line.length));
  const columns = widest * cellWidth - 1;
  const rows = lines.length * lineHeight - 2;
  const dots: ReactElement[] = [];
  lines.forEach((line, index) => {
    const top = index * lineHeight;
    // The unlit grid covers the line's own cells, not the widest line's.
    const span = line.length * cellWidth - 1;
    for (let row = 0; row < glyphRows; row += 1) {
      for (let column = 0; column < span; column += 1) {
        const char = line[Math.floor(column / cellWidth)] ?? " ";
        const on =
          column % cellWidth < glyphColumns &&
          lit(char, column % cellWidth, row);
        if (!on && !unlit) continue;
        dots.push(
          <circle
            key={`${String(index)}:${String(column)}:${String(row)}`}
            cx={column + 0.5}
            cy={top + row + 0.5}
            r={radius}
            opacity={on ? 1 : 0.16}
          />,
        );
      }
    }
  });
  return (
    <svg
      className={className}
      viewBox={`0 0 ${String(columns)} ${String(rows)}`}
      width={columns * pitch}
      style={{ maxWidth: "100%", height: "auto", display: "block" }}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {dots}
    </svg>
  );
}
