import { createSlice } from "@reduxjs/toolkit";

const floorSlice = createSlice({
  name: "floor",
  initialState: { floors: [] },
  reducers: {
    addFloor: (state, action) => {
      state.floors = [...state.floors, action.payload];
    },
    removeFloor: (state, action) => {
      state.floors = state.floors.filter((floor) => floor._id !== action.payload);
    },
    resetFloors: (state) => {
      state.floors = [];
    },
  },
});

export const { addFloor, removeFloor, resetFloors } = floorSlice.actions;
export default floorSlice;
