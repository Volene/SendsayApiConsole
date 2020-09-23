import React from "react";
import { useSelector } from "react-redux";
import LoginForm from "./components/LoginForm";
import { HistoryTrack } from "./components/HistoryTrack";
import { Forms } from "./components/Forms";
import "./App.css";
import { Header } from "./components/Header";

function App() {
  const isAuth = useSelector((state) => state.authSlice.isAuth);
  return (
    <div className="page__body">
      {!isAuth ? (
        <LoginForm />
      ) : (
        <>
          {" "}
        
          <div className="header-container">
            <Header></Header>
            <HistoryTrack></HistoryTrack>
          </div>
          <Forms></Forms>{" "}
        </>
      )}
    </div>
  );
}

export default App;
