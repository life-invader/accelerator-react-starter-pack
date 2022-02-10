import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RootState } from '../../store/root-reducer';
import { initialState as guitarInitialState } from '../../store/guitars/guitars-reducer';
import { initialState as filtersInitialState } from '../../store/filters/filters-reducer';
import { initialState as paginationInitialState } from '../../store/pagination/pagination-reducer';
import { initialState as cartInitialState } from '../../store/cart/cart-reducer';
import { createMockGuitar } from '../../utils/common';
import ModalAddToCart from './modal-add-to-cart';

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

const onAddToCartModalOpen = jest.fn();
const onAddedToCartModalOpen = jest.fn();

describe('Component: ModalAddToCart', () => {
  it('should render ModalAddToCart component', () => {
    render(
      <Provider store={store}>
        <ModalAddToCart guitar={mockGuitar} onAddToCartModalOpen={onAddToCartModalOpen} onAddedToCartModalOpen={onAddedToCartModalOpen} />
      </Provider>,
    );

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
  });
});
