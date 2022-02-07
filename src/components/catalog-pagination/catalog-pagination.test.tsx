import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CatalogPagination from './catalog-pagination';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { initialState as paginationInitialState } from '../../store/pagination/pagination-reducer';
import { RootState } from '../../store/root-reducer';

const mockStore = configureMockStore<RootState>();
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
