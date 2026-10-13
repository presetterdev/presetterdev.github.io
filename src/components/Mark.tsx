import type { ReactElement } from "react";

// The brand mark: a "P" on a 5×7 dot grid, the same one the app icon uses.
// Lit dots take the current text colour; the unlit grid shows faintly in
// the same colour, so one SVG works on dark and light backgrounds.
const lit: ReadonlySet<string> = new Set([
  "0,0",
  "1,0",
  "2,0",
  "3,0",
  "0,1",
  "4,1",
  "0,2",
  "4,2",
  "0,3",
  "1,3",
  "2,3",
  "3,3",
  "0,4",
  "0,5",
  "0,6",
]);

const columns = 5;
const rows = 7;
const pitch = 104;
const radius = 40;

interface MarkProps {
  className: string | undefined;
  // Hide the unlit grid, for tiny sizes where it only adds noise.
  litOnly?: boolean;
}

export function Mark({ className, litOnly = false }: MarkProps): ReactElement {
  const dots: ReactElement[] = [];
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      const on = lit.has(`${x},${y}`);
      if (!on && litOnly) continue;
      dots.push(
        <circle
          key={`${x},${y}`}
          cx={pitch / 2 + x * pitch}
          cy={pitch / 2 + y * pitch}
          r={radius}
          opacity={on ? 1 : 0.14}
        />,
      );
    }
  }
  return (
    <svg
      className={className}
      viewBox={`0 0 ${columns * pitch} ${rows * pitch}`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {dots}
    </svg>
  );
}
