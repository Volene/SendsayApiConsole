import React, { useEffect, useState } from "react";
import Split from "react-split";

export const SplitContainer = ({ children, className }) => {
  const [sizes, setSizes] = useState([50,50]);
  
  useEffect(() => {
    const storageSplitSizes = JSON.parse(
      localStorage.getItem("split-sizes")
    ) || [50,50];
    setSizes(storageSplitSizes);
  },[]);

  return (
    <Split
      className={className}
      sizes={sizes}
      onDragEnd={(sizes) => {
        localStorage.setItem("split-sizes", JSON.stringify(sizes));
      }}
    >
      {children}
    </Split>
  );
};
