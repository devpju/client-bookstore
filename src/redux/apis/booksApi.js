import baseQueryWithReauth from '@/config/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: '/books'
      }),
      providesTags: ['Books']
    }),
    addBook: builder.mutation({
      query: ({ name }) => ({
        url: '/admin/books',
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: ['Books']
    }),
    updateBook: builder.mutation({
      query: ({ id, name }) => ({
        url: `/admin/books/${id}`,
        method: 'PUT',
        body: { name }
      }),
      invalidatesTags: ['Books']
    }),
    toggleVisibilityBooks: builder.mutation({
      query: ({ bookIds, visible }) => ({
        url: '/admin/books/toggle-visibility',
        method: 'PUT',
        body: { bookIds, visible }
      }),
      invalidatesTags: ['Books']
    })
  })
});

export const {
  useAddBookMutation,
  useToggleVisibilityBooksMutation,
  useGetBooksQuery,
  useUpdateBookMutation
} = booksApi;
