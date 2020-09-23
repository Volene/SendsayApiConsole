import { sendRequest } from "../../api/sendsay-api";
import { serialize } from "../../utils";
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  queries: [],
  loading: false,
  currentRequest: { query: "", response: "", error: false },
  query: null,
};

export const queriesHistorySlice = createSlice({
  name: "queriesHistory",
  initialState: initialState,
  reducers: {
    requestStart: (state) => {
      state.loading = true;
    },
    requestFailed: (state) => {
      state.loading = false;
      state.currentRequest.error = true;
    },
    requestSuccess: (state) => {
      state.loading = false;
      state.currentRequest.error = false;
    },
    request: (state, { payload }) => {
      state.query = payload;
    },
    addQuery: (state, { payload }) => {
      const actionType =
        payload.query
          .match(/"action": "[a-z.]+"/g)[0]
          .split(":")[1]
          .replace(/\W/g, "") ?? "";

      const id = new Date().toISOString();
      const queryObject = {
        id: id,
        type: actionType,
        query: payload.query,
        res: payload.response,
        error: payload.error,
        dropdownMenuOpened: false,
      };

      state.currentRequest = {
        query: payload.query,
        response: payload.response,
      };

      const isQueryUnique = state.queries.some(
        ({ query }) => query === payload.query
      );

      if (!isQueryUnique) {
        state.queries.unshift(queryObject);
      } else {
        const idx = state.queries.findIndex(
          (query) => query.query === payload.query
        );
        state.queries.splice(idx, 1);
        state.queries.unshift(queryObject);
      }
    },
    removeQuery: (state, queryId) => {
      console.log(queryId);
      const idx = state.queries.findIndex((query) => query.id === queryId);
      state.queries.splice(idx, 1);
    },
    removeQueries: (state) => {
      state.queries = [];
    },
  },
});

export default queriesHistorySlice.reducer;
export const {
  requestStart,
  requestFailed,
  requestSuccess,
  request,
  removeQuery,
  addQuery,
  removeQueries,
} = queriesHistorySlice.actions;

export const getQueryResponse = (query) => async (dispatch) => {
  const serializedQuery = serialize(query);
  try {
    dispatch(requestStart());
    const res = await sendRequest(query);
    const serializedResponse = serialize(res);
    dispatch(
      addQuery({
        query: serializedQuery,
        response: serializedResponse,
      })
    );
    dispatch(requestSuccess());
    return res;
  } catch (error) {
    const serializedError = serialize(error);
    dispatch(
      addQuery({
        query: serializedQuery,
        response: serializedError,
        error: true,
      })
    );
    dispatch(requestFailed(error));
  }
};
