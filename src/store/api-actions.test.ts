import AxiosMockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { api } from '../api/api';
import { ApiRoute } from '../constants/routes';
import { loadGuitars, loadDisplayedGuitars, loadSimilarGuitarsByName } from './guitars/actions';
import { State } from './type';
import { Action } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { fetchGuitars, fetchDisplayedGuitars, fetchSimilarGuitarsByName } from './api-actions';
import { loadTotalPages } from './pagination/actions';
import { initialState as filtersInitialState } from './filters/filters-reducer';
import { initialState as paginationInitialState } from './pagination/pagination-reducer';

const mockGuitar = {
  id: 1,
  name: 'guitar name',
  vendorCode: '123',
  type: 'guitar type',
  description: 'description',
  previewImg: 'img_src',
  stringCount: 4,
  rating: 10,
  price: 999999,
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
};

describe('Async actions', () => {
  const mockApi = new AxiosMockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middleware);

  it('Should fetch all guitars', async () => {
    const store = mockStore();
    mockApi
      .onGet(ApiRoute.Guitars())
      .reply(200, [mockGuitar]);

    await store.dispatch(fetchGuitars());

    expect(store.getActions()).toEqual([
      loadGuitars([mockGuitar]),
    ]);
  });

  it('Should fetch displayed guitars', async () => {
    const store = mockStore({
      pagination: {
        ...paginationInitialState,
      },
      filters: {
        ...filtersInitialState,
        guitarStringsList: ['2', '4'],
        guitarTypes: ['ukulele'],
      },
    });
    const totalPages = 1;
    const xTotalCount = 9;

    mockApi
      .onGet(ApiRoute.Guitars())
      .reply(200, [mockGuitar], { 'x-total-count': xTotalCount });

    await store.dispatch(fetchDisplayedGuitars());

    expect(store.getActions()).toEqual([
      loadDisplayedGuitars([mockGuitar]),
      loadTotalPages(totalPages),
    ]);
  });

  it('Should fetch similar guitars by name', async () => {
    const store = mockStore();
    const searchGuitarName = 'curt';

    mockApi
      .onGet(ApiRoute.Guitars())
      .reply(200, [mockGuitar]);

    await store.dispatch(fetchSimilarGuitarsByName(searchGuitarName));

    expect(store.getActions()).toEqual([
      loadSimilarGuitarsByName([mockGuitar]),
    ]);
  });
});

export { };
