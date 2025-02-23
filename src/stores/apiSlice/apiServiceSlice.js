import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { addToast } from "../slices/toastSlice";
import { resetAuthorization } from "../slices/authSlice";
import { localStore } from "../localStore";
import { TOAST_CONFIG } from "@/helpers/constants/commonContants";
import { appConstants } from "@/helpers/constants/appConfig";

const apiServiceSlice = {};

apiServiceSlice.baseQuery = fetchBaseQuery({
  baseUrl: appConstants.apiBaseURL,
  prepareHeaders: (headers) => {
    const token = localStore.getToken();
    if (token) {
      headers.set("Authorization", `${token}`);
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

    if (result.error) {
      let toastMessage = "Oops, Something went wrong. Please try again later";

      if (result.error.status === 401) {
        api.dispatch(resetAuthorization());

        localStore.resetToken();
        api.dispatch(
          addToast({
            title: TOAST_CONFIG.error.title,
            description: result.error.data.message || toastMessage,
            variant: TOAST_CONFIG.error.variant,
          })
        );
        window.location = "/login";
      }

      if (result.error?.data?.message) {
        toastMessage = result.error.data.message;
      }

      api.dispatch(
        addToast({
          title: TOAST_CONFIG.error.title,
          message: toastMessage,
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
          message: result.data.message,
          variant: TOAST_CONFIG.success.variant,
        })
      );
    }
    return result;
  } catch (error) {
    console.log("error", error);
    addToast({
      title: TOAST_CONFIG.error.title,
      message: "Oops, Something went wrong. Please try again later",
      variant: TOAST_CONFIG.error.variant,
    });
    return error;
  }
};

export { apiServiceSlice };
