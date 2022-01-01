import { createAction } from '@reduxjs/toolkit';

export const loadGuitarPriceRange = createAction('Load-guitars-price-range', (priceRange: { priceMin?: number, priceMax?: number }) => ({
  payload: priceRange,
}));

export const loadGuitarTypes = createAction('Load-guitar-types', (guitarTypes: string | string[]) => ({
  payload: guitarTypes,
}));

export const removeGuitarTypes = createAction('Remove-guitar-types', (guitarTypes: string) => ({
  payload: guitarTypes,
}));

export const loadGuitarStringsCount = createAction('Load-guitar-strings-count', (stringsCount: string | string[]) => ({
  payload: stringsCount,
}));

export const removeGuitarStringsCount = createAction('Remove-guitar-strings-count', (stringsCount: string) => ({
  payload: stringsCount,
}));

export const loadSortType = createAction('Load-sort-type', (sortType: string) => ({
  payload: sortType,
}));

export const loadSortOrder = createAction('Load-sort-order', (sortOrder: string) => ({
  payload: sortOrder,
}));
