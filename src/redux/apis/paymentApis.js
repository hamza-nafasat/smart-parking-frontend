import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getEnv from '../../configs/config.js';

const paymentApis = createApi({
  reducerPath: 'paymentApis',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getEnv('SERVER_URL')}/api/payment`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: '/create-payment-intent',
        method: 'POST',
        body: data,
      }),
    }),
    getAllPaymentsWithMyAccount: builder.query({
      query: () => ({
        url: '/my-payments',
        method: 'GET',
      }),
    }),
    withDrawAmount: builder.mutation({
      query: (data) => ({
        url: '/withdrawal',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreatePaymentIntentMutation, useGetAllPaymentsWithMyAccountQuery, useWithDrawAmountMutation } =
  paymentApis;
export default paymentApis;
