import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../constants/action-types';

export const loadCurrentPage = createAction(ActionType.LOAD_CURRENT_PAGE, (currentPage: number) => ({
  payload: currentPage,
}));

export const loadTotalPages = createAction(ActionType.LOAD_TOTAL_PAGES, (totalpages: number) => ({
  payload: totalpages,
}));
