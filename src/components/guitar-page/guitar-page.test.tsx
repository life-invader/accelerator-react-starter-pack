import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { initialState as guitarInitialState } from '../../store/guitars/guitars-reducer';
import { initialState as filtersInitialState } from '../../store/filters/filters-reducer';
import { initialState as paginationInitialState } from '../../store/pagination/pagination-reducer';
import GuitarPage from './guitar-page';
import { RootState } from '../../store/root-reducer';

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
});

store.dispatch = jest.fn();

describe('Component: GuitarPage', () => {
  it('should render GuitarPage component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <GuitarPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
  });
});
