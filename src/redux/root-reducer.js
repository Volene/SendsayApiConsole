import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import queryHistorySlice from "./features/queryHistorySlice";
import querySlice from "./features/querySlice";
import uiSlice from "./features/ui";

const appReducer = combineReducers({
  authSlice,
  queryHistorySlice,
  querySlice,
  uiSlice,
});

export const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return appReducer(state, action);
};
