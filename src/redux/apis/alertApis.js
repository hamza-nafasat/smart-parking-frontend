import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getEnv from "../../configs/config.js";

const alertApis = createApi({
  reducerPath: "alertApis",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getEnv("SERVER_URL")}/api/alert`,
    credentials: "include",
  }),
  tagTypes: ["Rule", "AlertConfig", "AlertLog"],

  endpoints: (builder) => ({
    // Sensor Alerts (Configs - Mongoose)
    getAlertConfigs: builder.query({
      query: () => "/configs",
      providesTags: (result) =>
        result
          ? [...result.alerts.map(({ _id }) => ({ type: "AlertConfig", id: _id })), { type: "AlertConfig", id: "LIST" }]
          : [{ type: "AlertConfig", id: "LIST" }],
    }),
    createAlertConfig: builder.mutation({
      query: (data) => ({
        url: "/configs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "AlertConfig", id: "LIST" }],
    }),
    updateAlertConfig: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/configs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "AlertConfig", id },
        { type: "AlertConfig", id: "LIST" },
      ],
    }),
    deleteAlertConfig: builder.mutation({
      query: (id) => ({
        url: `/configs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "AlertConfig", id: "LIST" }],
    }),

    // Rule Engine (Complex Rules - Mongoose)
    getRules: builder.query({
      query: () => "/rules",
      providesTags: (result) =>
        result
          ? [...result.rules.map(({ _id }) => ({ type: "Rule", id: _id })), { type: "Rule", id: "LIST" }]
          : [{ type: "Rule", id: "LIST" }],
    }),
    createRule: builder.mutation({
      query: (data) => ({
        url: "/rules",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Rule", id: "LIST" }],
    }),
    updateRule: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/rules/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Rule", id },
        { type: "Rule", id: "LIST" },
      ],
    }),
    deleteRule: builder.mutation({
      query: (id) => ({
        url: `/rules/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Rule", id: "LIST" }],
    }),

    // Alert Logs (History - Sequelize)
    getAlertLogs: builder.query({
      query: () => "/logs",
      providesTags: (result) =>
        result
          ? [...result.alerts.map(({ id }) => ({ type: "AlertLog", id })), { type: "AlertLog", id: "LIST" }]
          : [{ type: "AlertLog", id: "LIST" }],
    }),
    deleteAlertLog: builder.mutation({
      query: (id) => ({
        url: `/logs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "AlertLog", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAlertConfigsQuery,
  useCreateAlertConfigMutation,
  useUpdateAlertConfigMutation,
  useDeleteAlertConfigMutation,
  useGetRulesQuery,
  useCreateRuleMutation,
  useUpdateRuleMutation,
  useDeleteRuleMutation,
  useGetAlertLogsQuery,
  useDeleteAlertLogMutation,
} = alertApis;

export default alertApis;
