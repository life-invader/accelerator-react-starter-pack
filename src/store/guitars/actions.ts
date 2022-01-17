import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../constants/action-types';
import { IGuitarWithComments } from '../../types/guitar';

export const loadGuitars = createAction(ActionType.LOAD_GUITARS, (guitars: IGuitarWithComments[]) => ({
  payload: guitars,
}));

export const loadFetchStatus = createAction(ActionType.LOAD_FETCH_STATUS, (fetchStatus: boolean) => ({
  payload: fetchStatus,
}));

export const loadErrorStatus = createAction(ActionType.LOAD_ERROR_STATUS, (errorStatus: boolean) => ({
  payload: errorStatus,
}));

export const loadSimilarGuitarsByName = createAction(ActionType.LOAD_SIMILAR_GUITARS, (similarGuitars: IGuitarWithComments[]) => ({
  payload: similarGuitars,
}));

export const loadDisplayedGuitars = createAction(ActionType.LOAD_DISPLAYED_GUITARS, (displayedGuitars: IGuitarWithComments[]) => ({
  payload: displayedGuitars,
}));
