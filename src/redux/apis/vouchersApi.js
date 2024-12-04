import baseQueryWithReauth from '@/config/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const vouchersApi = createApi({
  reducerPath: 'vouchersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Vouchers'],
  endpoints: (builder) => ({
    fetchVouchers: builder.query({
      query: () => ({
        url: '/admin/vouchers'
      }),
      providesTags: ['Vouchers']
    }),
    addVoucher: builder.mutation({
      query: ({ type, discountValue, usageLimit, endDate, startDate }) => ({
        url: '/admin/vouchers',
        method: 'POST',
        body: { type, discountValue, usageLimit, endDate, startDate }
      }),
      invalidatesTags: ['Vouchers']
    }),
    editVoucher: builder.mutation({
      query: ({ id, type, discountValue, usageLimit, endDate, startDate }) => ({
        url: `/admin/vouchers/${id}`,
        method: 'PUT',
        body: { type, discountValue, usageLimit, endDate, startDate }
      }),
      invalidatesTags: ['Vouchers']
    }),
    deactivateVouchers: builder.mutation({
      query: ({ voucherIds }) => ({
        url: `/admin/vouchers/unactive`,
        method: 'PUT',
        body: { voucherIds }
      }),
      invalidatesTags: ['Vouchers']
    })
  })
});

export const {
  useFetchVouchersQuery,
  useAddVoucherMutation,
  useDeactivateVouchersMutation,
  useEditVoucherMutation
} = vouchersApi;
