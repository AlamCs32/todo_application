import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import rootReducers from "./rootReducer";
import { userApiAction } from "./apiSlice/userApiSlice";

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([userApiAction.middleware]),
});

export const persistor = persistStore(store);
