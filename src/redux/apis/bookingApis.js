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
    // delete single booking
    deleteSingleBooking: builder.mutation({
      query: (id) => ({
        url: `/single/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Booking', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetSingleBookingQuery,
  useUpdateSingleBookingMutation,
  useDeleteSingleBookingMutation,
} = bookingApis;
export default bookingApis;
