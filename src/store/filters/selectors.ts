import { RootState } from '../root-reducer';

export const selectSortType = (state: RootState) => state.filters.sortType;
export const selectSortOrder = (state: RootState) => state.filters.sortOrder;
export const selectPriceRange = (state: RootState) => state.filters.guitarPriceRange;
export const selectGuitarsStringsCount = (state: RootState) => state.filters.guitarStringsCount;
export const selectGuitarTypes = (state: RootState) => state.filters.guitarTypes;
