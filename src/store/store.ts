import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';

import { api } from '../api/api';
import { saveCart } from '../middleware/save-cart';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(saveCart),
});

export type AppDispatch = typeof store.dispatch;
