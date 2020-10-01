import React from "react";
import { ReactComponent as FsIcon } from "../img/fs.svg";
import { ReactComponent as FsIconActive } from "../img/fs_active.svg";

export const FullscreenButton = ({ fsHandler }) => {

  const isFullScreen = fsHandler.active;

  return (
    <div
      onClick={!isFullScreen ? fsHandler.enter : fsHandler.exit}
      className="header__fullscreen-button fullscreen-button"
      tabIndex={2}
    >
      {!isFullScreen ? (
        <FsIcon className="fullscreen-button__icon"/>
      ) : (
        <FsIconActive className="fullscreen-button__icon"/>
      )}
    </div>
  );
};
