import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  breadcrumbs: []
};

const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState,
  reducers: {
    addBreadcrumb(state, action) {
      const breadcrumbExists = state.breadcrumbs.some(
        (breadcrumb) => breadcrumb.path === action.payload.path
      );
      if (!breadcrumbExists) {
        state.breadcrumbs.push(action.payload);
      }
    },
    resetBreadcrumbs(state) {
      state.breadcrumbs = [];
    }
  }
});

export const { addBreadcrumb, resetBreadcrumbs, setCurrentUser } =
  breadcrumbSlice.actions;
export const breadcrumbReducer = breadcrumbSlice.reducer;
