import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import rootReducers from "./rootReducer";
import { userApiAction } from "./apiSlice/userApiSlice";
import { todoApiActions } from "./apiSlice/todoApiSlice";

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([userApiAction.middleware, todoApiActions.middleware]),
});

export const persistor = persistStore(store);
