const { createSlice } = require("@reduxjs/toolkit");

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    copied: false,
    copiedId: null,
  },
  reducers: {
    setCopied: (state, { payload }) => {
      state.copied = payload;
    },
    setCopiedId: (state, { payload }) => {
      state.copiedId = payload;
    },
  },
});

export default uiSlice.reducer;
export const { setCopied, setCopiedId } = uiSlice.actions;
