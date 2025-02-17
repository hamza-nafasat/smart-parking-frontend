import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getEnv from "../../configs/config.js";

const slotApis = createApi({
  reducerPath: "SlotApis",
  baseQuery: fetchBaseQuery({ baseUrl: `${getEnv("SERVER_URL")}/api/slot`, credentials: "include" }),

  endpoints: (builder) => ({
    // create new Slot
    createSlot: builder.mutation({
      query: ({ data }) => ({
        url: "/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Slot", id: "LIST" }],
    }),
    createSlotsInBulk: builder.mutation({
      query: (data) => ({
        url: "/create-multiple",
        method: "POST",
        body: data,
      }),
    }),
    // get all Slots
    getAllSlots: builder.query({
      query: (floorId) => ({
        url: `/all?floorId=${floorId}`,
        method: "GET",
      }),
      providesTags: [{ type: "Slot", id: "LIST" }],
    }),
    // get single Slot
    getSingleSlot: builder.query({
      query: (id) => ({
        url: `/single/${id}`,
        method: "GET",
      }),
    }),
    // update single Slot
    updateSingleSlot: builder.mutation({
      query: ({ id, data }) => ({
        url: `/single/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    // delete single Slot
    deleteSingleSlot: builder.mutation({
      query: (id) => ({
        url: `/single/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Slot", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateSlotMutation,
  useCreateSlotsInBulkMutation,
  useGetAllSlotsQuery,
  useGetSingleSlotQuery,
  useUpdateSingleSlotMutation,
  useDeleteSingleSlotMutation,
} = slotApis;
export default slotApis;
