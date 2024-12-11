import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import storage from 'redux-persist/lib/storage';
import {
  authReducer,
  breadcrumbReducer,
  dialogReducer,
  selectorReducer,
  sidebarReducer
} from './slices';
import {
  authApi,
  booksApi,
  categoriesApi,
  cloudinaryApi,
  ordersApi,
  reviewsApi,
  usersApi,
  vouchersApi
} from './apis';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'userInfo']
};

const breadcrumbPersistConfig = {
  key: 'breadcrumb',
  storage,
  whitelist: ['breadcrumb']
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedBreadcrumbReducer = persistReducer(
  breadcrumbPersistConfig,
  breadcrumbReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    dialog: dialogReducer,
    selector: selectorReducer,
    breadcrumb: persistedBreadcrumbReducer,
    sidebar: sidebarReducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [vouchersApi.reducerPath]: vouchersApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [cloudinaryApi.reducerPath]: cloudinaryApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
      .concat(authApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(usersApi.middleware)
      .concat(reviewsApi.middleware)
      .concat(vouchersApi.middleware)
      .concat(ordersApi.middleware)
      .concat(booksApi.middleware)
      .concat(cloudinaryApi.middleware)
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);
