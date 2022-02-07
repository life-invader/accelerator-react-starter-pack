import { RootState } from '../root-reducer';
import { ICartItem } from './cart-reducer';

export const selectCartAmount = (state: RootState) => state.cart.cartAmount;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectCartItems = (state: RootState) => Object.values(state.cart.items);
export const selectIsInCart = (id: number) => (state: RootState) => Object.values(state.cart.items).some((product: ICartItem) => product.item.id === id);
export const selectDiscount = (state: RootState) => state.cart.discount;
