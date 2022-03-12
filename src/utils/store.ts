import { CartReducerType } from '../store/cart/cart-reducer';

export const recoverCart = (): CartReducerType | null => {
  try {
    const cart = window.localStorage.getItem('cart');

    if (cart === null) {
      return null;
    }

    return (JSON.parse(cart) as CartReducerType);
  }
  catch {
    return null;
  }
};
