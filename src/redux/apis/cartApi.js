import baseQueryWithReauth from '@/config/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({ url: '/cart' }),
      providesTags: ['Cart']
    }),
    updateQuantityBook: builder.mutation({
      query: ({ bookId, quantity }) => ({
        url: `/cart/${bookId}`,
        method: 'PUT',
        body: { quantity }
      }),
      invalidatesTags: ['Cart']
    }),
    addToCart: builder.mutation({
      query: ({ bookId, quantity }) => ({
        url: `/cart`,
        method: 'POST',
        body: { quantity, productId: bookId }
      }),
      invalidatesTags: ['Cart']
    }),
    deleteBookCart: builder.mutation({
      query: ({ bookId }) => ({
        url: `/cart/${bookId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Cart']
    })
  })
});

export const {
  useGetCartQuery,
  useUpdateQuantityBookMutation,
  useDeleteBookCartMutation,
  useAddToCartMutation
} = cartApi;
