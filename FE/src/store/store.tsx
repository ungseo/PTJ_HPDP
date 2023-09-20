import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sampleSlice from "./sample-slice";
import uiSlice from "./ui-slice";
import userSlice from "./user-slice";
import transHistorySlice from "./transHistory-slice";
//슬라이스 import
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// test code
const reducers = combineReducers({
  sample: sampleSlice.reducer,

  ui: uiSlice.reducer,
  user: userSlice.reducer,
  transHistory: transHistorySlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger]
});

export default store;
