import { SortType, SortOrder } from '../constants/query-parameters';

export type SortingType = typeof SortType[keyof typeof SortType];
export type SortingOrder = typeof SortOrder[keyof typeof SortOrder];
