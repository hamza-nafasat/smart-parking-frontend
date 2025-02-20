import { createSlice } from "@reduxjs/toolkit";

const sensorSlice = createSlice({
  name: "sensor",
  initialState: { allSensors: [], availableSensors: [] },
  reducers: {
    addAllSensors: (state, action) => {
      state.allSensors = action.payload;
    },
    addAvailableSensors: (state, action) => {
      state.availableSensors = action.payload;
    },
    removeFromAvailableSensors: (state, action) => {
      state.availableSensors = state.availableSensors.filter((sensor) => sensor._id !== action.payload);
    },
    addInAvailableSensors: (state, action) => {
      if (state.availableSensors.find((sensor) => sensor._id == action.payload)) return;
      else state.availableSensors.push(state.allSensors.find((sensor) => sensor._id == action.payload));
    },
  },
});

export const { addAllSensors, addAvailableSensors, removeFromAvailableSensors, addInAvailableSensors } =
  sensorSlice.actions;
export default sensorSlice;
