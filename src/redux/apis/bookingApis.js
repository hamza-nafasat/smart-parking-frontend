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
      query: ({ search, order }) => ({
        url: `/all?search=${search || ''}&order=${order || ''}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Booking', id: 'LIST' }],
    }),
    // get my all bookings
    getMyAllBookings: builder.query({
      query: ({ search, order }) => ({
        url: `/my-all?search=${search || ''}&order=${order || ''}`,
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
    // get current bookings
    getCurrentBookings: builder.query({
      query: ({ search }) => ({
        url: `/current-bookings?search=${search || ''}`,
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
    // get single booking slip for admin and Manager

    getSingleBookingSlipForAdminAndManager: builder.query({
      query: (id) => ({
        url: `/single/adminAndmanager/bookingSlip/${id}`,
        method: 'GET',
      }),
    }),
    // get all bookings of today
    getAllBookingsOfToday: builder.query({
      query: ({ search, order }) => ({
        url: `/today?search=${search || ''}&order=${order || ''}`,
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
  useGetSingleBookingSlipForAdminAndManagerQuery,
  useGetAllBookingsOfTodayQuery,
} = bookingApis;
export default bookingApis;
