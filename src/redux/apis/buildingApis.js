import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getEnv from "../../configs/config.js";

const buildingApis = createApi({
  reducerPath: "buildingApis",
  baseQuery: fetchBaseQuery({ baseUrl: `${getEnv("SERVER_URL")}/api/building`, credentials: "include" }),

  endpoints: (builder) => ({
    // create new building
    createBuilding: builder.mutation({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
      }),
    }),
    // get all buildings
    getAllBuildings: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
    }),
    // get single building
    getSingleBuilding: builder.query({
      query: (id) => ({
        url: `/single/${id}`,
        method: "GET",
      }),
    }),
    // update single building
    updateSingleBuilding: builder.mutation({
      query: ({ id, data }) => ({
        url: `/single/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    // delete single building
    deleteSingleBuilding: builder.mutation({
      query: (id) => ({
        url: `/single/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateBuildingMutation,
  useGetAllBuildingsQuery,
  useGetSingleBuildingQuery,
  useUpdateSingleBuildingMutation,
  useDeleteSingleBuildingMutation,
} = buildingApis;
export default buildingApis;
