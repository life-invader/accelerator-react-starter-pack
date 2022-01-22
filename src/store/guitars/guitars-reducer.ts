import { createReducer } from '@reduxjs/toolkit';
import { IGuitar, IGuitarWithComments } from '../../types/guitar';
import { loadCurrentGuitar, loadCurrentGuitarErrorStatus, loadCurrentGuitarFetchStatus, loadDisplayedGuitars, loadErrorStatus, loadFetchStatus, loadGuitars, loadNewComment, loadNewCommentSuccessStatus, loadSimilarGuitarsByName } from './actions';

export type GuitarReducerType = {
  guitars: IGuitarWithComments[],
  currentGuitar: IGuitarWithComments,
  isCurrentGuitarFetching: boolean,
  isCurrentGuitarError: boolean,
  displayedGuitars: IGuitarWithComments[],
  similarGuitars: IGuitar[],
  isFetching: boolean,
  isError: boolean,
  isNewCommentSuccess: boolean | null,
  cart: number,
}

export const initialState: GuitarReducerType = {
  guitars: [],
  currentGuitar: {} as IGuitarWithComments,
  isCurrentGuitarFetching: false,
  isCurrentGuitarError: false,
  displayedGuitars: [],
  similarGuitars: [],
  isFetching: false,
  isError: false,
  isNewCommentSuccess: null,
  cart: 0,
};

export const guitarsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(loadCurrentGuitar, (state, action) => {
      state.currentGuitar = action.payload;
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
    })
    .addCase(loadNewCommentSuccessStatus, (state, action) => {
      state.isNewCommentSuccess = action.payload;
    })
    .addCase(loadNewComment, (state, action) => {
      state.currentGuitar?.comments?.push(action.payload);
    })
    .addCase(loadCurrentGuitarFetchStatus, (state, action) => {
      state.isCurrentGuitarFetching =  action.payload;
    })
    .addCase(loadCurrentGuitarErrorStatus, (state, action) => {
      state.isCurrentGuitarError =  action.payload;
    });
});
