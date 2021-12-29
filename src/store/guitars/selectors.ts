import { createSelector } from 'reselect';
import { getPriceRange } from '../../components/catalog-page/catalog-page';
import { RootState } from '../root-reducer';

export const selectAllGuitars = (state: RootState) => state.guitars.guitars;
export const selectSimilarGuitars = (state: RootState) => state.guitars.similarGuitars;
export const selectCart = (state: RootState) => state.guitars.cart;

export const selectPriceRangePlaceholders = createSelector(selectAllGuitars, (state) => state, (guitars, _state) => {
  if (!guitars.length) { return { priceMin: 0, priceMax: 0 }; }

  const priceRange = getPriceRange(guitars);
  return priceRange;
});
