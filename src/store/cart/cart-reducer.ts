import { createReducer } from '@reduxjs/toolkit';
import { IGuitarWithComments } from '../../types/guitar';
import { addToCart, changeItemAmount, decreaseItemAmount, increaseItemAmount, removeFromCart } from './actions';

export interface ICartItem {
  item: IGuitarWithComments,
  itemAmount: number,
}

type CartItemsType = {
  [x: number]: ICartItem,
}

export type CartReducerType = {
  items: CartItemsType,
  cartAmount: number,
  totalPrice: number,
}

export const initialState: CartReducerType = {
  items: {},
  cartAmount: 0,
  totalPrice: 0,
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart, (state, action) => {
      const newItem = {
        item: action.payload,
        itemAmount: 1,
      };
      state.items[action.payload.id] = state.items[action.payload.id] ? { ...state.items[action.payload.id], itemAmount: state.items[action.payload.id].itemAmount + 1 } : newItem;

      state.cartAmount = Object.values(state.items).reduce((accumulator, currentValue) => accumulator + currentValue.itemAmount, 0);
      state.totalPrice = Object.values(state.items).reduce((accumulator, currentValue) => accumulator + (currentValue.item.price * currentValue.itemAmount), 0);
    })
    .addCase(removeFromCart, (state, action) => {
      delete state.items[action.payload];

      state.cartAmount = Object.values(state.items).reduce((accumulator, currentValue) => accumulator + currentValue.itemAmount, 0);
      state.totalPrice = Object.values(state.items).reduce((accumulator, currentValue) => accumulator + (currentValue.item.price * currentValue.itemAmount), 0);
    })
    .addCase(increaseItemAmount, (state, action) => {
      state.items[action.payload].itemAmount = state.items[action.payload].itemAmount + 1;

      state.cartAmount = Object.values(state.items).reduce((accumulator, currentValue) => accumulator + currentValue.itemAmount, 0);
      state.totalPrice = Object.values(state.items).reduce((accumulator, currentValue) => accumulator + (currentValue.item.price * currentValue.itemAmount), 0);
    })
    .addCase(decreaseItemAmount, (state, action) => {
      state.items[action.payload].itemAmount = state.items[action.payload].itemAmount - 1;


      if (state.items[action.payload].itemAmount <= 0) {
        delete state.items[action.payload];
      }

      state.cartAmount = Object.values(state.items).reduce((accumulator, currentValue) => accumulator + currentValue.itemAmount, 0);
      state.totalPrice = Object.values(state.items).reduce((accumulator, currentValue) => accumulator + (currentValue.item.price * currentValue.itemAmount), 0);
    })
    .addCase(changeItemAmount, (state, action) => {
      let newAmount = action.payload.newAmount;

      if (action.payload.newAmount <= 0) {
        newAmount = 1;
      }

      state.items[action.payload.id].itemAmount = newAmount;

      state.cartAmount = Object.values(state.items).reduce((accumulator, currentValue) => accumulator + currentValue.itemAmount, 0);
      state.totalPrice = Object.values(state.items).reduce((accumulator, currentValue) => accumulator + (currentValue.item.price * currentValue.itemAmount), 0);
    });
});
