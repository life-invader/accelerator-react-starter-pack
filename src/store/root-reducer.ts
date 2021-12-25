import { createReducer } from '@reduxjs/toolkit';
import { loadGuitars } from './action';
import { RootState } from './type';

const initialState: RootState = {
  guitars: [],
};

export const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    });
});

export type RootReducerType = ReturnType<typeof rootReducer>;
