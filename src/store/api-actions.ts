import { loadDisplayedGuitars, loadErrorStatus, loadFetchStatus, loadGuitars, loadSimilarGuitarsByName } from './guitars/actions';
import { ApiRoute } from '../constants/routes';
import { QueryParameters, EmbedParameters, ONE_PAGE_GUITAR_LIMIT } from '../constants/query-parameters';
import { loadTotalPages } from './pagination/actions';
import { ThunkActionResult } from './type';

const TOTAL_CATALOG_PAGES_MIN = 1;

export const fetchGuitars = (): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  const apiParams = {
    params: {
      [QueryParameters.Embed]: EmbedParameters.Comments,
    },
  };

  const response = await api.get(ApiRoute.Guitars(), apiParams);
  dispatch(loadGuitars(response.data));
};

export const fetchDisplayedGuitars = (): ThunkActionResult => async (dispatch, getState, api): Promise<void> => {
  const apiParams = {
    params: {
      [QueryParameters.Embed]: EmbedParameters.Comments,
      [QueryParameters.StringCount]: getState().filters.guitarStringsList,
      [QueryParameters.Type]: getState().filters.guitarTypes,
      [QueryParameters.Order]: getState().filters.sortOrder || null,
      [QueryParameters.Sort]: getState().filters.sortType || null,
      [QueryParameters.PriceGte]: getState().filters.guitarPriceRange.priceMin || null,
      [QueryParameters.PriceLte]: getState().filters.guitarPriceRange.priceMax || null,
      _limit: ONE_PAGE_GUITAR_LIMIT,
      _start: ONE_PAGE_GUITAR_LIMIT * (getState().pagination.currentPage - 1),
    },
  };

  try {
    dispatch(loadFetchStatus(true));

    const response = await api.get(ApiRoute.Guitars(), apiParams);

    // Если после округления будет 0, то подставится 1, как минимально возможное кол-во страниц в каталоге
    const totalCatalogPages = Math.round(response.headers['x-total-count'] / ONE_PAGE_GUITAR_LIMIT) || TOTAL_CATALOG_PAGES_MIN;

    dispatch(loadDisplayedGuitars(response.data));
    dispatch(loadTotalPages(totalCatalogPages));

    dispatch(loadFetchStatus(false));
  } catch {
    dispatch(loadFetchStatus(false));
    dispatch(loadErrorStatus(true));
  }
};

export const fetchSimilarGuitarsByName = (guitarName: string): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  const response = await api.get(ApiRoute.Guitars(), {
    params: {
      [QueryParameters.Like]: guitarName,
    },
  });

  dispatch(loadSimilarGuitarsByName(response.data));
};

