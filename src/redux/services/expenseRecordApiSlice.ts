import { apiSlice } from "./apiSlice";

const expenseRecordApiConfig = apiSlice.enhanceEndpoints({
  addTagTypes: ["Expense"],
});

const expenseRecordApi = expenseRecordApiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: ({ farmId }) => `/farmer/${farmId}/expense`,
      providesTags: ["Expense"],
    }),
    createExpense: builder.mutation({
      query: ({ formdata, farmId }) => ({
        url: `/farmer/${farmId}/expense`,
        method: `POST`,
        body: formdata,
      }),
      invalidatesTags: ["Expense"],
    }),
    editExpense: builder.mutation({
      query: ({ formdata, farmId, expenseId }) => ({
        url: `/farmer/${farmId}/expense/${expenseId}`,
        method: `PATCH`,
        body: formdata,
      }),
      invalidatesTags: ["Expense"],
    }),
    deleteExpense: builder.mutation({
      query: ({ farmId, expenseId }) => ({
        url: `/farmer/${farmId}/expense/${expenseId}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["Expense"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetExpensesQuery,
  useCreateExpenseMutation,
  useEditExpenseMutation,
  useDeleteExpenseMutation,
} = expenseRecordApi;
