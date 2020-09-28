import React from "react";
import { useSelector } from "react-redux";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import LoginForm from "./components/LoginForm";
import { HistoryTrack } from "./components/HistoryTrack";
import { Forms } from "./components/Forms";
import { Header } from "./components/Header";
import "./App.css";

function App() {
  const isAuth = useSelector((state) => state.authSlice.isAuth);
  const handle = useFullScreenHandle();
  return (
    <div className="page__body">
      {!isAuth ? (
        <LoginForm />
      ) : (
        <>
          <FullScreen handle={handle}>
            <div className="header-container">
              <Header fullscreenHandler={handle}></Header>
              <HistoryTrack></HistoryTrack>
            </div>
            <Forms></Forms>{" "}
          </FullScreen>
        </>
      )}
    </div>
  );
}

export default App;
