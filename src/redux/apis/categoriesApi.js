import baseQueryWithReauth from '@/config/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getFullCategories: builder.query({
      query: () => ({
        url: '/admin/categories'
      })
    }),
    createNewCategory: builder.mutation({
      query: ({ name }) => ({
        url: '/admin/categories',
        method: 'POST',
        body: { name }
      })
    })
  })
});

export const { useGetFullCategoriesQuery, useCreateNewCategoryMutation } = categoriesApi;
