import { loadDisplayedGuitars, loadGuitars, loadSimilarGuitarsByName } from './guitars/actions';
import { ApiRoute } from '../constants/routes';
import { QueryParameters, EmbedParameters, ONE_PAGE_GUITAR_LIMIT } from '../constants/query-parameters';
import { loadTotalPages } from './pagination/actions';
import { ThunkActionResult } from './type';

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
      [QueryParameters.StringCount]: getState().filters.guitarStringsCount,
      [QueryParameters.Type]: getState().filters.guitarTypes,
      [QueryParameters.Order]: getState().filters.sortOrder || null,
      [QueryParameters.Sort]: getState().filters.sortType || null,
      [QueryParameters.PriceGte]: getState().filters.guitarPriceRange.priceMin || null,
      [QueryParameters.PriceLte]: getState().filters.guitarPriceRange.priceMax || null,
      _limit: ONE_PAGE_GUITAR_LIMIT,
      _start: ONE_PAGE_GUITAR_LIMIT * (getState().pagination.currentPage - 1),
    },
  };

  const response = await api.get(ApiRoute.Guitars(), apiParams);
  const totalGuitarPages = Math.round(response.headers['x-total-count'] / ONE_PAGE_GUITAR_LIMIT) || 1;

  dispatch(loadDisplayedGuitars(response.data));
  dispatch(loadTotalPages(totalGuitarPages));
};

export const fetchSimilarGuitarsByName = (guitarName: string): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  const response = await api.get(ApiRoute.Guitars(), {
    params: {
      [QueryParameters.Like]: guitarName,
    },
  });

  dispatch(loadSimilarGuitarsByName(response.data));
};

