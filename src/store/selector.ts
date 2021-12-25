import { RootState } from './type';

export const selectAllGuitars = (state: RootState) => state.guitars;
export const selectSimilarGuitars = (state: RootState) => state.similarGuitars;
export const selectCart = (state: RootState) => state.cart;
