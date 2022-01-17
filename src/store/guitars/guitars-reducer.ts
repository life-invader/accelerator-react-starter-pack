import { createReducer } from '@reduxjs/toolkit';
import { IGuitar, IGuitarWithComments } from '../../types/guitar';
import { loadDisplayedGuitars, loadErrorStatus, loadFetchStatus, loadGuitars, loadSimilarGuitarsByName } from './actions';

export type GuitarReducerType = {
  guitars: IGuitarWithComments[],
  displayedGuitars: IGuitarWithComments[],
  similarGuitars: IGuitar[],
  isFetching: boolean,
  isError: boolean,
  cart: number,
}

export const initialState: GuitarReducerType = {
  guitars: [],
  displayedGuitars: [],
  similarGuitars: [],
  isFetching: false,
  isError: false,
  cart: 0,
};

export const guitarsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(loadDisplayedGuitars, (state, action) => {
      state.displayedGuitars = action.payload;
    })
    .addCase(loadSimilarGuitarsByName, (state, action) => {
      state.similarGuitars = action.payload;
    })
    .addCase(loadFetchStatus, (state, action) => {
      state.isFetching = action.payload;
    })
    .addCase(loadErrorStatus, (state, action) => {
      state.isError = action.payload;
    });
});
