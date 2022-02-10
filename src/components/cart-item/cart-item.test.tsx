import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RootState } from '../../store/root-reducer';
import { initialState as guitarInitialState } from '../../store/guitars/guitars-reducer';
import { initialState as filtersInitialState } from '../../store/filters/filters-reducer';
import { initialState as paginationInitialState } from '../../store/pagination/pagination-reducer';
import { initialState as cartInitialState } from '../../store/cart/cart-reducer';
import CartItem from './cart-item';
import { createMockGuitar } from '../../utils/common';

const mockGuitar = createMockGuitar();

const mockStore = configureMockStore<RootState>();
const store = mockStore({
  guitars: {
    ...guitarInitialState,
  },
  filters: {
    ...filtersInitialState,
  },
  pagination: {
    ...paginationInitialState,
  },
  cart: {
    ...cartInitialState,
  },
});

const cartItem = {
  item: mockGuitar,
  itemAmount: 5,
};

describe('Component: CartItem', () => {
  it('should render CartItem component', () => {
    render(
      <Provider store={store}>
        <CartItem cartItem={cartItem} />
      </Provider>,
    );

    expect(screen.getByText(/струнная/)).toBeInTheDocument();
  });
});
