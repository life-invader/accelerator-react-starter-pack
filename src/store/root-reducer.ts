import { createReducer } from '@reduxjs/toolkit';
import { loadGuitars, loadSimilarGuitarsByName } from './action';
import { RootState } from './type';

const initialState: RootState = {
  guitars: [],
  similarGuitars: [],
  cart: 0,
};

export const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(loadSimilarGuitarsByName, (state, action) => {
      state.similarGuitars = action.payload;
    });
});

export type RootReducerType = ReturnType<typeof rootReducer>;
