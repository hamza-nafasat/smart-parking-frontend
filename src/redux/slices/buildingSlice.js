import { createSlice } from "@reduxjs/toolkit";

const buildingSlice = createSlice({
  name: "building",
  initialState: { buildingGeneralInfo: null },
  reducers: {
    addBuildingGeneralInfo: (state, action) => {
      state.buildingGeneralInfo = action.payload;
    },
    removeBuildingInfo: (state) => {
      state.building = null;
    },
    decrementFloorsNumber: (state) => {
      state.buildingGeneralInfo.noOfFloors -= 1;
    },
    resetBuildings: (state) => {
      state.buildingGeneralInfo = null;
    },
  },
});

export const { addBuildingGeneralInfo, removeBuildingInfo, decrementFloorsNumber, resetBuildings } =
  buildingSlice.actions;
export default buildingSlice;
