import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { logout as logoutAction } from "../redux/features/authSlice";
import { Logout } from "./Logout";
import "./Header.css";
import Logo from "../img/logo.svg";
import { ReactComponent as FsIcon } from "../img/fs.svg";

export const Header = () => {
  const { subLoginName, loginName } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAction());
    Cookies.remove("sendsay_session");
  };
  const isSubloginExist = subLoginName.slice(0, 2) === "x_" ? false : true;
  return (
    <>
      <header className="header">
        <div className="header__logo logo">
          <img src={Logo} alt="logo" className="logo__image" />
          <div className="header__title">API консолька</div>
        </div>

        <div className="header__right-wrapper">
          <div className="header_account account">
            <div className="account__login">{loginName}</div>
            {!isSubloginExist ? null : (
              <>
                <div className="account__border">:</div>
                <div className="account__sublogin">{subLoginName}</div>
              </>
            )}
          </div>
          <Logout tabIndex={1} onLogoutClick={logout}></Logout>
          <div className="header__fullscreen-button fullscreen-button" tabIndex={2}>
            <FsIcon   className="fullscreen-button__icon"src={FsIcon} alt="fullscreen-button__icon" />
          </div>
        </div>
      </header>
    </>
  );
};
