import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthStore";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const reducers = combineReducers({ auth: AuthReducer });
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const PersistedStore = persistStore(store);
export type RootStore = ReturnType<typeof store.getState>;
export default { store, PersistedStore };
