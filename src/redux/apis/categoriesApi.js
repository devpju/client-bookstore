import baseQueryWithReauth from '@/config/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: '/admin/categories'
      }),
      providesTags: ['Categories']
    }),
    getUserCategories: builder.query({
      query: () => ({
        url: '/user/categories'
      }),
      providesTags: ['Categories']
    }),
    addCategory: builder.mutation({
      query: ({ name }) => ({
        url: '/admin/categories',
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: ['Categories']
    }),
    updateCategory: builder.mutation({
      query: ({ id, name }) => ({
        url: `/admin/categories/${id}`,
        method: 'PUT',
        body: { name }
      }),
      invalidatesTags: ['Categories']
    }),
    toggleVisibilityCategories: builder.mutation({
      query: ({ categoryIds, visible }) => ({
        url: '/admin/categories/toggle-visibility',
        method: 'PUT',
        body: { categoryIds, visible }
      }),
      invalidatesTags: ['Categories']
    })
  })
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useToggleVisibilityCategoriesMutation,
  useGetUserCategoriesQuery
} = categoriesApi;
