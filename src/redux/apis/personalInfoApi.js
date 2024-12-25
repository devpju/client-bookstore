import baseQueryWithReauth from '@/config/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const personalInfoApi = createApi({
  reducerPath: 'personalInfoApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getInfo: builder.query({
      query: () => ({
        url: 'user/profile'
      })
    }),
    updateInfo: builder.mutation({
      query: (info) => ({
        url: `user/profile`,
        method: 'PUT',
        body: { ...info }
      })
    }),
    changePassword: builder.mutation({
      query: ({ currentPassword, password, logoutAllDevices = false }) => ({
        url: `/user/password`,
        method: 'PUT',
        body: { currentPassword, password, logoutAll: logoutAllDevices }
      })
    })
  })
});

export const {
  useGetInfoQuery,
  useUpdateInfoMutation,
  useChangePasswordMutation
} = personalInfoApi;
