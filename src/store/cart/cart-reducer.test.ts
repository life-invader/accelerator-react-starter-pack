import { createMockGuitar } from '../../utils/common';
import { addToCart, changeItemAmount, decreaseItemAmount, increaseItemAmount, loadDiscount, removeFromCart } from './actions';
import { cartReducer, initialState } from './cart-reducer';

const mockGuitar = createMockGuitar();

describe('Cart reducer', () => {
  it('Add items to cart', () => {
    expect(cartReducer(initialState, addToCart(mockGuitar)))
      .toEqual({
        ...initialState,
        items: {
          [mockGuitar.id]: {
            item: mockGuitar,
            itemAmount: 1,
          },
        },
        cartAmount: 1,
        totalPrice: mockGuitar.price,
      });
  });

  it('Remove item from cart', () => {
    const cartState = {
      items: {
        [mockGuitar.id]: {
          item: mockGuitar,
          itemAmount: 1,
        },
      },
      cartAmount: 1,
      totalPrice: mockGuitar.price,
      discount: 0,
    };

    expect(cartReducer(cartState, removeFromCart(mockGuitar.id)))
      .toEqual({
        ...initialState,
      });
  });

  it('Increase item amount by 1', () => {
    const cartState = {
      items: {
        [mockGuitar.id]: {
          item: mockGuitar,
          itemAmount: 1,
        },
      },
      cartAmount: 1,
      totalPrice: mockGuitar.price,
      discount: 0,
    };

    expect(cartReducer(cartState, increaseItemAmount(mockGuitar.id)))
      .toEqual({
        items: {
          [mockGuitar.id]: {
            item: mockGuitar,
            itemAmount: 2,
          },
        },
        cartAmount: 2,
        totalPrice: mockGuitar.price * 2,
        discount: 0,
      });
  });

  it('Decrease item amount by 1', () => {
    const cartState = {
      items: {
        [mockGuitar.id]: {
          item: mockGuitar,
          itemAmount: 2,
        },
      },
      cartAmount: 2,
      totalPrice: mockGuitar.price * 2,
      discount: 0,
    };

    expect(cartReducer(cartState, decreaseItemAmount(mockGuitar.id)))
      .toEqual({
        items: {
          [mockGuitar.id]: {
            item: mockGuitar,
            itemAmount: 1,
          },
        },
        cartAmount: 1,
        totalPrice: mockGuitar.price,
        discount: 0,
      });
  });

  it('Should change item amount when user types manually into the field', () => {
    const cartState = {
      items: {
        [mockGuitar.id]: {
          item: mockGuitar,
          itemAmount: 2,
        },
      },
      cartAmount: 2,
      totalPrice: mockGuitar.price * 2,
      discount: 0,
    };

    const payload = {
      id: mockGuitar.id,
      newAmount: 5,
    };

    expect(cartReducer(cartState, changeItemAmount(payload)))
      .toEqual({
        items: {
          [mockGuitar.id]: {
            item: mockGuitar,
            itemAmount: payload.newAmount,
          },
        },
        cartAmount: payload.newAmount,
        totalPrice: mockGuitar.price * payload.newAmount,
        discount: 0,
      });
  });

  it('Load discount', () => {
    const discount = 15;

    expect(cartReducer(initialState, loadDiscount(discount)))
      .toEqual({
        ...initialState,
        discount: discount,
      });
  });
});
