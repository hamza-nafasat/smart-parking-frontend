import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getEnv from "../../configs/config.js";

const sensorApis = createApi({
  reducerPath: "sensorApis",
  baseQuery: fetchBaseQuery({ baseUrl: `${getEnv("SERVER_URL")}/api/sensor`, credentials: "include" }),

  endpoints: (builder) => ({
    // create new sensor
    createSensor: builder.mutation({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
      }),
    }),
    // get all sensors
    getAllSensors: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
    }),
    // get single sensor
    getSingleSensor: builder.query({
      query: (id) => ({
        url: `/single/${id}`,
        method: "GET",
      }),
    }),
    // update single sensor
    updateSingleSensor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/single/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    // delete single sensor
    deleteSingleSensor: builder.mutation({
      query: (id) => ({
        url: `/single/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateSensorMutation,
  useGetAllSensorsQuery,
  useGetSingleSensorQuery,
  useUpdateSingleSensorMutation,
  useDeleteSingleSensorMutation,
} = sensorApis;
export default sensorApis;
