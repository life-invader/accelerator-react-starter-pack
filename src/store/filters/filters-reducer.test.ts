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
      guitarTypes: [guitarType, 'acoustic', 'electric'],
    };

    expect(filtersReducer(mockInitialState, removeGuitarTypes(guitarType)))
      .toEqual({
        ...mockInitialState,
        guitarTypes: ['acoustic', 'electric'],
      });
  });

  it('Load filters strings count', () => {
    const stringsCount = '4';

    expect(filtersReducer(initialState, loadGuitarStringsCount(stringsCount)))
      .toEqual({
        ...initialState,
        guitarStringsCount: [stringsCount],
      });
  });

  it('Remove filters strings count', () => {
    const stringsCount = '4';
    const mockInitialState = {
      ...initialState,
      guitarStringsCount: [stringsCount, '6', '12'],
    };

    expect(filtersReducer(mockInitialState, removeGuitarStringsCount(stringsCount)))
      .toEqual({
        ...mockInitialState,
        guitarStringsCount: ['6', '12'],
      });
  });

  it('Load filters sort type', () => {
    expect(filtersReducer(initialState, loadSortType('byPrice')))
      .toEqual({
        ...initialState,
        sortType: 'byPrice',
      });
  });

  it('Load filters sort order', () => {
    expect(filtersReducer(initialState, loadSortOrder('asc')))
      .toEqual({
        ...initialState,
        sortOrder: 'asc',
      });
  });
});
