import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../constants/action-types';
import { GuitarCommentType, IGuitarWithComments } from '../../types/guitar';

export const loadGuitars = createAction(ActionType.LOAD_GUITARS, (guitars: IGuitarWithComments[]) => ({
  payload: guitars,
}));

export const loadNewComment = createAction(ActionType.LOAD_NEW_COMMENT, (newComment: GuitarCommentType) => ({
  payload: newComment,
}));

export const loadNewCommentSuccessStatus = createAction(ActionType.LOAD_NEW_COMMENT_STATUS, (status: boolean | null) => ({
  payload: status,
}));

export const loadCurrentGuitarFetchStatus = createAction(ActionType.LOAD_CURRENT_GUITAR_FETCH_STATUS, (status: boolean) => ({
  payload: status,
}));

export const loadCurrentGuitarErrorStatus = createAction(ActionType.LOAD_CURRENT_GUITAR_ERROR_STATUS, (status: boolean) => ({
  payload: status,
}));

export const loadCurrentGuitar = createAction(ActionType.LOAD_CURRENT_GUITAR, (currentGuitar: IGuitarWithComments) => ({
  payload: currentGuitar,
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
