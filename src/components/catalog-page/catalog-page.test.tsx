import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router as BrowserRouter } from 'react-router-dom';
import CatalogPage from './catalog-page';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/type';
import { initialState as guitarInitialState } from '../../store/guitars/guitars-reducer';
import { initialState as filtersInitialState } from '../../store/filters/filters-reducer';
import { initialState as paginationInitialState } from '../../store/pagination/pagination-reducer';
import { api } from '../../api/api';
import { createMemoryHistory } from 'history';
import { createMockGuitars } from '../../utils/common';

const mockGuitar = createMockGuitars();

const history = createMemoryHistory();
const mockStore = configureMockStore<State>([thunk.withExtraArgument(api)]);
const store = mockStore({
  guitars: {
    ...guitarInitialState,
    guitars: mockGuitar,
  },
  filters: {
    ...filtersInitialState,
  },
  pagination: {
    ...paginationInitialState,
  },
});

store.dispatch = jest.fn();

describe('Component: CatalogPage', () => {
  it('should render CatalogPage component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <CatalogPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
  });
});
