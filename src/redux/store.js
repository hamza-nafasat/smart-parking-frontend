import { configureStore } from "@reduxjs/toolkit";
import authApis from "./apis/authApis";
import authSlice from "./slices/authSlice";
import buildingApis from "./apis/buildingApis";
import buildingSlice from "./slices/buildingSlice";
import floorApis from "./apis/floorApis";
import floorSlice from "./slices/floorSlice";
import sensorApis from "./apis/sensorApis";
import slotApis from "./apis/slotApis";
import sensorSlice from "./slices/sensorSlice";
import bookingApis from "./apis/bookingApis";
import bookingSlice from "./slices/bookingSlice";

const store = configureStore({
  reducer: {
    // apis
    [authApis.reducerPath]: authApis.reducer,
    [buildingApis.reducerPath]: buildingApis.reducer,
    [floorApis.reducerPath]: floorApis.reducer,
    [slotApis.reducerPath]: slotApis.reducer,
    [sensorApis.reducerPath]: sensorApis.reducer,
    [bookingApis.reducerPath]: bookingApis.reducer,
    // slices
    [authSlice.name]: authSlice.reducer,
    [buildingSlice.name]: buildingSlice.reducer,
    [floorSlice.name]: floorSlice.reducer,
    [sensorSlice.name]: sensorSlice.reducer,
    [bookingSlice.name]: bookingSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false })
      .concat(authApis.middleware)
      .concat(buildingApis.middleware)
      .concat(floorApis.middleware)
      .concat(slotApis.middleware)
      .concat(sensorApis.middleware).
      concat(bookingApis.middleware);
  },
});

export default store;
