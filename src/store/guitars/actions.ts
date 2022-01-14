import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../constants/action-types';
import { GuitarWithComments } from '../../types/guitar';

export const loadGuitars = createAction(ActionType.LOAD_GUITARS, (guitars: GuitarWithComments[]) => ({
  payload: guitars,
}));

export const loadSimilarGuitarsByName = createAction(ActionType.LOAD_SIMILAR_GUITARS, (similarGuitars: GuitarWithComments[]) => ({
  payload: similarGuitars,
}));

export const loadDisplayedGuitars = createAction(ActionType.LOAD_DISPLAYED_GUITARS, (displayedGuitars: GuitarWithComments[]) => ({
  payload: displayedGuitars,
}));
