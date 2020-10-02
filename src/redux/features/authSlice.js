import { createSlice } from "@reduxjs/toolkit";

import { userLogin, renewSession } from "../../api/sendsay-api";

const initialState = {
  login: "",
  subLogin: "",
  logging: false,
  error: "",
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginStart: (state) => {
      state.error = "";
      state.logging = true;
    },

    loginSuccess: (state, { payload: { login, subLoginName } }) => {
      state.logging = false;
      state.loginName = login;
      state.subLoginName = subLoginName;
      state.isAuth = true;
    },
    loginFailed: (state, action) => {
      state.logging = false;
      state.error = action.payload;
    },
    logout: () => initialState,
  },
});

export default authSlice.reducer;
export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logout,
} = authSlice.actions;

export const sendSayAuth = ({
  loginName,
  subLoginName = "",
  password,
}) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const { list } = await userLogin(loginName, subLoginName, password);
    const [sublogin, login] = [list["about.id"], list["about.name"]];

    loginName === subLoginName
      ? dispatch(loginSuccess({ login, subLoginName: null }))
      : dispatch(loginSuccess({ login, subLoginName: sublogin }));

  } catch (err) {
    const { id, explain } = err;
    dispatch(loginFailed({ id: id, explain: explain }));
  }
};

export const renewSessions = () => async (dispatch) => {
  try {
    dispatch(loginStart);
    const { list } = await renewSession();
    const [sublogin, login] = [list["about.id"], list["about.name"]];
    dispatch(loginSuccess({ login, subLoginName: sublogin }));
  } catch (err) {}
};
