import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from './app';
import { State } from '../../store/type';
import { AppRoute } from '../../constants/routes';
import { initialState as guitarInitialState } from '../../store/guitars/guitars-reducer';
import { initialState as filtersInitialState } from '../../store/filters/filters-reducer';
import { initialState as paginationInitialState } from '../../store/pagination/pagination-reducer';

const history = createMemoryHistory();
const mockStore = configureMockStore<State>();
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

describe('Component: App', () => {
  it('should redirect to catalog when user navigate to "/"', () => {
    history.push(AppRoute.getMainRoute());

    render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <App />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
  });

  it('should render catalog when user navigate to "/catalog/page_1"', () => {
    history.push(AppRoute.getCatalogRoute(1));

    render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <App />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
  });

  it('should render 404 component when user navigate to non-existent route', () => {
    const nonExistentRoute = 'some-non-existent-route';
    history.push(nonExistentRoute);

    render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <App />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
