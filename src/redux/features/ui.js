const { createSlice } = require("@reduxjs/toolkit");

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    copied: false,
    copiedId:null,
    isFs:false
  },
  reducers: {
    setCopied: (state,{payload}) => {
      state.copied = payload
    },
    setCopiedId:(state,{payload})=>{
      state.copiedId=payload
    }
  },
});
export default uiSlice.reducer;
export const { setCopied,setCopiedId} = uiSlice.actions;
