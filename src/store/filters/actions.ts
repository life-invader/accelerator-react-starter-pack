import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../constants/action-types';
import { SortingOrder, SortingType } from '../../types/filters';
import { GuitarType, StringsCountType } from '../../types/guitar';
export const loadGuitarPriceRange = createAction(ActionType.LOAD_PRICE_RANGE, (priceRange: { priceMin?: number, priceMax?: number }) => ({
  payload: priceRange,
}));

export const loadGuitarTypes = createAction(ActionType.LOAD_GUITAR_TYPES, (guitarTypes: GuitarType | GuitarType[]) => ({
  payload: guitarTypes,
}));

export const removeGuitarTypes = createAction(ActionType.REMOVE_GUITAR_TYPES, (guitarTypes: string) => ({
  payload: guitarTypes,
}));

export const loadGuitarStringsCount = createAction(ActionType.LOAD_GUITAR_STRINGS_COUNT, (stringsCount: StringsCountType | StringsCountType[]) => ({
  payload: stringsCount,
}));

export const removeGuitarStringsCount = createAction(ActionType.REMOVE_GUITAR_STRINGS_COUNT, (stringsCount: StringsCountType) => ({
  payload: stringsCount,
}));

export const loadSortType = createAction(ActionType.LOAD_SORT_TYPE, (sortType: SortingType) => ({
  payload: sortType,
}));

export const loadSortOrder = createAction(ActionType.LOAD_SORT_ORDER, (sortOrder: SortingOrder) => ({
  payload: sortOrder,
}));
