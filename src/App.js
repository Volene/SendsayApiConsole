import React from "react";
import { useSelector } from "react-redux";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
// import {} from "./components"
import LoginForm from "./components/LoginForm";
import { HistoryTrack } from "./components/HistoryTrack";
import { Forms } from "./components/Forms";
import "./App.css";
import { Header } from "./components/Header";

function App() {
  const isAuth = useSelector((state) => state.authSlice.isAuth);
  const handle = useFullScreenHandle();
  return (
    <FullScreen handle={handle}>
      <div className="page__body">
        {!isAuth ? (
          <LoginForm />
        ) : (
          <>
            {" "}
            <div className="header-container">
              <Header fullsreenHandler={handle}></Header>
              <HistoryTrack></HistoryTrack>
            </div>
            <Forms></Forms>{" "}
          </>
        )}
      </div>
    </FullScreen>
  );
}

export default App;
