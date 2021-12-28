/* eslint-disable @typescript-eslint/no-unused-vars */
import { loadGuitars, loadSimilarGuitarsByName } from './guitars/actions';
import { ThunkActionResult } from './type';
import { ApiRoute, QueryParameters, SortType, EmbedParameters, SortOrder } from '../const';

type QueryParametersType = {
  [QueryParameters.Sort]?: typeof SortType.Price | typeof SortType.Rating,
  [QueryParameters.Order]?: typeof SortOrder.Ascending | typeof SortOrder.Descending,
}

export const fetchGuitars = (queryParameters?: any): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  const apiParams = {
    params: {
      [QueryParameters.Embed]: EmbedParameters.Comments,
      ...queryParameters,
    },
  };
  const response = await api.get(ApiRoute.Guitars, apiParams);

  dispatch(loadGuitars(response.data));
};

export const fetchSimilarGuitarsByName = (guitarName: string): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  const response = await api.get(ApiRoute.Guitars, {
    params: {
      'name_like': guitarName,
    },
  });

  dispatch(loadSimilarGuitarsByName(response.data));
};

