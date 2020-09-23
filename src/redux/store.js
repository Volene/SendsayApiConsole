import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";

import thunk from "redux-thunk";


export const store = configureStore({
  middleware: [thunk],
  reducer: rootReducer,
  devTools: true,
});
