import baseQueryWithReauth from '@/config/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    getAdminBooks: builder.query({
      query: () => ({ url: '/admin/books' }),
      providesTags: ['Books']
    }),
    getUserBooks: builder.query({
      query: ({
        limit = 10,
        page = 0,
        sort = 'desc-createdAt',
        name = '',
        category = ''
      }) => {
        const params = {
          limit,
          page,
          sort
        };

        if (name) {
          params.name = name;
        }

        if (category) {
          params.category = category;
        }

        return {
          url: `/user/books/`,
          params
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
      query: ({ id }) => ({ url: `books/${id}` })
    })
  })
});

export const {
  useAddBookMutation,
  useToggleVisibilityBooksMutation,
  useGetAdminBooksQuery,
  useUpdateBookMutation,
  useGetDetailBookQuery,
  useGetUserBooksQuery
} = booksApi;
