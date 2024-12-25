import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  category: '',
  sort: 'createdAt-desc',
  limit: 12,
  page: 1
};

const filtersSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.name = action.payload.name || state.name;
      state.category = action.payload.category || state.category;
      state.sort = action.payload.sort || state.sort;
      state.limit = action.payload.limit || state.limit;
      state.page = action.payload.page || state.page;
    }
  }
});

export const { setFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
