import { apiSlice } from "./apiSlice";

const subApiConfig = apiSlice.enhanceEndpoints({ addTagTypes: ["Sub"] });

const subApi = subApiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getSubs: builder.query({
      query: () => ({
        url: `/fetch-subscription-plan`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Sub"],
    }),
    getBuillingRecords: builder.query({
      query: () => ({
        url: `/farmer/billing-history`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Sub"],
    }),
    createSub: builder.mutation({
      query: ({ formdata }) => ({
        url: `/subscription-plan`,
        method: `POST`,
        body: formdata,
      }),
      invalidatesTags: ["Sub"],
    }),
    editSub: builder.mutation({
      query: ({ formdata, subid }) => ({
        url: `/subscription-plan/${subid}`,
        method: `PATCH`,
        body: formdata,
      }),
      invalidatesTags: ["Sub"],
    }),
    deleteSub: builder.mutation({
      query: ({ subid }) => ({
        url: `/subscription-plan/${subid}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["Sub"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetSubsQuery,
  useGetBuillingRecordsQuery,
  useCreateSubMutation,
  useEditSubMutation,
  useDeleteSubMutation,
} = subApi;
