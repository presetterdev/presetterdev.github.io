import type { ReactElement, ReactNode } from "react";

import classes from "./WindowFrame.module.css";

interface WindowFrameProps {
  title: string;
  children: ReactNode;
}

export function WindowFrame({
  title,
  children,
}: WindowFrameProps): ReactElement {
  return (
    <div className={classes["frame"]}>
      <div className={classes["bar"]} aria-hidden="true">
        <span className={classes["dot"]} />
        <span className={classes["dot"]} />
        <span className={classes["dot"]} />
        <span className={classes["title"]}>{title}</span>
      </div>
      {children}
    </div>
  );
}
