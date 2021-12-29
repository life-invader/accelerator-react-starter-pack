import { createReducer } from '@reduxjs/toolkit';
import { loadGuitarPriceRange, loadGuitarStringsCount, loadGuitarTypes, loadSortOrder, loadSortType, removeGuitarStringsCount, removeGuitarTypes } from './actions';

type FiltersReducerType = {
  guitarPriceRange: { priceMin: number, priceMax: number },
  guitarTypes: string[],
  guitarStringsCount: string[],
  sortOrder: string,
  sortType: string,
}

const initialState: FiltersReducerType = {
  guitarPriceRange: { priceMin: 0, priceMax: 0 },
  guitarTypes: [],
  guitarStringsCount: [],
  sortOrder: '',
  sortType: '',
};

export const filtersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitarPriceRange, (state, action) => {
      state.guitarPriceRange = { ...state.guitarPriceRange, ...action.payload };
    })
    .addCase(loadGuitarTypes, (state, action) => {
      state.guitarTypes.push(action.payload);
    })
    .addCase(removeGuitarTypes, (state, action) => {
      state.guitarTypes = state.guitarTypes.filter((type) => type !== action.payload);
    })
    .addCase(loadGuitarStringsCount, (state, action) => {
      state.guitarStringsCount.push(action.payload[0]);
    })
    .addCase(removeGuitarStringsCount, (state, action) => {
      state.guitarStringsCount = state.guitarStringsCount.filter((count) => count !== action.payload);
    })
    .addCase(loadSortOrder, (state, action) => {
      state.sortOrder = action.payload;
    })
    .addCase(loadSortType, (state, action) => {
      state.sortType = action.payload;
    });
});

export type RootReducerType = ReturnType<typeof filtersReducer>;
