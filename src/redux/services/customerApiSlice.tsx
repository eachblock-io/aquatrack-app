import { apiSlice } from "./apiSlice";

const customerApiConfig = apiSlice.enhanceEndpoints({
  addTagTypes: ["Customer"],
});

const customerApi = customerApiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: ({ farmId, harvestId }) =>
        `/farmer/${farmId}/harvest/${harvestId}/customer`,
      providesTags: ["Customer"],
    }),
    // getCustomer: builder.query({
    //   query: ({ farmId, customerId }) =>
    //     `/farmer/${farmId}/customer/${customerId}`,
    //   providesTags: ["Customer"],
    // }),
    createCustomer: builder.mutation({
      query: ({ formdata, farmId, harvestId }) => ({
        url: `/farmer/${farmId}/harvest/${harvestId}/customer`,
        method: `POST`,
        body: formdata,
      }),
      invalidatesTags: ["Customer"],
    }),
    createPurchase: builder.mutation({
      query: ({ formdata, farmId, harvestId }) => ({
        url: `/farmer/${farmId}/harvest/${harvestId}/purchase`,
        method: `POST`,
        body: formdata,
      }),
      invalidatesTags: ["Customer"],
    }),
    editCustomer: builder.mutation({
      query: ({ formdata, farmId, taskId }) => ({
        url: `/farmer/${farmId}/customer/${taskId}`,
        method: `PATCH`,
        body: formdata,
      }),
      invalidatesTags: ["Customer"],
    }),
    deleteCustomer: builder.mutation({
      query: ({ farmId, batchId }) => ({
        url: `/farmer/${farmId}/customer/${batchId}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCustomersQuery,
  useCreatePurchaseMutation,
  useCreateCustomerMutation,
  useEditCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;
