import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedIds: []
};

const selectorSlice = createSlice({
  name: 'selector',
  initialState,
  reducers: {
    addId: (state, action) => {
      state.selectedIds = [];
      state.selectedIds = [action.payload.toString()];
    },
    addIds: (state, action) => {
      state.selectedIds = [];
      state.selectedIds = [...new Set([...action.payload])];
    },
    clearIds: (state) => {
      state.selectedIds = [];
    }
  }
});

export const { addId, addIds, clearIds } = selectorSlice.actions;

export const selectorReducer = selectorSlice.reducer;
