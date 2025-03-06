import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: { booking:{} },
  reducers: {
    addBookingInDetails: (state, action) => {
      state.booking = action.payload
    },
    removeBookingInDetails: (state,) => {
      state.booking = {}
    }

    
  },
});

export const { addBookingInDetails, removeBookingInDetails} =
  bookingSlice.actions;
export default bookingSlice;
