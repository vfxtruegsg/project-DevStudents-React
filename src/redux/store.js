import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice.js";
import userReducer from "./user/slice.js";
import transactionsReducer from "./transactions/slice.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import modalReducer from "./modal/slice.js";

const persistConfig = {
  key: "auth-data",
  version: 1,
  storage,
};

const persistConfigUser = {
  key: "user-data",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);
const persistedUserReducer = persistReducer(persistConfigUser, userReducer);
export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    user: persistedUserReducer,
    transactions: transactionsReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
