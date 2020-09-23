import React from "react";
import Split from "react-split";

export const SplitContainer = ({ children, className, sizes }) => {
  return (
    <Split className={className} sizes={sizes}>
      {children}
    </Split>
  );
};
// sizes={[50, 50]}
