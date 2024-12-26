import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  selectedBookIds: [], // Lưu trữ ID của các sách đã chọn
  addressId: null,
  voucherId: null,
  code: null // Code starts as null, and will be updated when available
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addBook: (state, action) => {
      const existingBook = state.books.find(
        (book) => book.id === action.payload.id
      );
      if (!existingBook) {
        state.books.push(action.payload);
      }
      if (!state.selectedBookIds.includes(action.payload.id)) {
        state.selectedBookIds.push(action.payload.id);
      }
    },
    removeBook: (state, action) => {
      state.selectedBookIds = state.selectedBookIds.filter(
        (id) => id !== action.payload.id
      );
      state.books = state.books.filter((book) => book.id !== action.payload.id);
    },
    addAllBooks: (state, action) => {
      state.books = action.payload;
      state.selectedBookIds = action.payload.map((book) => book.id);
    },
    removeAllBooks: (state) => {
      state.selectedBookIds = [];
    },
    setAddressAndVoucher: (state, action) => {
      const { addressId, voucherId, code } = action.payload;
      state.addressId = addressId;
      state.voucherId = voucherId;
      state.code = code;
    }
  }
});

export const {
  addBook,
  removeBook,
  addAllBooks,
  removeAllBooks,
  setAddressAndVoucher
} = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
