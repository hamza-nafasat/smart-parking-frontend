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
  },
});

export const { addBuildingInfo, removeBuildingInfo } = buildingSlice.actions;
export default buildingSlice;
