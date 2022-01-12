/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router as BrowserRouter } from 'react-router-dom';
import CatalogPage from './catalog-page';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/type';
import { initialState as guitarInitialState } from '../../store/guitars/guitars-reducer';
import { initialState as filtersInitialState } from '../../store/filters/filters-reducer';
import { initialState as paginationInitialState } from '../../store/pagination/pagination-reducer';
import userEvent from '@testing-library/user-event';
import { loadGuitarPriceRange } from '../../store/filters/actions';
import { api } from '../../api/api';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../constants/routes';

const history = createMemoryHistory();
const mockStore = configureMockStore<State>([thunk.withExtraArgument(api)]);
const store = mockStore({
  guitars: {
    ...guitarInitialState,
    guitars: [
      {
        id: 1,
        name: 'guitar name',
        vendorCode: '123',
        type: 'guitar type',
        description: 'description',
        previewImg: 'img_src',
        stringCount: 4,
        rating: 5,
        price: 2000,
        comments: [{
          id: '1',
          userName: 'user_name',
          advantages: 'advantages',
          disadvantages: 'disadvantages',
          comment: 'comment',
          rating: 10,
          createAt: 'create_at',
          guitarId: 1,
        }],
      },
      {
        id: 2,
        name: 'guitar name',
        vendorCode: '123',
        type: 'guitar type',
        description: 'description',
        previewImg: 'img_src',
        stringCount: 4,
        rating: 5,
        price: 20000,
        comments: [{
          id: '1',
          userName: 'user_name',
          advantages: 'advantages',
          disadvantages: 'disadvantages',
          comment: 'comment',
          rating: 10,
          createAt: 'create_at',
          guitarId: 1,
        }],
      },
    ],
  },
  filters: {
    ...filtersInitialState,
    // guitarPriceRange: { priceMin: 1800, priceMax: 35000 },
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
