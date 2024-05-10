import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

//redux-persist 1 create a root reducer and pass all reducers in it
const rootReducer = combineReducers({ user: userReducer });

//redux-persist 2 create a persistConfig and persisted reducer
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//redux-persist 3 create a store

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

//3 export persistor and wrap app with persistedaGate to use in app
export const persistor = persistStore(store);
