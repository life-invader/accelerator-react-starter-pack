import { createAction } from '@reduxjs/toolkit';

export const loadCurrentPage = createAction('Load-current-page', (currentPage: number) => ({
  payload: currentPage,
}));

export const loadTotalPages = createAction('Load-total-pages', (totalpages: number) => ({
  payload: totalpages,
}));
