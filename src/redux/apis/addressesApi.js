import baseQueryWithReauth from '@/config/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const addressesApi = createApi({
  reducerPath: 'addressesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Addresses'],
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: () => ({
        url: '/user/addresses'
      }),
      providesTags: ['Addresses']
    }),
    addAddress: builder.mutation({
      query: (addressInfo) => ({
        url: '/user/addresses',
        method: 'POST',
        body: {
          ...addressInfo
        }
      }),
      invalidatesTags: ['Addresses']
    }),
    updateAddress: builder.mutation({
      query: ({ id, ...addressInfo }) => ({
        url: `/user/addresses/${id}`,
        method: 'PUT',
        body: { ...addressInfo }
      }),
      invalidatesTags: ['Addresses']
    }),
    deleteAddress: builder.mutation({
      query: ({ id }) => ({
        url: `/user/addresses/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Addresses']
    }),
    getProvinces: builder.query({
      query: () => ({
        url: '/provinces'
      })
    }),
    getDistricts: builder.query({
      query: (provinceId) => ({
        url: `districts`,
        params: { provinceId }
      })
    }),
    getWards: builder.query({
      query: (districtId) => ({
        url: `wards`,
        params: { districtId }
      })
    })
  })
});

export const {
  useGetAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useGetProvincesQuery,
  useGetDistrictsQuery,
  useGetWardsQuery
} = addressesApi;
