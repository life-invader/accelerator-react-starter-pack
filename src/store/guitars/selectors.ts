import { createSelector } from 'reselect';
import { STRINGS_COUNTS } from '../../constants/guitars';
import { RootState } from '../root-reducer';

export const selectAllGuitars = (state: RootState) => state.guitars.guitars;
export const selectDisplayedGuitars = (state: RootState) => state.guitars.displayedGuitars.data;
export const selectCurrentGuitar = (state: RootState) => state.guitars.currentGuitar.data;
export const selectSimilarGuitars = (state: RootState) => state.guitars.similarGuitars;
export const selectFetchStatus = (state: RootState) => state.guitars.displayedGuitars.isLoading;
export const selectErrorStatus = (state: RootState) => state.guitars.displayedGuitars.isError;
export const selectNewCommentStatus = (state: RootState) => state.guitars.isNewCommentSuccess;
export const selectCurrentGuitarFetchingStatus = (state: RootState) => state.guitars.currentGuitar.isLoading;
export const selectCurrentGuitarErrorStatus = (state: RootState) => state.guitars.currentGuitar.isError;

export const selectPriceRangePlaceholders = createSelector(selectAllGuitars, (state) => state, (guitars, _state) => {
  if (!guitars.length) { return { priceMin: 0, priceMax: 0 }; }

  const guitarsSortedByPriceAsc = guitars.slice().sort((guitarA, guitarB) => guitarA.price - guitarB.price);
  const priceMin = guitarsSortedByPriceAsc[0]?.price;

  const guitarsSortedByPriceDesc = guitars.slice().sort((guitarA, guitarB) => guitarA.price - guitarB.price);
  const priceMax = guitarsSortedByPriceDesc[guitarsSortedByPriceDesc.length - 1]?.price;

  return ({
    priceMin,
    priceMax,
  });
});

export const selectAvailableStringsCount = createSelector(selectAllGuitars, (state) => state.filters.guitarTypes, (guitars, guitarTypes) => {
  if (!guitarTypes.length) {
    return STRINGS_COUNTS;
  }

  const guitarsFiltered = guitars.filter((guitar) => guitarTypes.includes(guitar.type));
  const availableStringsCount = [...new Set(guitarsFiltered.map((guitar) => guitar.stringCount))];

  return availableStringsCount;
});
