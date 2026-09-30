import type { ReactElement, ReactNode } from "react";

import classes from "./DefinitionRows.module.css";

export interface DefinitionItem {
  term: string;
  body: ReactNode;
}

interface DefinitionRowsProps {
  items: readonly DefinitionItem[];
}

export function DefinitionRows({ items }: DefinitionRowsProps): ReactElement {
  return (
    <dl className={classes["list"]}>
      {items.map((item) => (
        <div key={item.term} className={classes["row"]}>
          <dt className={classes["term"]}>{item.term}</dt>
          <dd className={classes["body"]}>{item.body}</dd>
        </div>
      ))}
    </dl>
  );
}
