import { apiSlice } from "./apiSlice";

const userApiConfig = apiSlice.enhanceEndpoints({ addTagTypes: ["User"] });

const userApi = userApiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => `/user`,
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
  }),
  overrideExisting: true,
});

export const { useGetCurrentUserQuery } = userApi;
