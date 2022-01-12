import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import HeaderSearch from './header-search';
import { State } from '../../../store/type';
import { initialState as guitarsInitialState } from '../../../store/guitars/guitars-reducer';
import { initialState as filtersInitialState } from '../../../store/filters/filters-reducer';
import { initialState as paginationInitialState } from '../../../store/pagination/pagination-reducer';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore<State>();
const store = mockStore({
  guitars: {
    ...guitarsInitialState,
  },
  pagination: {
    ...paginationInitialState,
  },
  filters: {
    ...filtersInitialState,
  },
});
store.dispatch = jest.fn();

describe('Component: HeaderSearch', () => {
  it('renders HeaderSearch component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter >
          <HeaderSearch />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Начать поиск')).toBeInTheDocument();
  });

  it('should dispatch action after every typed symbol', () => {
    render(
      <Provider store={store}>
        <BrowserRouter >
          <HeaderSearch />
        </BrowserRouter>
      </Provider>,
    );

    const searchText = 'curt';

    const searchInput = screen.getByRole('textbox');
    userEvent.type(searchInput, searchText);

    expect(store.dispatch).toBeCalledTimes(searchText.length);
    expect(searchInput).toHaveFocus();
  });
});
