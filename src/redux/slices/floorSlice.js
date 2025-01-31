import { createSlice } from "@reduxjs/toolkit";

const floorSlice = createSlice({
  name: "floor",
  initialState: { floors: [], activeAccordionIndex: null },
  reducers: {
    addFloorsSample: (state, action) => {
      const currentLength = state.floors.length;
      const newLength = action.payload;
      if (newLength > currentLength) {
        const additionalFloors = Array.from({ length: newLength - currentLength }, (_, index) => ({
          floorNumber: currentLength + index + 1,
        }));
        state.floors.push(...additionalFloors);
      } else if (newLength < currentLength) {
        state.floors = state.floors.slice(0, newLength);
      }
    },
    addFloor: (state, action) => {
      state.floors = state.floors.map((floor) =>
        floor.floorNumber == action.payload.floorNumber ? action.payload : floor
      );
    },
    removeFloor: (state, action) => {
      state.floors = state.floors.filter((floor) => floor.floorNumber == action.payload);
    },
    resetFloors: (state) => {
      state.floors = [];
    },
    setActiveAccordionIndex: (state, action) => {
      state.activeAccordionIndex = action.payload;
    },
  },
});

export const { addFloor, addFloorsSample, removeFloor, resetFloors, setActiveAccordionIndex } = floorSlice.actions;
export default floorSlice;
