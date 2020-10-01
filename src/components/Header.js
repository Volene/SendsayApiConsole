import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { FullscreenButton } from "./Fullscreen";
import { Logout } from "./Logout";
import "./Header.css";
import { logout as logoutAction } from "../redux/features/authSlice";
import Logo from "../img/logo.svg";

export const Header = (props) => {

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
          <div className="header__account account">
            <div className="account__login">{loginName}</div>
            {!isSubloginExist ? null : (
              <>
                <div className="account__border">:</div>
                <div className="account__sublogin">{subLoginName}</div>
              </>
            )}
          </div>
          <Logout tabIndex={1} logout={logout}></Logout>
          <FullscreenButton fsHandler={props.fullscreenHandler} />
        </div>
      </header>
    </>
  );
};
