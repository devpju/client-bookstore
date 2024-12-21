import baseQueryWithReauth from '@/config/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({ url: '/admin/books' }),
      providesTags: ['Books']
    }),
    getUserBooks: builder.query({
      query: ({ limit = 10, page = 1, sort = '', filters = {} }) => {
        const filterString = JSON.stringify(filters);
        return {
          url: `/user/books/`,
          params: {
            limit,
            page,
            sort,
            filters: filterString
          }
        };
      },
      providesTags: ['Books']
    }),
    updateBook: builder.mutation({
      query: (book) => ({
        url: `/admin/books/${book.id}`,
        method: 'PUT',
        body: book
      }),
      invalidatesTags: ['Books']
    }),
    addBook: builder.mutation({
      query: (book) => ({
        url: '/admin/books',
        method: 'POST',
        body: book
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
    }),
    getDetailBook: builder.query({
      query: ({ id }) => ({ url: `admin/books/${id}` })
    })
  })
});

export const {
  useAddBookMutation,
  useToggleVisibilityBooksMutation,
  useGetBooksQuery,
  useUpdateBookMutation,
  useGetDetailBookQuery,
  useGetUserBooksQuery
} = booksApi;
