import baseQueryWithReauth from '@/config/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    fetchCategories: builder.query({
      query: () => ({
        url: '/admin/categories'
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
    editCategory: builder.mutation({
      query: ({ id, name, isDeleted }) => ({
        url: `/admin/categories/${id}`,
        method: 'PUT',
        body: { name, isDeleted }
      }),
      invalidatesTags: ['Categories']
    }),
    removeCategories: builder.mutation({
      query: ({ categoryIds }) => ({
        url: '/admin/categories',
        method: 'DELETE',
        body: { categoryIds }
      }),
      invalidatesTags: ['Categories']
    })
  })
});

export const {
  useFetchCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useRemoveCategoriesMutation
} = categoriesApi;
