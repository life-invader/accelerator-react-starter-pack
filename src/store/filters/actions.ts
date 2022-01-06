import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../constants/action-types';

export const loadGuitarPriceRange = createAction(ActionType.LoadPriceRange, (priceRange: { priceMin?: number, priceMax?: number }) => ({
  payload: priceRange,
}));

export const loadGuitarTypes = createAction(ActionType.LoadGuitarTypes, (guitarTypes: string | string[]) => ({
  payload: guitarTypes,
}));

export const removeGuitarTypes = createAction(ActionType.RemoveGuitarTypes, (guitarTypes: string) => ({
  payload: guitarTypes,
}));

export const loadGuitarStringsCount = createAction(ActionType.LoadGuitarStringsCount, (stringsCount: string | string[]) => ({
  payload: stringsCount,
}));

export const removeGuitarStringsCount = createAction(ActionType.RemoveGuitarStringsCount, (stringsCount: string) => ({
  payload: stringsCount,
}));

export const loadSortType = createAction(ActionType.LoadSortType, (sortType: string) => ({
  payload: sortType,
}));

export const loadSortOrder = createAction(ActionType.LoadSortOrder, (sortOrder: string) => ({
  payload: sortOrder,
}));
