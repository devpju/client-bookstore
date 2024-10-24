import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken')
  },
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addAuth: (state, action) => {
      state.token.accessToken = action.payload.token.accessToken;
      state.token.refreshToken = action.payload.token.refreshToken;
      state.user = action.payload.user;

      localStorage.setItem('accessToken', action.payload.token.accessToken);
      localStorage.setItem('refreshToken', action.payload.token.refreshToken);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },

    removeAuth: (state) => {
      state.token.accessToken = null;
      state.token.refreshToken = null;
      state.user = null;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },

    setToken: (state, action) => {
      state.token.accessToken = action.payload.token.accessToken;
      state.token.refreshToken = action.payload.token.refreshToken;

      localStorage.setItem('accessToken', action.payload.token.accessToken);
      localStorage.setItem('refreshToken', action.payload.token.refreshToken);
    }
  }
});

export const { addAuth, removeAuth, setToken } = authSlice.actions;

export default authSlice.reducer;
