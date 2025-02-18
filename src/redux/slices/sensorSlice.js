import { createSlice } from "@reduxjs/toolkit";

const sensorSlice = createSlice({
  name: "sensor",
  initialState: { availableSensors: [] },
  reducers: {
    addAvailableSensors: (state, action) => {
      state.availableSensors = action.payload;
    },
    removeFromAvailableSensors: (state, action) => {
      state.availableSensors = state.availableSensors.filter((sensor) => sensor._id !== action.payload);
    },
  },
});

export const { addAvailableSensors, removeFromAvailableSensors } = sensorSlice.actions;
export default sensorSlice;
