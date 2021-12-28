import { RootState } from '../root-reducer';

export const selectAllGuitars = (state: RootState) => state.guitars.guitars;
export const selectSimilarGuitars = (state: RootState) => state.guitars.similarGuitars;
export const selectCart = (state: RootState) => state.guitars.cart;
