import { createReducer } from '@reduxjs/toolkit';
import { MAX_ITEM_AMOUNT, MIN_ITEM_AMOUNT } from '../../constants/cart';
import { IGuitarWithComments } from '../../types/guitar';
import { addToCart, changeItemAmount, decreaseItemAmount, increaseItemAmount, loadDiscount, removeFromCart } from './actions';

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
  discount: number,
}

export const initialState: CartReducerType = {
  items: {},
  cartAmount: 0,
  totalPrice: 0,
  discount: 0,
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart, (state, action) => {
      const newItem = {
        item: action.payload,
        itemAmount: 1,
      };

      if (action.payload.id in state.items) {
        state.items[action.payload.id].itemAmount += 1;
      } else {
        state.items[action.payload.id] = newItem;
      }

      state.cartAmount = Object.values(state.items).reduce((accumulator, currentValue) => accumulator + currentValue.itemAmount, 0);
      state.totalPrice = Object.values(state.items).reduce((accumulator, currentValue) => accumulator + (currentValue.item.price * currentValue.itemAmount), 0);
    })
    .addCase(removeFromCart, (state, action) => {
      delete state.items[action.payload];

      state.cartAmount = Object.values(state.items).reduce((accumulator, currentValue) => accumulator + currentValue.itemAmount, 0);
      state.totalPrice = Object.values(state.items).reduce((accumulator, currentValue) => accumulator + (currentValue.item.price * currentValue.itemAmount), 0);
    })
    .addCase(increaseItemAmount, (state, action) => {
      state.items[action.payload].itemAmount += 1;

      if (state.items[action.payload].itemAmount > MAX_ITEM_AMOUNT) {
        state.items[action.payload].itemAmount = MAX_ITEM_AMOUNT;
      }

      state.cartAmount = Object.values(state.items).reduce((accumulator, currentValue) => accumulator + currentValue.itemAmount, 0);
      state.totalPrice = Object.values(state.items).reduce((accumulator, currentValue) => accumulator + (currentValue.item.price * currentValue.itemAmount), 0);
    })
    .addCase(decreaseItemAmount, (state, action) => {
      state.items[action.payload].itemAmount -= 1;

      if (state.items[action.payload].itemAmount < MIN_ITEM_AMOUNT) {
        delete state.items[action.payload];
      }

      state.cartAmount = Object.values(state.items).reduce((accumulator, currentValue) => accumulator + currentValue.itemAmount, 0);
      state.totalPrice = Object.values(state.items).reduce((accumulator, currentValue) => accumulator + (currentValue.item.price * currentValue.itemAmount), 0);
    })
    .addCase(changeItemAmount, (state, action) => {
      let newAmount = action.payload.newAmount;

      if (newAmount < MIN_ITEM_AMOUNT) {
        newAmount = MIN_ITEM_AMOUNT;
      }

      if (newAmount > MAX_ITEM_AMOUNT) {
        newAmount = MAX_ITEM_AMOUNT;
      }

      state.items[action.payload.id].itemAmount = newAmount;

      state.cartAmount = Object.values(state.items).reduce((accumulator, currentValue) => accumulator + currentValue.itemAmount, 0);
      state.totalPrice = Object.values(state.items).reduce((accumulator, currentValue) => accumulator + (currentValue.item.price * currentValue.itemAmount), 0);
    })
    .addCase(loadDiscount, (state, action) => {
      state.discount = action.payload;
    });
});
