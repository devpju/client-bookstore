import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: localStorage.getItem('accessToken') || null,
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || null
};

const localStorageHandler = {
  save: ({ accessToken, userInfo }) => {
    try {
      accessToken && localStorage.setItem('accessToken', accessToken);
      userInfo && localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (error) {
      console.error('Failed to save auth data to localStorage:', error);
    }
  },
  clear: () => {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userInfo');
    } catch (error) {
      console.error('Failed to clear auth data from localStorage:', error);
    }
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addAuth: (state, { payload }) => {
      const { accessToken, userInfo } = payload || {};
      if (!accessToken || !userInfo) {
        console.warn('Invalid payload for addAuth:', payload);
        return;
      }
      state.accessToken = accessToken;
      state.userInfo = userInfo;
      localStorageHandler.save({ accessToken, userInfo });
    },
    removeAuth: (state) => {
      state.accessToken = null;
      state.userInfo = null;
      localStorageHandler.clear();
    },
    updateToken: (state, { payload }) => {
      const { accessToken } = payload || {};
      if (!accessToken) {
        console.warn('Invalid payload for updateToken:', payload);
        return;
      }
      state.accessToken = accessToken;
      localStorageHandler.save({ accessToken });
    }
  }
});

export const { addAuth, removeAuth, updateToken } = authSlice.actions;
export default authSlice.reducer;
