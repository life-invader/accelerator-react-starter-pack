import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../constants/action-types';
import { IGuitarWithComments } from '../../types/guitar';

export const addToCart = createAction(ActionType.ADD_TO_CART, (newItem: IGuitarWithComments) => ({
  payload: newItem,
}));

export const removeFromCart = createAction(ActionType.REMOVE_FROM_CART, (itemId: number) => ({
  payload: itemId,
}));

export const increaseItemAmount = createAction(ActionType.INCREASE_ITEM_AMOUNT, (id: number) => ({
  payload: id,
}));

export const decreaseItemAmount = createAction(ActionType.DECREASE_ITEM_AMOUNT, (id: number) => ({
  payload: id,
}));

export const changeItemAmount = createAction(ActionType.CHANGE_ITEM_AMOUNT, (data: { newAmount: number, id: number }) => ({
  payload: data,
}));
