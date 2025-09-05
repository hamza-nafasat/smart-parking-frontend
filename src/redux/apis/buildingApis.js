import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getEnv from '../../configs/config.js';

const buildingApis = createApi({
  reducerPath: 'buildingApis',
  baseQuery: fetchBaseQuery({ baseUrl: `${getEnv('SERVER_URL')}/api/building`, credentials: 'include' }),

  endpoints: (builder) => ({
    // create new building
    createBuilding: builder.mutation({
      query: (data) => ({
        url: '/create',
        method: 'POST',
        body: data,
      }),
    }),
    // get all buildings
    getAllBuildings: builder.query({
      query: () => ({
        url: `/all`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Building', id: 'LIST' }],
    }),
    // get all buildings for user with lat lng
    getAllBuildingsForUser: builder.query({
      query: ({ lat, lng }) => ({
        url: `/all?lat=${lat || ''}&lng=${lng || ''}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Building', id: 'LIST' }],
    }),
    // get single building
    getSingleBuilding: builder.query({
      query: (id) => ({
        url: `/single/${id}`,
        method: 'GET',
      }),
    }),
    // update single building
    updateSingleBuilding: builder.mutation({
      query: ({ id, data }) => ({
        url: `/single/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'Building', id: 'LIST' }],
    }),
    // delete single building
    deleteSingleBuilding: builder.mutation({
      query: (id) => ({
        url: `/single/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Building', id: 'LIST' }],
    }),
    // get most visited buildings
    getMostVisitedBuildings: builder.query({
      query: () => ({
        url: '/most-visited-buildings',
        method: 'GET',
      }),
    }),
    // get single building for admin
    getSingleBuildingForAdmin: builder.query({
      query: (id) => ({
        url: `/single/admin/${id}`,
        method: 'GET',
      }),
    }),
    // get revenue overview for single building for admin
    getRevenueOverviewForSingleBuildingForAdmin: builder.query({
      query: ({ type, buildingId }) => ({
        url: `/single/building/admin/revenue-overview?type=${type}&buildingId=${buildingId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateBuildingMutation,
  useGetAllBuildingsQuery,
  useGetAllBuildingsForUserQuery,
  useGetSingleBuildingQuery,
  useUpdateSingleBuildingMutation,
  useDeleteSingleBuildingMutation,
  useGetMostVisitedBuildingsQuery,
  useGetSingleBuildingForAdminQuery,
  useGetRevenueOverviewForSingleBuildingForAdminQuery,
} = buildingApis;
export default buildingApis;
