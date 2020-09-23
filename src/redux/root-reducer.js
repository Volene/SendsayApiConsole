import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import queryHistorySlice from "./features/queryHistorySlice";
import querySlice from "./features/querySlice"


const appReducer = combineReducers({
  authSlice,
  queryHistorySlice,
  querySlice
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
