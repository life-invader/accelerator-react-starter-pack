import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RootState } from '../../store/root-reducer';
import { createMockGuitar } from '../../utils/common';
import GuitarCard from './guitar-card';
import { initialState as guitarInitialState } from '../../store/guitars/guitars-reducer';
import { initialState as filtersInitialState } from '../../store/filters/filters-reducer';
import { initialState as paginationInitialState } from '../../store/pagination/pagination-reducer';
import { initialState as cartInitialState } from '../../store/cart/cart-reducer';
import { Provider } from 'react-redux';

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

describe('Component: GuitarCard', () => {
  it('should render GuitarCard component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <GuitarCard guitar={mockGuitar} />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Цена:')).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
    expect(screen.getByText('Купить')).toBeInTheDocument();
  });
});
