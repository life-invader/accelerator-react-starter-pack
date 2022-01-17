import { initialState } from '../guitars/guitars-reducer';
import { loadGuitars, loadDisplayedGuitars, loadSimilarGuitarsByName, loadFetchStatus, loadErrorStatus } from './actions';
import { guitarsReducer } from './guitars-reducer';

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
