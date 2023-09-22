import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sampleSlice from "./sample-slice";
import uiSlice from "./ui-slice";
import userSlice from "./user-slice";
import transHistorySlice from "./transHistory-slice";
import messageSlice from "./message-slice";
//슬라이스 import
import { persistReducer, PERSIST, PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import profileEditSlice from "./profileEdit-slice";

// test code
const reducers = combineReducers({
  sample: sampleSlice.reducer,

  ui: uiSlice.reducer,
  user: userSlice.reducer,
  transHistory: transHistorySlice.reducer,
  message: messageSlice.reducer,
  profileEdit: profileEditSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    //미들웨어 작성시 에러 주의
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, PURGE],
      },
    }),
});

export default store;
