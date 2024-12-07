import baseQueryWithReauth from '@/config/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: '/admin/books'
      }),
      providesTags: ['Books']
    }),
    updateBook: builder.mutation({
      query: ({
        id,
        name,
        width,
        height,
        authors,
        totalPages,
        description,
        price,
        originalPrice,
        stock,
        publishDate,
        publisher,
        coverType,
        categoryId,
        thumbnail,
        images
      }) => ({
        url: `/admin/books/${id}`,
        method: 'PUT',
        body: {
          name,
          width,
          height,
          authors,
          totalPages,
          description,
          price,
          originalPrice,
          stock,
          publishDate,
          publisher,
          coverType,
          categoryId,
          thumbnail,
          images
        }
      }),
      invalidatesTags: ['Books']
    }),
    addBook: builder.mutation({
      query: ({
        name,
        width,
        height,
        authors,
        totalPages,
        description,
        price,
        originalPrice,
        stock,
        publishDate,
        publisher,
        coverType,
        categoryId,
        thumbnail,
        images
      }) => ({
        url: '/admin/books',
        method: 'POST',
        body: {
          name,
          width,
          height,
          authors,
          totalPages,
          description,
          price,
          originalPrice,
          stock,
          publishDate,
          publisher,
          coverType,
          categoryId,
          thumbnail,
          images
        }
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
      query: ({ id }) => ({
        url: `admin/books/${id}`
      })
    })
  })
});

export const {
  useAddBookMutation,
  useToggleVisibilityBooksMutation,
  useGetBooksQuery,
  useUpdateBookMutation,
  useGetDetailBookQuery
} = booksApi;
