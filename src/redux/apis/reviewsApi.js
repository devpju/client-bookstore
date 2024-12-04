import baseQueryWithReauth from '@/config/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const reviewsApi = createApi({
  reducerPath: 'reviewsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Reviews'],
  endpoints: (builder) => ({
    fetchReviews: builder.query({
      query: () => ({
        url: '/admin/reviews'
      }),
      providesTags: ['Reviews']
    }),
    hideReviews: builder.mutation({
      query: ({ reviewIds }) => ({
        url: `/admin/reviews/hide`,
        method: 'PUT',
        body: { reviewIds }
      }),
      invalidatesTags: ['Reviews']
    })
  })
});

export const { useFetchReviewsQuery, useHideReviewsMutation } = reviewsApi;
