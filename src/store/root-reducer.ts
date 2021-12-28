import { combineReducers } from 'redux';
import { guitarsReducer } from './guitars/guitars-reducer';
import { filtersReducer } from './filters/filters-reducer';

export const rootReducer = combineReducers({
  guitars: guitarsReducer,
  filters: filtersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
