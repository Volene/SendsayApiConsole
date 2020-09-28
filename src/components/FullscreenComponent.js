import React from "react";
import { ReactComponent as FsIcon } from "../img/fs.svg";
import { ReactComponent as FsIconActive } from "../img/fs_active.svg";

export const FullscreenButton = ({ fsHandler }) => {
  const isFullScreen = fsHandler.active;

  return !isFullScreen ? (
    <div
      onClick={fsHandler.enter}
      className="header__fullscreen-button fullscreen-button"
      tabIndex={2}
    >
      <FsIcon className="fullscreen-button__icon"></FsIcon>
    </div>
  ) : (
    <div
      onClick={fsHandler.exit}
      className="header__fullscreen-button fullscreen-button"
      tabIndex={2}
    >
      <FsIconActive className="fullscreen-button__icon"></FsIconActive>
    </div>
  );
};
