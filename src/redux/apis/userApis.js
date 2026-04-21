import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getEnv from '../../configs/config.js';

const userApis = createApi({
  reducerPath: 'userApis',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getEnv('SERVER_URL')}/api/auth`,
    credentials: 'include',
  }),
  tagTypes: ['Managers', 'Users'],

  endpoints: (builder) => ({
    getManagers: builder.query({
      query: ({ page = 1, limit = 10, search = '' }) => `/admin/managers?page=${page}&limit=${limit}&search=${search}`,
      providesTags: (result, error, arg) => (result ? [{ type: 'Managers', id: 'LIST' }] : ['Managers']),
    }),

    createManager: builder.mutation({
      query: (data) => ({
        url: '/admin/register-manager',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Managers', id: 'LIST' }],
    }),

    updateManager: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/manager/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'Managers', id: 'LIST' }],
    }),

    deleteManager: builder.mutation({
      query: (id) => ({
        url: `/manager/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Managers', id: 'LIST' }],
    }),
  }),
});

export const { useGetManagersQuery, useCreateManagerMutation, useUpdateManagerMutation, useDeleteManagerMutation } =
  userApis;

export default userApis;
