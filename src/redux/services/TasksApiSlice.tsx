import { apiSlice } from "./apiSlice";

const taskApiConfig = apiSlice.enhanceEndpoints({ addTagTypes: ["Tasks"] });

const taskApi = taskApiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getAllTaskData: builder.query({
      query: ({ farmId }) => `/farmer/${farmId}/task`,
      providesTags: ["Tasks"],
    }),
    createTask: builder.mutation({
      query: ({ formdata, farmId }) => ({
        url: `/farmer/${farmId}/task`,
        method: `POST`,
        body: formdata,
      }),
      invalidatesTags: ["Tasks"],
    }),
    editTask: builder.mutation({
      query: ({ formdata, farmId, taskId }) => ({
        url: `/farmer/${farmId}/task/${taskId}`,
        method: `PATCH`,
        body: formdata,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: ({ farmId, taskId }) => ({
        url: `/farmer/${farmId}/task/${taskId}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllTaskDataQuery,
  useCreateTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
