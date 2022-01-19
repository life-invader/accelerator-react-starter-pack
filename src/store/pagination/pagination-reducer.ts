import { createReducer } from '@reduxjs/toolkit';
import { loadCurrentPage, loadTotalPages } from './actions';

type PaginationReducerType = {
  currentPage: number,
  totalPages: number | null,
}

export const initialState: PaginationReducerType = {
  currentPage: 1,
  totalPages: null,
};

export const paginationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadCurrentPage, (state, action) => {
      state.currentPage = action.payload;
    })
    .addCase(loadTotalPages, (state, action) => {
      state.totalPages = action.payload;
    });
});
