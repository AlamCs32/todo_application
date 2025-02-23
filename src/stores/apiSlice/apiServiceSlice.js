import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { addToast } from "../slices/toastSlice";
import { resetAuthorization, selectAuthState } from "../slices/authSlice";
import { localStore } from "../localStore";
import { TOAST_CONFIG } from "@/helpers/constants/commonContants";
import { appConstants } from "@/helpers/constants/appConfig";

const apiServiceSlice = {};

apiServiceSlice.baseQuery = fetchBaseQuery({
  baseUrl: appConstants.apiBaseURL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState();
    const user = selectAuthState(state);
    const token = user?.accessToken || null;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

apiServiceSlice.baseQueryWithRetry = retry(
  apiServiceSlice.baseQueryWithInterceptor,
  { maxRetries: 3 }
);

apiServiceSlice.baseQueryWithInterceptor = async (args, api, extraOptions) => {
  try {
    const result = await apiServiceSlice.baseQuery(args, api, extraOptions);
    let toastMessage = "Oops, Something went wrong. Please try again later";

    if (result.error) {
      if (result.error.status === 401) {
        localStore.resetToken();
        api.dispatch(
          addToast({
            title: TOAST_CONFIG.error.title,
            description: result.error.message || toastMessage,
            variant: TOAST_CONFIG.error.variant,
          })
        );
        api.dispatch(resetAuthorization());
      }

      if (result.error?.data?.message) {
        toastMessage = result.error.data.message;
      }

      api.dispatch(
        addToast({
          title: TOAST_CONFIG.error.title,
          description: toastMessage,
          variant: TOAST_CONFIG.error.variant,
        })
      );
    }

    if (
      ["POST", "PATCH", "PUT", "DELETE"].includes(result.meta.request.method)
    ) {
      api.dispatch(
        addToast({
          title: TOAST_CONFIG.success.title,
          description: result.data.message,
          variant: TOAST_CONFIG.success.variant,
        })
      );
    }
    return result;
  } catch (error) {
    console.log("error", error);
    addToast({
      title: TOAST_CONFIG.error.title,
      description: "Oops, Something went wrong. Please try again later",
      variant: TOAST_CONFIG.error.variant,
    });
    return error;
  }
};

export { apiServiceSlice };
