import { configureStore } from "@reduxjs/toolkit";
import authApis from "./apis/authApis";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    // apis
    [authApis.reducerPath]: [authApis.reducer],
    // slices
    [authSlice.name]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(authApis.middleware);
  },
});

export default store;
