import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  authReducer,
  dialogReducer,
  selectorReducer,
  sidebarReducer
} from './slices';
import {
  authApi,
  booksApi,
  categoriesApi,
  ordersApi,
  reviewsApi,
  usersApi,
  vouchersApi
} from './apis';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dialog: dialogReducer,
    selector: selectorReducer,
    sidebar: sidebarReducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [vouchersApi.reducerPath]: vouchersApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(usersApi.middleware)
      .concat(reviewsApi.middleware)
      .concat(vouchersApi.middleware)
      .concat(ordersApi.middleware)
      .concat(booksApi.middleware)
});

setupListeners(store.dispatch);
