import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './slices/authSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer
    // Add the generated reducer to your root reducer
    // [pokemonApi.reducerPath]: pokemonApi.reducer,
  }
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware)
});

setupListeners(store.dispatch);
