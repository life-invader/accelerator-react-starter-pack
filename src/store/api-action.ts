import { loadGuitars } from './action';
import { ThunkActionResult } from './type';

export const fetchGuitars = (): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  const response = await api.get('/guitars', {
    params: {
      _embed: 'comments',
    },
  });

  dispatch(loadGuitars(response.data));
};
