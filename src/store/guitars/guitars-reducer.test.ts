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
    const totalPages = 3;

    expect(guitarsReducer(initialState, loadDisplayedGuitars(mockGuitars, totalPages)))
      .toEqual({
        ...initialState,
        displayedGuitars: {
          data: mockGuitars,
          isLoading: false,
          isError: false,
        },
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
        displayedGuitars: {
          data: [],
          isLoading: true,
          isError: false,
        },
      });
  });

  it('Load error status', () => {
    expect(guitarsReducer(initialState, loadErrorStatus(true)))
      .toEqual({
        ...initialState,
        displayedGuitars: {
          data: [],
          isLoading: false,
          isError: true,
        },
      });
  });

  it('Load current guitar', () => {
    expect(guitarsReducer(initialState, loadCurrentGuitar(mockGuitar)))
      .toEqual({
        ...initialState,
        currentGuitar: {
          data: mockGuitar,
          isLoading: false,
          isError: false,
        },
      });
  });

  it('Load current guitar fetch status', () => {
    expect(guitarsReducer(initialState, loadCurrentGuitarFetchStatus(true)))
      .toEqual({
        ...initialState,
        currentGuitar: {
          data: {},
          isLoading: true,
          isError: false,
        },
      });
  });

  it('Load current guitar error status', () => {
    expect(guitarsReducer(initialState, loadCurrentGuitarErrorStatus(true)))
      .toEqual({
        ...initialState,
        currentGuitar: {
          data: {},
          isLoading: false,
          isError: true,
        },
      });
  });

  it('Load new comment', () => {
    const initialStore = {
      ...initialState,
      currentGuitar: {
        data: {
          ...mockGuitar,
          comments: [
            ...mockGuitar.comments],
        },
        isLoading: false,
        isError: false,
      },
    };

    expect(guitarsReducer(initialStore, loadNewComment(mockComment)))
      .toEqual({
        ...initialState,
        currentGuitar: {
          data: {
            ...mockGuitar,
            comments: [
              ...mockGuitar.comments,
              mockComment,
            ],
          },
          isLoading: false,
          isError: false,
        },
        isNewCommentSuccess: true,
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
