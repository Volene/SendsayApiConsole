import React from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const FullscreenContainer = ({ children }) => {
  const handle = useFullScreenHandle();
  return <FullScreen>{children}</FullScreen>;
};

export { FullscreenContainer };
