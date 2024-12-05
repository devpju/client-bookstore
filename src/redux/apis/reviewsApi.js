import baseQueryWithReauth from '@/config/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const reviewsApi = createApi({
  reducerPath: 'reviewsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Reviews'],
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => ({
        url: '/admin/reviews'
      }),
      providesTags: ['Reviews']
    }),
    toggleReviewsVisibility: builder.mutation({
      query: ({ reviewIds, visible }) => ({
        url: `/admin/reviews/toggle-visibility`,
        method: 'PUT',
        body: { reviewIds, visible }
      }),
      invalidatesTags: ['Reviews']
    })
  })
});

export const { useGetReviewsQuery, useToggleReviewsVisibilityMutation } =
  reviewsApi;
