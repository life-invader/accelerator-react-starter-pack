import { createAction } from '@reduxjs/toolkit';
import { GuitarWithComments } from '../type';

export const loadGuitars = createAction('Load-guitars', (guitars: GuitarWithComments[]) => ({
  payload: guitars,
}));

export const loadSimilarGuitarsByName = createAction('Load-simialr-guitars-guitars', (similarGuitars: GuitarWithComments[]) => ({
  payload: similarGuitars,
}));
