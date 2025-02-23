import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { toastReducer } from "./slices/toastSlice";
import { userApiAction, userApiReducer } from "./apiSlice/userApiSlice";

const rootReducers = combineReducers({
  auth: authReducer,
  toast: toastReducer,
  [userApiAction.reducerPath]: userApiReducer,
});

export default rootReducers;
