import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CatalogPage from '../catalog-page/catalog-page';
import AppLayout from './app-layout';
import { initialState as guitarInitialState } from '../../store/guitars/guitars-reducer';
import { initialState as filtersInitialState } from '../../store/filters/filters-reducer';
import { initialState as paginationInitialState } from '../../store/pagination/pagination-reducer';
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

describe('Component: AppLayout', () => {
  it('should render AppLayout component with children inside of it', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AppLayout >
            <CatalogPage />
          </AppLayout >
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
  });
});
