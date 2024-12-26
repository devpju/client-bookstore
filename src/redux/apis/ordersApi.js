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
    }),
    calculateOrder: builder.mutation({
      query: (orderInfo) => ({
        url: `/orders/calculate`,
        method: 'POST', // Use POST since you're sending a body
        body: { ...orderInfo } // Send the order data in the body
      })
    })
  })
});

export const {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetDetailOrderQuery,
  useCalculateOrderMutation
} = ordersApi;
