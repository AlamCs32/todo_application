import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { toastReducer } from "./slices/toastSlice";

const rootReducers = combineReducers({
  auth: authReducer,
  toast: toastReducer,
});

export default rootReducers;
