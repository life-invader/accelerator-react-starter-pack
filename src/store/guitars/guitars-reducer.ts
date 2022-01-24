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
    .addCase(loadDisplayedGuitars, (state, action) => {
      state.displayedGuitars = action.payload;
      state.isFetching = false;
    })
    .addCase(loadSimilarGuitarsByName, (state, action) => {
      state.similarGuitars = action.payload;
    })
    .addCase(loadCurrentGuitar, (state, action) => {
      state.currentGuitar = action.payload;
      state.isCurrentGuitarFetching = false;
    })
    .addCase(loadCurrentGuitarFetchStatus, (state, action) => {
      state.isCurrentGuitarFetching = action.payload;

      if (action.payload) {
        state.isCurrentGuitarError = false;
      }
    })
    .addCase(loadCurrentGuitarErrorStatus, (state, action) => {
      state.isCurrentGuitarError = action.payload;

      if (action.payload) {
        state.isCurrentGuitarFetching = false;
      }
    })
    .addCase(loadFetchStatus, (state, action) => {
      state.isFetching = action.payload;

      if (action.payload) {
        state.isError = false;
      }
    })
    .addCase(loadErrorStatus, (state, action) => {
      state.isError = action.payload;

      if (action.payload) {
        state.isFetching = false;
      }
    })
    .addCase(loadNewComment, (state, action) => {
      state.currentGuitar?.comments?.push(action.payload);
      state.isNewCommentSuccess = true;
    })
    .addCase(loadNewCommentSuccessStatus, (state, action) => {
      state.isNewCommentSuccess = action.payload;
    });
});
