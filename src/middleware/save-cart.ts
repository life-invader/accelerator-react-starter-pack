import { Middleware } from 'redux';
import { ActionType } from '../constants/action-types';
import { RootState } from '../store/root-reducer';

const cartTypes = Object.values(ActionType).filter((item) => item.includes('cart'));

export const saveCart: Middleware<unknown, RootState> = (state) => (next) => (action) => {
  if (cartTypes.includes(action.type)) {
    const result = next(action);
    const cart = state.getState().cart;

    if (cart.cartAmount === 0) {
      window.localStorage.removeItem('cart');
      return result;
    }

    const cartStringified = JSON.stringify(cart);
    window.localStorage.setItem('cart', cartStringified);
    return result;
  }

  return next(action);
};
