import AxiosMockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { api } from '../api/api';
import { ApiRoute } from '../constants/routes';
import { createMockComment, createMockGuitars, createNewUserCommentMock } from '../utils/common';
import { loadGuitars, loadDisplayedGuitars, loadSimilarGuitarsByName, loadFetchStatus, loadCurrentGuitarFetchStatus, loadCurrentGuitar, loadNewCommentSuccessStatus, loadNewComment } from './guitars/actions';
import { State } from './type';
import { Action } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { fetchGuitars, fetchDisplayedGuitars, fetchSimilarGuitarsByName, fetchCurrentGuitar, sendNewComment } from './api-actions';
import { loadTotalPages } from './pagination/actions';
import { initialState as guitarsInitialState } from './guitars/guitars-reducer';
import { initialState as filtersInitialState } from './filters/filters-reducer';
import { initialState as paginationInitialState } from './pagination/pagination-reducer';
import { createMockGuitar } from '../utils/common';
import { GuitarType, StringsCountType } from '../types/guitar';

const mockGuitar = createMockGuitar();
const mockGuitars = createMockGuitars();
const mockComment = createMockComment();
const newMockUserComment = createNewUserCommentMock();

describe('Async actions', () => {
  const mockApi = new AxiosMockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middleware);

  it('Should fetch all guitars', async () => {
    const store = mockStore();
    mockApi
      .onGet(ApiRoute.Guitars())
      .reply(200, mockGuitars);

    await store.dispatch(fetchGuitars());

    expect(store.getActions()).toEqual([
      loadGuitars(mockGuitars),
    ]);
  });

  it('Should fetch displayed guitars', async () => {
    const guitarStringsList: StringsCountType[] = [6, 4];
    const guitarTypes: GuitarType[] = ['ukulele'];

    const totalPages = 1;
    const xTotalCount = 9;

    const store = mockStore({
      pagination: {
        ...paginationInitialState,
      },
      filters: {
        ...filtersInitialState,
        guitarStringsCounts: guitarStringsList,
        guitarTypes,
      },
    });

    mockApi
      .onGet(ApiRoute.Guitars())
      .reply(200, mockGuitars, { 'x-total-count': xTotalCount });

    await store.dispatch(fetchDisplayedGuitars());

    expect(store.getActions()).toEqual([
      loadFetchStatus(true),
      loadDisplayedGuitars(mockGuitars),
      loadTotalPages(totalPages),
    ]);
  });

  it('Should fetch similar guitars by name', async () => {
    const store = mockStore();
    const searchGuitarName = 'curt';

    mockApi
      .onGet(ApiRoute.Guitars())
      .reply(200, mockGuitars);

    await store.dispatch(fetchSimilarGuitarsByName(searchGuitarName));

    expect(store.getActions()).toEqual([
      loadSimilarGuitarsByName(mockGuitars),
    ]);
  });

  it('Should fetch current guitar', async () => {
    const store = mockStore({
      guitars: {
        ...guitarsInitialState,
      },
    });

    const guitarId = 1;

    mockApi
      .onGet(ApiRoute.Guitars(guitarId))
      .reply(200, mockGuitar);

    await store.dispatch(fetchCurrentGuitar(guitarId));

    expect(store.getActions()).toEqual([
      loadCurrentGuitarFetchStatus(true),
      loadCurrentGuitar(mockGuitar),
    ]);
  });

  it('Should send new comment', async () => {
    const store = mockStore({
      guitars: {
        ...guitarsInitialState,
      },
    });

    mockApi
      .onPost(ApiRoute.Comments())
      .reply(200, mockComment);

    await store.dispatch(sendNewComment(newMockUserComment));

    expect(store.getActions()).toEqual([
      loadNewCommentSuccessStatus(null),
      loadNewComment(mockComment),
    ]);
  });
});
