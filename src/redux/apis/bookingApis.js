import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getEnv from '../../configs/config.js';

const bookingApis = createApi({
  reducerPath: 'bookingApis',
  baseQuery: fetchBaseQuery({ baseUrl: `${getEnv('SERVER_URL')}/api/booking`, credentials: 'include' }),

  endpoints: (builder) => ({
    // create new booking
    createBooking: builder.mutation({
      query: (data) => ({
        url: '/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Booking', id: 'LIST' }],
    }),
    // get all bookings
    getAllBookings: builder.query({
      query: () => ({
        url: '/all',
        method: 'GET',
      }),
      providesTags: [{ type: 'Booking', id: 'LIST' }],
    }),
    // get my all bookings
    getMyAllBookings: builder.query({
      query: () => ({
        url: '/my-all',
        method: 'GET',
      }),
      providesTags: [{ type: 'Booking', id: 'LIST' }],
    }),
    // get single booking
    getSingleBooking: builder.query({
      query: (id) => ({
        url: `/single/${id}`,
        method: 'GET',
      }),
    }),
    // update single booking
    updateSingleBooking: builder.mutation({
      query: ({ id, data }) => ({
        url: `/single/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'Booking', id: 'LIST' }],
    }),
    // cancel signal booking
    cancelSingleBooking: builder.mutation({
      query: (id) => ({
        url: `/single/cancel/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: [{ type: 'Booking', id: 'LIST' }],
    }),
    // delete single booking
    deleteSingleBooking: builder.mutation({
      query: (id) => ({
        url: `/single/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Booking', id: 'LIST' }],
    }),
    getCurrentBookings: builder.query({
      query: () => ({
        url: '/current-bookings',
        method: 'GET',
      }),
      providesTags: [{ type: 'Booking', id: 'LIST' }],
    }),
    // get booking summary of building for admin
    getBookingSummaryOfBuildingForAdmin: builder.query({
      query: (id) => ({
        url: `single/admin/bookingSummary/${id}`,
        method: 'GET',
      }),
    }),
    // get single booking slip for admin

    getSingleBookingSlipForAdmin: builder.query({
      query: (id) => ({
        url: `/single/admin/bookingSlip/${id}`,
        method: 'GET',
      }),
    }),
    // get all booking for admin
    getAllBookingsForAdmin: builder.query({
      query: () => ({
        url: '/all/Bookings/admin',
        method: 'GET',
      }),
      providesTags: [{ type: 'Booking', id: 'LIST' }],
    }),
    // get all bookings of today for admin
    getAllBookingsOfTodayForAdmin: builder.query({
      query: () => ({
        url: '/today/Bookings/admin',
        method: 'GET',
      }),
      providesTags: [{ type: 'Booking', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetMyAllBookingsQuery,
  useGetAllBookingsQuery,
  useGetSingleBookingQuery,
  useUpdateSingleBookingMutation,
  useCancelSingleBookingMutation,
  useDeleteSingleBookingMutation,
  useGetCurrentBookingsQuery,
  useGetBookingSummaryOfBuildingForAdminQuery,
  useGetSingleBookingSlipForAdminQuery,
  useGetAllBookingsForAdminQuery,
  useGetAllBookingsOfTodayForAdminQuery,
} = bookingApis;
export default bookingApis;
