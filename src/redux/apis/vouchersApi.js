import baseQueryWithReauth from '@/config/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const vouchersApi = createApi({
  reducerPath: 'vouchersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Vouchers'],
  endpoints: (builder) => ({
    getVouchers: builder.query({
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
    updateVoucher: builder.mutation({
      query: ({ id, type, discountValue, usageLimit, endDate, startDate }) => ({
        url: `/admin/vouchers/${id}`,
        method: 'PUT',
        body: { type, discountValue, usageLimit, endDate, startDate }
      }),
      invalidatesTags: ['Vouchers']
    }),
    deleteVouchers: builder.mutation({
      query: ({ voucherIds }) => ({
        url: `/admin/vouchers`,
        method: 'DELETE',
        body: { voucherIds }
      }),
      invalidatesTags: ['Vouchers']
    }),
    toggleActiveVouchers: builder.mutation({
      query: ({ voucherIds, activated }) => ({
        url: `/admin/vouchers/toggle-active`,
        method: 'PUT',
        body: { voucherIds, activated }
      }),
      invalidatesTags: ['Vouchers']
    })
  })
});

export const {
  useGetVouchersQuery,
  useAddVoucherMutation,
  useUpdateVoucherMutation,
  useDeleteVouchersMutation,
  useToggleActiveVouchersMutation
} = vouchersApi;
