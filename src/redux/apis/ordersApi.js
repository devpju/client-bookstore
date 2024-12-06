import baseQueryWithReauth from '@/config/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: '/admin/orders'
      }),
      providesTags: ['Orders']
    }),
    getDetailOrder: builder.query({
      query: ({ id }) => ({
        url: `/admin/orders/${id}`
      })
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, paymentStatus, orderStatus }) => ({
        url: `admin/orders/${id}`,
        method: 'PUT',
        body: { paymentStatus, orderStatus }
      }),
      invalidatesTags: ['Orders']
    })
  })
});

export const {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetDetailOrderQuery
} = ordersApi;
