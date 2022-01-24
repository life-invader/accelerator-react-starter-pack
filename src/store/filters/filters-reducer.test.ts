import { SortOrder, SortType } from '../../constants/query-parameters';
import { GuitarType, StringsCountType } from '../../types/guitar';
import { loadGuitarPriceRange, loadGuitarStringsCount, loadGuitarTypes, loadSortOrder, loadSortType, removeGuitarStringsCount, removeGuitarTypes } from './actions';
import { filtersReducer, initialState } from './filters-reducer';

describe('Filter reducer', () => {
  it('Load filters price range', () => {
    const filterPrices = { priceMin: 1, priceMax: 1 };

    expect(filtersReducer(initialState, loadGuitarPriceRange(filterPrices)))
      .toEqual({
        ...initialState,
        guitarPriceRange: filterPrices,
      });
  });

  it('Load filters guitar types', () => {
    const guitarType = 'ukulele';

    expect(filtersReducer(initialState, loadGuitarTypes(guitarType)))
      .toEqual({
        ...initialState,
        guitarTypes: [...initialState.guitarTypes, guitarType],
      });
  });

  it('Remove filters guitar types', () => {
    const guitarType = 'ukulele';
    const mockInitialState = {
      ...initialState,
      guitarTypes: [guitarType, 'acoustic', 'electric'] as GuitarType[],
    };

    expect(filtersReducer(mockInitialState, removeGuitarTypes(guitarType)))
      .toEqual({
        ...mockInitialState,
        guitarTypes: ['acoustic', 'electric'],
      });
  });

  it('Load filters strings count', () => {
    const stringsCount = 4;

    expect(filtersReducer(initialState, loadGuitarStringsCount(stringsCount)))
      .toEqual({
        ...initialState,
        guitarStringsCounts: [stringsCount],
      });
  });

  it('Remove filters strings count', () => {
    const stringsCount = 4;
    const mockInitialState = {
      ...initialState,
      guitarStringsCounts: [stringsCount, 6, 12] as StringsCountType[],
    };

    expect(filtersReducer(mockInitialState, removeGuitarStringsCount(stringsCount)))
      .toEqual({
        ...mockInitialState,
        guitarStringsCounts: [6, 12],
      });
  });

  it('Load filters sort type', () => {
    expect(filtersReducer(initialState, loadSortType(SortType.Price)))
      .toEqual({
        ...initialState,
        sortType: SortType.Price,
      });
  });

  it('Load filters sort order', () => {
    expect(filtersReducer(initialState, loadSortOrder(SortOrder.Ascending)))
      .toEqual({
        ...initialState,
        sortOrder: SortOrder.Ascending,
      });
  });
});
