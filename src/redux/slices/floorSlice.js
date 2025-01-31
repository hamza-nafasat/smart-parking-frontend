import { createSlice } from "@reduxjs/toolkit";

const floorSlice = createSlice({
  name: "floor",
  initialState: { floors: [] },
  reducers: {
    addFloorsSample: (state, action) => {
      state.floors = Array.from({ length: action.payload }, (_, index) => ({
        floorNumber: index + 1, 
      }));
    },
    addFloor: (state, action) => {
      state.floors = state.floors.map((floor)=>floor.floorNumber == action.payload.floorNumber ? action.payload : floor);
    },
    removeFloor: (state, action) => {
      state.floors = state.floors.filter((floor) => floor.floorNumber == action.payload);
    },
    resetFloors: (state) => {
      state.floors = [];
    },
  },
});

export const { addFloor,addFloorsSample, removeFloor, resetFloors } = floorSlice.actions;
export default floorSlice;
