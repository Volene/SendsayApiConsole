import { sendRequest } from "../../api/sendsay-api";
import { serialize } from "../../utils";
import { createSlice } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
  whitelist:['queries']
};

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
          .replace(/[^\w.]/g, "") ?? "";

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
        if (state.queries > 15) state.queries.pop();
      }
    },
    removeQuery: (state, queryId) => {
      const idx = state.queries.findIndex((query) => query.id === queryId);
      state.queries.splice(idx, 1);
    },
    removeQueries: (state) => {
      if (state.queries.length) state.queries = [];
    },
  },
});


const persistedReducer = persistReducer(persistConfig, queriesHistorySlice.reducer);

// export default queriesHistorySlice.reducer;

export default persistedReducer
export const {
  requestStart,
  requestFailed,
  requestSuccess,
  getQuiresFromLocalStorage,
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
