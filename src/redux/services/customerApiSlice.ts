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
    getAllCustomers: builder.query({
      query: ({ farmId }) => `/farmer/${farmId}/customers`,
      providesTags: ["Customer"],
    }),
    downloadSheet: builder.query({
      query: ({ farmId }) => `/farmer/${farmId}/customers?export=csv`,
      providesTags: ["Customer"],
    }),
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
    editPurchase: builder.mutation({
      query: ({ formdata, farmId, harvestId }) => ({
        url: `/farmer/${farmId}/harvest/${harvestId}/purchase`,
        method: `PATCH`,
        body: formdata,
      }),
      invalidatesTags: ["Customer"],
    }),
    deletePurchase: builder.mutation({
      query: ({ formdata, purchaseId }) => ({
        url: `/farmer/purchase/${purchaseId}`,
        method: `DELETE`,
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
    AddBeneficiary: builder.mutation({
      query: ({ formdata, farmId }) => ({
        url: `/farmer/${farmId}/beneficiary`,
        method: `POST`,
        body: formdata,
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCustomersQuery,
  useGetAllCustomersQuery,
  useDownloadSheetQuery,
  useCreatePurchaseMutation,
  useEditPurchaseMutation,
  useDeletePurchaseMutation,
  useCreateCustomerMutation,
  useEditCustomerMutation,
  useDeleteCustomerMutation,
  useAddBeneficiaryMutation,
} = customerApi;
