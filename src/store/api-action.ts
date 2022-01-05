import { loadDisplayedGuitars, loadGuitars, loadSimilarGuitarsByName } from './guitars/actions';
import { ThunkActionResult } from './type';
import { ApiRoute, QueryParameters, EmbedParameters } from '../constants/const';
import { loadTotalPages } from './pagination/actions';

export const fetchGuitars = (): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  const apiParams = {
    params: {
      [QueryParameters.Embed]: EmbedParameters.Comments,
    },
  };

  const response = await api.get(ApiRoute.Guitars, apiParams);
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
      _limit: 9,
      _start: 9 * (getState().pagination.currentPage - 1),
    },
  };

  const response = await api.get(ApiRoute.Guitars, apiParams);
  const totalGuitarPages = Math.round(response.headers['x-total-count'] / 9) || 1;

  dispatch(loadDisplayedGuitars(response.data));
  dispatch(loadTotalPages(totalGuitarPages));
};

export const fetchSimilarGuitarsByName = (guitarName: string): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  const response = await api.get(ApiRoute.Guitars, {
    params: {
      'name_like': guitarName,
    },
  });

  dispatch(loadSimilarGuitarsByName(response.data));
};

