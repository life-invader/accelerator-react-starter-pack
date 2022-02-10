import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { RootState } from '../../store/root-reducer';
import { initialState as guitarInitialState } from '../../store/guitars/guitars-reducer';
import { initialState as filtersInitialState } from '../../store/filters/filters-reducer';
import { initialState as paginationInitialState } from '../../store/pagination/pagination-reducer';
import { initialState as cartInitialState } from '../../store/cart/cart-reducer';
import Cart from './cart';

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

describe('Component: Cart', () => {
  it('should render Cart component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Промокод на скидку')).toBeInTheDocument();
    expect(screen.getByText('Введите свой промокод, если он у вас есть.')).toBeInTheDocument();
    expect(screen.getByText('Применить')).toBeInTheDocument();
  });
});
