import React from "react";
import LogoutIcon from "../img/log-out.svg";

export const Logout = (props) => {
  const { logout} = props;

  return (
    <div
      tabIndex={0}
      onClick={logout}
      className="header__logout-button logout-button"
    >
      <div className="logout-button__label">Выйти</div>
      <img
        src={LogoutIcon}
        alt="logout-button"
        className="logout-button__icon"
      />
    </div>
  );
};
