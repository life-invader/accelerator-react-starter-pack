import { combineReducers } from 'redux';
import { guitarsReducer } from './guitars/guitars-reducer';
import { filtersReducer } from './filters/filters-reducer';
import { paginationReducer } from './pagination/pagination-reducer';

export const rootReducer = combineReducers({
  guitars: guitarsReducer,
  filters: filtersReducer,
  pagination: paginationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
