import baseQueryWithReauth from '@/config/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => ({
        url: '/admin/users'
      }),
      providesTags: ['Users']
    }),
    editUserRoles: builder.mutation({
      query: ({ id, roles }) => ({
        url: `/admin/users/${id}`,
        method: 'PUT',
        body: { roles }
      }),
      invalidatesTags: ['Users']
    }),
    fetchDetailUser: builder.query({
      query: ({ id }) => ({
        url: `/admin/users/${id}`
      })
    }),
    removeUsers: builder.mutation({
      query: ({ userIds }) => ({
        url: '/admin/users',
        method: 'DELETE',
        body: { userIds }
      }),
      invalidatesTags: ['Users']
    })
  })
});

export const {
  useFetchUsersQuery,
  useEditUserRolesMutation,
  useRemoveUsersMutation,
  useFetchDetailUserQuery
} = usersApi;
