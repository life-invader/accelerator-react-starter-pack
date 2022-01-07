import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../constants/action-types';
import { GuitarWithComments } from '../../types/guitar';

export const loadGuitars = createAction(ActionType.LoadGuitars, (guitars: GuitarWithComments[]) => ({
  payload: guitars,
}));

export const loadSimilarGuitarsByName = createAction(ActionType.LoadSimilarGuitars, (similarGuitars: GuitarWithComments[]) => ({
  payload: similarGuitars,
}));

export const loadDisplayedGuitars = createAction(ActionType.LoadDisplayedGuitars, (displayedGuitars: GuitarWithComments[]) => ({
  payload: displayedGuitars,
}));
