import { createMockComment, createMockGuitar, createMockGuitars } from '../../utils/common';
import { initialState } from '../guitars/guitars-reducer';
import { loadGuitars, loadDisplayedGuitars, loadSimilarGuitarsByName, loadFetchStatus, loadErrorStatus, loadCurrentGuitar, loadCurrentGuitarFetchStatus, loadCurrentGuitarErrorStatus, loadNewComment, loadNewCommentSuccessStatus } from './actions';
import { guitarsReducer } from './guitars-reducer';

const mockGuitar = createMockGuitar();
const mockGuitars = createMockGuitars();
const mockComment = createMockComment();

describe('Guitars reducer', () => {
  it('Load guitars', () => {
    expect(guitarsReducer(initialState, loadGuitars(mockGuitars)))
      .toEqual({
        ...initialState,
        guitars: mockGuitars,
      });
  });

  it('Load displayed guitars', () => {
    expect(guitarsReducer(initialState, loadDisplayedGuitars(mockGuitars)))
      .toEqual({
        ...initialState,
        displayedGuitars: mockGuitars,
      });
  });

  it('Load similar guitars', () => {
    expect(guitarsReducer(initialState, loadSimilarGuitarsByName(mockGuitars)))
      .toEqual({
        ...initialState,
        similarGuitars: mockGuitars,
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

  it('Load current guitar', () => {
    expect(guitarsReducer(initialState, loadCurrentGuitar(mockGuitar)))
      .toEqual({
        ...initialState,
        currentGuitar: mockGuitar,
      });
  });

  it('Load current guitar fetch status', () => {
    expect(guitarsReducer(initialState, loadCurrentGuitarFetchStatus(true)))
      .toEqual({
        ...initialState,
        isCurrentGuitarFetching: true,
      });
  });

  it('Load current guitar error status', () => {
    expect(guitarsReducer(initialState, loadCurrentGuitarErrorStatus(true)))
      .toEqual({
        ...initialState,
        isCurrentGuitarError: true,
      });
  });

  it('Load new comment', () => {
    const initialStore = {
      ...initialState,
      currentGuitar: mockGuitar,
    };

    expect(guitarsReducer(initialStore, loadNewComment(mockComment)))
      .toEqual({
        ...initialState,
        currentGuitar: {
          ...mockGuitar,
          comments: [
            ...mockGuitar.comments,
            mockComment,
          ],
        },
      });
  });

  it('Load new comment status', () => {
    expect(guitarsReducer(initialState, loadNewCommentSuccessStatus(true)))
      .toEqual({
        ...initialState,
        isNewCommentSuccess: true,
      });
  });
});
