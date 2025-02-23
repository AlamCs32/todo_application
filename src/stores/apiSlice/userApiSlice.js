import { createApi } from "@reduxjs/toolkit/query";
import { apiServiceSlice } from "./apiServiceSlice";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: apiServiceSlice.baseQueryWithInterceptor,
  tagTypes: ["USER"],
  endpoints: (qb) => ({
    signup: qb.mutation({
      query: ({ username, email, password }) => ({
        url: "/signup",
        method: "POST",
        body: { username, email, password },
        invalidatesTags: ["USER"],
      }),
    }),
    login: qb.mutation({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
        invalidatesTags: ["USER"],
      }),
    }),
    changePassword: qb.mutation({
      query: ({ oldPassword, password, confirmPassword }) => ({
        url: `/change-password`,
        method: "PUT",
        body: { oldPassword, password, confirmPassword },
      }),
    }),
    forgetPassword: qb.mutation({
      query: ({ email }) => ({
        url: `/forget-password`,
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: qb.mutation({
      query: ({ token, password, confirmPassword }) => ({
        url: `/reset-password/${token}`,
        method: "POST",
        body: { password, confirmPassword },
      }),
    }),
  }),
});

export const userApiReducer = userApi.reducer;

export const userApiAction = {
  middleware: userApi.middleware,
  reducerPath: userApi.reducerPath,
  signup: userApi.useSignupMutation,
  login: userApi.useLoginMutation,
  changePassword: userApi.useChangePasswordMutation,
  forgetPassword: userApi.useForgetPasswordMutation,
  resetPassword: userApi.useResetPasswordMutation,
};
