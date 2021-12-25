import { loadGuitars, loadSimilarGuitarsByName } from './action';
import { ThunkActionResult } from './type';
import { ApiRoute } from '../const';

export const fetchGuitars = (): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  const response = await api.get(ApiRoute.Guitars, {
    params: {
      _embed: 'comments',
    },
  });

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

