import baseQueryWithReauth from '@/config/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: '/admin/users'
      }),
      providesTags: ['Users']
    }),
    getDetailUser: builder.query({
      query: ({ id }) => ({
        url: `/admin/users/${id}`
      })
    }),
    updateUserRoles: builder.mutation({
      query: ({ id, roles }) => ({
        url: `/admin/users/${id}`,
        method: 'PUT',
        body: { roles }
      }),
      invalidatesTags: ['Users']
    }),
    toggleBanUsers: builder.mutation({
      query: ({ userIds, banned }) => ({
        url: `/admin/users/toggle-ban`,
        method: 'PUT',
        body: { userIds, banned }
      }),
      invalidatesTags: ['Users']
    })
  })
});

export const {
  useGetUsersQuery,
  useGetDetailUserQuery,
  useUpdateUserRolesMutation,
  useToggleBanUsersMutation
} = usersApi;
