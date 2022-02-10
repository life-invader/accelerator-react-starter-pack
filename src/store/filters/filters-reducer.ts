import { createReducer } from '@reduxjs/toolkit';
import { SortingOrder, SortingType } from '../../types/filters';
import { GuitarType, StringsCountType } from '../../types/guitar';
import { loadGuitarPriceRange, loadGuitarStringsCount, loadGuitarTypes, loadSortOrder, loadSortType, removeGuitarStringsCount, removeGuitarTypes } from './actions';

type FiltersReducerType = {
  guitarPriceRange: { priceMin: number, priceMax: number },
  guitarTypes: GuitarType[],
  guitarStringsCounts: StringsCountType[],
  sortOrder: SortingOrder | null,
  sortType: SortingType | null,
}

export const initialState: FiltersReducerType = {
  guitarPriceRange: { priceMin: 0, priceMax: 0 },
  guitarTypes: [],
  guitarStringsCounts: [],
  sortOrder: null,
  sortType: null,
};

export const filtersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitarPriceRange, (state, action) => {
      state.guitarPriceRange = { ...state.guitarPriceRange, ...action.payload };
    })
    .addCase(loadGuitarTypes, (state, action) => {
      if (Array.isArray(action.payload)) {
        state.guitarTypes = action.payload;
        return;
      }
      state.guitarTypes.push(action.payload);
    })
    .addCase(removeGuitarTypes, (state, action) => {
      state.guitarTypes = state.guitarTypes.filter((type) => type !== action.payload);
    })
    .addCase(loadGuitarStringsCount, (state, action) => {
      if (Array.isArray(action.payload)) {
        state.guitarStringsCounts = action.payload;
        return;
      }
      state.guitarStringsCounts.push(action.payload);
    })
    .addCase(removeGuitarStringsCount, (state, action) => {
      state.guitarStringsCounts = state.guitarStringsCounts.filter((count) => count !== action.payload);
    })
    .addCase(loadSortOrder, (state, action) => {
      state.sortOrder = action.payload;
    })
    .addCase(loadSortType, (state, action) => {
      state.sortType = action.payload;
    });
});
