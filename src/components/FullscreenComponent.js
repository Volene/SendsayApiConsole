import React from "react";
import { ReactComponent as FsIcon } from "../img/fs.svg";

const FullscreenButton = ({ fsHandler }) => {
  console.log(fsHandler);
  return (
    <div className="header__fullscreen-button fullscreen-button" tabIndex={2}>
      {fsHandler.active ? (
        <FsIcon
          onClick={fsHandler.enter}
          className="fullscreen-button__icon"
          src={FsIcon}
          alt="fullscreen-button__icon"
        />
      ) : (
        <FsIcon
          onClick={fsHandler.exit}
          className="fullscreen-button__icon"
          src={FsIcon}
          alt="fullscreen-button__icon"
        />
      )}
    </div>
  );
};

export { FullscreenButton };
