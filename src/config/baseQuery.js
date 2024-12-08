import { removeAuth, updateToken } from '@/redux/slices/authSlice';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL_API,
  credentials: 'same-origin',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState()?.auth?.accessToken;
    // headers.set('ngrok-skip-browser-warning', 'true');
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      { url: '/refresh-token', method: 'POST' },
      api,
      extraOptions
    );
    const data = refreshResult?.data;
    if (data) {
      api.dispatch(
        updateToken({
          accessToken: data.results.accessToken
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(removeAuth());
    }
  }

  return result;
};

export default baseQueryWithReauth;
