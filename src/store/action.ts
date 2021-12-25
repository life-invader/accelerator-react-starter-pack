import { createAction } from '@reduxjs/toolkit';

export const loadGuitars = createAction('Load guitars', (guitars) => ({
  payload: guitars,
}));
