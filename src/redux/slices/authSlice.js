import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken')
  },
  user: localStorage.getItem('user')
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addAuth: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', action.payload.user);
    },

    removeAuth: (state) => {
      state.token = null;
      state.user = null;
    }
  }
});

export const { addAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
