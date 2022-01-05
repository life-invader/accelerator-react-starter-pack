import { createReducer } from '@reduxjs/toolkit';
import { loadCurrentPage, loadTotalPages } from './actions';

type PaginationReducerType = {
  currentPage: number,
  totalPages: number,
}

const initialState: PaginationReducerType = {
  currentPage: 1,
  totalPages: 1,
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
