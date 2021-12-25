import { createAction } from '@reduxjs/toolkit';

export const loadGuitars = createAction('Load-guitars', (guitars) => ({
  payload: guitars,
}));

export const loadSimilarGuitarsByName = createAction('Load-simialr-guitars-guitars', (similarGuitars) => ({
  payload: similarGuitars,
}));
