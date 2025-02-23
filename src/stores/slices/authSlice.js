import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";

const name = "auth";
const initialState = {
  isAuthorized: false,
  userId: null,
  role: "",
  accessToken: "",
  refreshToken: "",
};

const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    setAuthorization: (state, action) => {
      const { isAuthorized, userId, role, accessToken, refreshToken } =
        action.payload;

      state.isAuthorized = isAuthorized;
      state.userId = userId;
      state.role = role;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    resetAuthorization: () => initialState,
  },
});

export const { resetAuthorization, setAuthorization } = authSlice.actions;
export const selectAuthState = (state) => state.auth;

export const authReducer = persistReducer(
  {
    key: name,
    storage,
    whitelist: [
      "isAuthorized",
      "userId",
      "role",
      "accessToken",
      "refreshToken",
    ],
  },
  authSlice.reducer
);
