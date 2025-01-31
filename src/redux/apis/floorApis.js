import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getEnv from "../../configs/config.js";

const floorApis = createApi({
  reducerPath: "floorApis",
  baseQuery: fetchBaseQuery({ baseUrl: `${getEnv("SERVER_URL")}/api/floor`, credentials: "include" }),

  endpoints: (builder) => ({
    // create new floor
    createFloor: builder.mutation({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
      }),
    }),
    createFloorsInBulk: builder.mutation({
      query: (data) => ({
        url: "/create-multiple",
        method: "POST",
        body: data,
      }),
    }),
    // get all floors
    getAllFloors: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
    }),
    // get single floor
    getSingleFloor: builder.query({
      query: (id) => ({
        url: `/single/${id}`,
        method: "GET",
      }),
    }),
    // update single floor
    updateSingleFloor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/single/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    // delete single floor
    deleteSingleFloor: builder.mutation({
      query: (id) => ({
        url: `/single/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateFloorMutation,
  useCreateFloorsInBulkMutation,
  useGetAllFloorsQuery,
  useGetSingleFloorQuery,
  useUpdateSingleFloorMutation,
  useDeleteSingleFloorMutation,
} = floorApis;
export default floorApis;
