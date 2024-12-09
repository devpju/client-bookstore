import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDialogOpen: false,
  dialogData: null,
  triggeredBy: null
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (state, action) => {
      state.isDialogOpen = true;
      state.dialogData = action.payload?.data || null;
      state.triggeredBy = action.payload?.triggeredBy || null;
    },
    closeDialog: (state) => {
      state.isDialogOpen = false;
      state.dialogData = null;
      state.triggeredBy = null;
    }
  }
});

export const { openDialog, closeDialog } = dialogSlice.actions;

export const dialogReducer = dialogSlice.reducer;
