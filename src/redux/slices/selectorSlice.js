import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  SelectedIds: []
};

const selectorSlice = createSlice({
  name: 'selector',
  initialState,
  reducers: {
    addId: (state, action) => {
      state.SelectedIds = [action.payload];
    },
    addIds: (state, action) => {
      state.SelectedIds = [...new Set([...state.SelectedIds, ...action.payload])];
    },
    clearIds: (state) => {
      state.SelectedIds = [];
    }
  }
});

export const { addId, addIds, clearIds } = selectorSlice.actions;

export default selectorSlice.reducer;
