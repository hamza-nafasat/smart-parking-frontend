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
      query: ({ search }) => ({
        url: `/all?search=${search || ''}`,
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
    // get single building
    getSingleBuilding: builder.query({
      query: (id) => ({
        url: `/single/building/${id}`,
        method: 'GET',
      }),
    }),
    // get revenue overview for single building
    getRevenueOverviewForSingleBuilding: builder.query({
      query: ({ type, buildingId }) => ({
        url: `/single-building/revenue-overview?type=${type}&buildingId=${buildingId}`,
        method: 'GET',
      }),
      invalidatesTags: [{ type: 'Building', id: 'LIST' }],
    }),
    // GET building analytics on building view for performance, freespace, occupied space trends
    getBuildingAnalytics: builder.query({
      query: ({ buildingId, cardType, filter }) => ({
        url: `/single-building/analytics?buildingId=${buildingId}&cardType=${cardType}&filter=${filter}`,
        method: 'GET',
      }),
      invalidatesTags: [{ type: 'Building', id: 'LIST' }],
    }),
    // get building overall analytics
    getBuildingOverallAnalytics: builder.query({
      query: ({ buildingId }) => ({
        url: `/single-building/overall-analytics?buildingId=${buildingId}`,
        method: 'GET',
      }),
      invalidatesTags: [{ type: 'Building', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateBuildingMutation,
  useGetAllBuildingsQuery,
  useGetAllBuildingsForUserQuery,
  useUpdateSingleBuildingMutation,
  useDeleteSingleBuildingMutation,
  useGetMostVisitedBuildingsQuery,
  useGetSingleBuildingQuery,
  useGetRevenueOverviewForSingleBuildingQuery,
  useGetBuildingAnalyticsQuery,
  useGetBuildingOverallAnalyticsQuery,
} = buildingApis;
export default buildingApis;
