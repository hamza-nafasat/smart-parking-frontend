import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getEnv from '../../configs/config.js';

const floorApis = createApi({
  reducerPath: 'floorApis',
  baseQuery: fetchBaseQuery({ baseUrl: `${getEnv('SERVER_URL')}/api/floor`, credentials: 'include' }),

  endpoints: (builder) => ({
    // create new floor
    createFloor: builder.mutation({
      query: ({ data }) => ({
        url: '/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Floor', id: 'LIST' }],
    }),
    createFloorsInBulk: builder.mutation({
      query: (data) => ({
        url: '/create-multiple',
        method: 'POST',
        body: data,
      }),
    }),
    // get all floors
    getAllFloors: builder.query({
      query: (buildingId) => ({
        url: `/all?buildingId=${buildingId}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Floor', id: 'LIST' }],
    }),
    // update single floor
    updateSingleFloor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/single/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'Floor', id: 'LIST' }],
    }),
    // delete single floor
    deleteSingleFloor: builder.mutation({
      query: (id) => ({
        url: `/single/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Floor', id: 'LIST' }],
    }),
    // get single building floors
    getFloorsOfSingleBuilding: builder.query({
      query: ({ buildingId, floorName }) => ({
        url: `/single-building/floors/${buildingId}?search=${floorName}`,
        method: 'GET',
      }),
      invalidatesTags: [{ type: 'Floor', id: 'LIST' }],
    }),
    // get building Floor
    getSingleBuildingFloor: builder.query({
      query: (id) => ({
        url: `/single-building/floor/single/${id}`,
        method: 'GET',
      }),
      invalidatesTags: [{ type: 'Floor', id: 'LIST' }],
    }),
    // GET floor analytics on floor view for performance, freespace, occupied space trends
    getFloorAnalytics: builder.query({
      query: ({ floorId, cardType, filter }) => ({
        url: `/single-floor/floor-analytics-per-filter?floorId=${floorId}&cardType=${cardType}&filter=${filter}`,
        method: 'GET',
      }),
      invalidatesTags: [{ type: 'Floor', id: 'LIST' }],
    }),
    // get floor overall analytics
    getFloorOverallAnalytics: builder.query({
      query: ({ floorId }) => ({
        url: `/single/floor/overall-analytics/${floorId}`,
        method: 'GET',
      }),
      invalidatesTags: [{ type: 'Floor', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateFloorMutation,
  useCreateFloorsInBulkMutation,
  useGetAllFloorsQuery,
  useUpdateSingleFloorMutation,
  useDeleteSingleFloorMutation,
  useGetFloorsOfSingleBuildingQuery,
  useGetSingleBuildingFloorQuery,
  useGetFloorAnalyticsQuery,
  useGetFloorOverallAnalyticsQuery,
} = floorApis;
export default floorApis;
