import { createSlice } from "@reduxjs/toolkit";
// import persistReducer from "redux-persist/lib/persistReducer";
// import storage from "redux-persist/lib/storage";

const name = "toast";

const initialState = {
  isOpen: false,
  variant: "default",
  title: "",
  description: "",
};

const toastSlice = createSlice({
  name,
  initialState,
  reducers: {
    addToast: (state, action) => ({
      isOpen: true,
      title: action.payload.title,
      description: action.payload.description,
      variant: action.payload.variant || "default",
    }),
    resetToast: () => initialState,
  },
});

export const { addToast, resetToast } = toastSlice.actions;
export const selectToastState = (state) => state.toast;

export const toastReducer = toastSlice.reducer;

// export const toastReducer = persistReducer(
//   {
//     key: name,
//     storage,
//     whitelist: [],
//   },
//   toastSlice.reducer
// );
