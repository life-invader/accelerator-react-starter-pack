import { combineReducers } from 'redux';
import { guitarsReducer } from './guitars/guitars-reducer';
import { filtersReducer } from './filters/filters-reducer';
import { paginationReducer } from './pagination/pagination-reducer';
import { cartReducer } from './cart/cart-reducer';

export const rootReducer = combineReducers({
  guitars: guitarsReducer,
  filters: filtersReducer,
  pagination: paginationReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
