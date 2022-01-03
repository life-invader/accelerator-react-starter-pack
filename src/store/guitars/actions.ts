import { createAction } from '@reduxjs/toolkit';
import { GuitarWithComments } from '../type';

export const loadGuitars = createAction('Load-guitars', (guitars: GuitarWithComments[]) => ({
  payload: guitars,
}));

export const loadSimilarGuitarsByName = createAction('Load-simialr-guitars', (similarGuitars: GuitarWithComments[]) => ({
  payload: similarGuitars,
}));

export const loadDisplayedGuitars = createAction('Load-displayed-guitars', (displayedGuitars: GuitarWithComments[]) => ({
  payload: displayedGuitars,
}));
