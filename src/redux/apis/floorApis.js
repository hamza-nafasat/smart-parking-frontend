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
    // get single floor
    getSingleFloor: builder.query({
      query: (id) => ({
        url: `/single/${id}`,
        method: 'GET',
      }),
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
    // get single building floors for admin
    getSingleBuildingFloorsForAdmin: builder.query({
      query: ({ buildingId, floorName }) => ({
        url: `/single/admin/floor/${buildingId}?search=${floorName}`,
        method: 'GET',
      }),
    }),
    // get building Floor for Admin
    getBuildingFloorForAdmin: builder.query({
      query: (id) => ({
        url: `/single/admin/floor/single/${id}`,
        method: 'GET',
      }),
    }),
    // GET floor analytics for admin on floor view for performance, freespace, occupied space trends
    getFloorAnalyticsForAdmin: builder.query({
      query: ({ floorId, cardType, filter }) => ({
        url: `/single/admin/floor-analytics-per-filter?floorId=${floorId}&cardType=${cardType}&filter=${filter}`,
        method: 'GET',
      }),
      invalidatesTags: [{ type: 'Floor', id: 'LIST' }],
    }),
    // get floor overall analytics for admin
    getFloorOverallAnalyticsForAdmin: builder.query({
      query: ({ floorId }) => ({
        url: `/single/admin/floor/overall-analytics/${floorId}`,
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
  useGetSingleFloorQuery,
  useUpdateSingleFloorMutation,
  useDeleteSingleFloorMutation,
  useGetSingleBuildingFloorsForAdminQuery,
  useGetBuildingFloorForAdminQuery,
  useGetFloorAnalyticsForAdminQuery,
  useGetFloorOverallAnalyticsForAdminQuery,
} = floorApis;
export default floorApis;
