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
    }),
    createReview: builder.mutation({
      query: (review) => ({
        url: `/user/reviews`,
        method: 'POST',
        body: { ...review }
      }),
      invalidatesTags: ['Reviews']
    }),
    getReviewsByBookId: builder.query({
      query: (bookId) => ({
        url: `/reviews`,
        params: {
          bookId
        }
      }),
      providesTags: ['Reviews']
    })
  })
});

export const {
  useGetReviewsQuery,
  useToggleReviewsVisibilityMutation,
  useGetReviewsByBookIdQuery,
  useCreateReviewMutation
} = reviewsApi;
