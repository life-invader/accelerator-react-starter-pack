import { initialState } from '../pagination/pagination-reducer';
import { loadCurrentPage, loadTotalPages } from './actions';
import { paginationReducer } from './pagination-reducer';

describe('Pagination reducer', () => {
  it('Load current page', () => {
    const currentPage = 1;

    expect(paginationReducer(initialState, loadCurrentPage(currentPage)))
      .toEqual({
        ...initialState,
        currentPage: currentPage,
      });
  });

  it('Load total pages', () => {
    const totalPages = 3;

    expect(paginationReducer(initialState, loadTotalPages(totalPages)))
      .toEqual({
        ...initialState,
        totalPages: totalPages,
      });
  });
});
