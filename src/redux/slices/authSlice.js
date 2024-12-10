import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  userInfo: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addAuth: (state, { payload }) => {
      const { accessToken, userInfo } = payload || {};
      state.accessToken = accessToken;
      state.userInfo = userInfo;
    },
    removeAuth: (state) => {
      state.accessToken = null;
      state.userInfo = null;
    },
    updateToken: (state, { payload }) => {
      const { accessToken } = payload || {};
      state.accessToken = accessToken;
    }
  }
});

export const { addAuth, removeAuth, updateToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
