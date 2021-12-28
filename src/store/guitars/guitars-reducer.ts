import { createReducer } from '@reduxjs/toolkit';
import { loadGuitars, loadSimilarGuitarsByName } from './actions';
import { GuitarReducerType } from '../type';

const initialState: GuitarReducerType = {
  guitars: [],
  similarGuitars: [],
  cart: 0,
};

export const guitarsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(loadSimilarGuitarsByName, (state, action) => {
      state.similarGuitars = action.payload;
    });
});
