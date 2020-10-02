const { createSlice } = require("@reduxjs/toolkit");

const initialState = { query: null };

export const querySlice = createSlice({
  name: "query",
  initialState: initialState,
  reducers: {
    setQuery: (state, {payload}) => {
      state.query = payload;
    },
  },
});

export default querySlice.reducer;
export const { setQuery } = querySlice.actions;
