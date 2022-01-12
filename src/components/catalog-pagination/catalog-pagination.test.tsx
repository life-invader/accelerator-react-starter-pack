import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CatalogPagination from './catalog-pagination';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/type';
import { initialState as paginationInitialState } from '../../store/pagination/pagination-reducer';

const mockStore = configureMockStore<State>();
const store = mockStore({
  pagination: {
    ...paginationInitialState,
  },
});

describe('Component: CatalogPagination', () => {
  it('should render CatalogPagination component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CatalogPagination />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
