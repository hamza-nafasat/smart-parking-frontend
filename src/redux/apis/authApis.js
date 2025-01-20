import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getEnv from "../../configs/config.js";

const authApis = createApi({
  reducerPath: "authApis",
  baseQuery: fetchBaseQuery({ baseUrl: `${getEnv("SERVER_URL")}/api/auth`, credentials: "include" }),

  endpoints: (builder) => ({
    // register
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
    // login
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    // forget password
    forgetPassword: builder.mutation({
      query: ({ email }) => ({
        url: "/forget-password",
        method: "POST",
        body: { email },
      }),
    }),
    // reset password
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    // get my profile
    getMyProfile: builder.query({
      query: () => ({
        url: "/my-profile",
        method: "GET",
      }),
    }),
    // logout
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
    }),
    // check user login
    checkLogin: builder.mutation({
      query: () => ({
        url: "/my-profile",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMyProfileQuery,
  useLogoutMutation,
  useUpdateMyProfileMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useCheckLoginMutation,
} = authApis;
export default authApis;
