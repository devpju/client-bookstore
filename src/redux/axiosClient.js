import axios from 'axios';
import { store } from './store.js';
import { removeAuth, setToken } from './slices/authSlice.js';
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
});
axiosClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state?.auth?.token?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra nếu token hết hạn
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const state = store.getState();
      const refreshToken = state?.auth?.token?.refreshToken;

      if (!refreshToken) {
        store.dispatch(removeAuth());
        return Promise.reject(error);
      }

      try {
        const res = await axiosClient.post('/refresh-token', {
          refreshToken
        });

        const { accessToken, refreshToken } = res.data;

        store.dispatch(setToken({ accessToken, refreshToken }));

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axiosClient(originalRequest);
      } catch (refreshError) {
        store.dispatch(removeAuth());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
