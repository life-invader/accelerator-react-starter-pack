import { createMockGuitar } from '../../utils';
import { initialState } from '../guitars/guitars-reducer';
import { loadGuitars, loadDisplayedGuitars, loadSimilarGuitarsByName, loadFetchStatus, loadErrorStatus } from './actions';
import { guitarsReducer } from './guitars-reducer';

const mockGuitar = createMockGuitar();

describe('Guitars reducer', () => {
  it('Load guitars', () => {
    expect(guitarsReducer(initialState, loadGuitars([mockGuitar])))
      .toEqual({
        ...initialState,
        guitars: [mockGuitar],
      });
  });

  it('Load displayed guitars', () => {
    expect(guitarsReducer(initialState, loadDisplayedGuitars([mockGuitar])))
      .toEqual({
        ...initialState,
        displayedGuitars: [mockGuitar],
      });
  });

  it('Load similar guitars', () => {
    expect(guitarsReducer(initialState, loadSimilarGuitarsByName([mockGuitar])))
      .toEqual({
        ...initialState,
        similarGuitars: [mockGuitar],
      });
  });

  it('Load fetching status', () => {
    expect(guitarsReducer(initialState, loadFetchStatus(true)))
      .toEqual({
        ...initialState,
        isFetching: true,
      });
  });

  it('Load error status', () => {
    expect(guitarsReducer(initialState, loadErrorStatus(true)))
      .toEqual({
        ...initialState,
        isError: true,
      });
  });
});
