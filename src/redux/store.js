import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './slices/authSlice';
import dialogReducer from './slices/dialogSlice';
import selectorReducer from './slices/selectorSlice';
import { authApi } from './apis/authApi';
import { categoriesApi } from './apis/categoriesApi';
import { usersApi } from './apis/usersApi';
import { reviewsApi } from './apis/reviewsApi';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    dialog: dialogReducer,
    selector: selectorReducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(usersApi.middleware)
      .concat(reviewsApi.middleware)
});

setupListeners(store.dispatch);
