import { RootState } from '../root-reducer';

export const selectSortType = (state: RootState) => state.filters.sortType;
export const selectSortOrder = (state: RootState) => state.filters.sortOrder;
