import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedIds: []
};

const selectorSlice = createSlice({
  name: 'selector',
  initialState,
  reducers: {
    addId: (state, action) => {
      state.selectedIds = [action.payload];
    },
    addIds: (state, action) => {
      state.selectedIds = [...new Set([...state.selectedIds, ...action.payload])];
    },
    clearIds: (state) => {
      state.selectedIds = [];
    }
  }
});

export const { addId, addIds, clearIds } = selectorSlice.actions;

export default selectorSlice.reducer;
