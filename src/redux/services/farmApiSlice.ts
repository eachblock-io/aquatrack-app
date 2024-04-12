import { apiSlice } from "./apiSlice";

interface Farm {
  formdata: {
    date_established: string;
    location: string;
    name: string;
    no_of_ponds: number;
  };
}

const farmApiConfig = apiSlice.enhanceEndpoints({ addTagTypes: ["Farms"] });

const farmApi = farmApiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getAllFarms: builder.query({
      query: () => `/farmer/farms`,
      providesTags: ["Farms"],
    }),
    getFarmData: builder.query({
      query: ({ farmId }) => `/farmer/${farmId}/dashboard`,
      providesTags: ["Farms"],
    }),
    createFarm: builder.mutation<void, any>({
      query: ({ formdata }) => ({
        url: `/farmer/farms`,
        method: `POST`,
        body: formdata,
      }),
      invalidatesTags: ["Farms"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllFarmsQuery,
  useGetFarmDataQuery,
  useCreateFarmMutation,
} = farmApi;