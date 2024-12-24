import baseQueryWithReauth from '@/config/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => ({
        url: '/admin/dashboard'
      })
    })
  })
});

export const { useGetDashboardQuery } = dashboardApi;
