import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../constants/action-types';

export const loadCurrentPage = createAction(ActionType.LoadCurrentPage, (currentPage: number) => ({
  payload: currentPage,
}));

export const loadTotalPages = createAction(ActionType.LoadTotalPages, (totalpages: number) => ({
  payload: totalpages,
}));
