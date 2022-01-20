import AxiosMockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { api } from '../api/api';
import { ApiRoute } from '../constants/routes';
import { loadGuitars, loadDisplayedGuitars, loadSimilarGuitarsByName, loadFetchStatus } from './guitars/actions';
import { State } from './type';
import { Action } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { fetchGuitars, fetchDisplayedGuitars, fetchSimilarGuitarsByName } from './api-actions';
import { loadTotalPages } from './pagination/actions';
import { initialState as filtersInitialState } from './filters/filters-reducer';
import { initialState as paginationInitialState } from './pagination/pagination-reducer';
import { createMockGuitar } from '../utils/common';

const mockGuitar = createMockGuitar();

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
      loadFetchStatus(true),
      loadDisplayedGuitars([mockGuitar]),
      loadTotalPages(totalPages),
      loadFetchStatus(false),
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
