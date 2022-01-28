import { createReducer } from '@reduxjs/toolkit';
import { IGuitar, IGuitarWithComments } from '../../types/guitar';
import { loadCurrentGuitar, loadCurrentGuitarErrorStatus, loadCurrentGuitarFetchStatus, loadDisplayedGuitars, loadErrorStatus, loadFetchStatus, loadGuitars, loadNewComment, loadNewCommentSuccessStatus, loadSimilarGuitarsByName } from './actions';

export type GuitarReducerType = {
  guitars: IGuitarWithComments[],
  currentGuitar: {
    data: IGuitarWithComments,
    isLoading: boolean,
    isError: boolean,
  },
  displayedGuitars: {
    data: IGuitarWithComments[],
    isLoading: boolean,
    isError: boolean,
  },
  similarGuitars: IGuitar[],
  isNewCommentSuccess: boolean | null,
}

export const initialState: GuitarReducerType = {
  guitars: [],
  currentGuitar: {
    data: {} as IGuitarWithComments,
    isLoading: false,
    isError: false,
  },
  displayedGuitars: {
    data: [],
    isLoading: false,
    isError: false,
  },
  similarGuitars: [],
  isNewCommentSuccess: null,
};

export const guitarsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(loadDisplayedGuitars, (state, action) => {
      state.displayedGuitars.data = action.payload.displayedGuitars;
      state.displayedGuitars.isLoading = false;
      state.displayedGuitars.isError = false;
    })
    .addCase(loadSimilarGuitarsByName, (state, action) => {
      state.similarGuitars = action.payload;
    })
    .addCase(loadCurrentGuitar, (state, action) => {
      state.currentGuitar.data = action.payload;
      state.currentGuitar.isLoading = false;
      state.currentGuitar.isError = false;
    })
    .addCase(loadCurrentGuitarFetchStatus, (state, action) => {
      state.currentGuitar.isLoading = action.payload;
      state.currentGuitar.isError = false;
    })
    .addCase(loadCurrentGuitarErrorStatus, (state, action) => {
      state.currentGuitar.isError = action.payload;
      state.currentGuitar.isLoading = false;
    })
    .addCase(loadFetchStatus, (state, action) => {
      state.displayedGuitars.isLoading = action.payload;
      state.displayedGuitars.isError = false;
    })
    .addCase(loadErrorStatus, (state, action) => {
      state.displayedGuitars.isError = action.payload;
      state.displayedGuitars.isLoading = false;
    })
    .addCase(loadNewComment, (state, action) => {
      state.currentGuitar?.data.comments?.push(action.payload);
      state.isNewCommentSuccess = true;
    })
    .addCase(loadNewCommentSuccessStatus, (state, action) => {
      state.isNewCommentSuccess = action.payload;
    });
});
