import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { RootState } from './root-reducer';
import { Action } from 'redux';

export type GuitarComment = {
  id: string,
  userName: string,
  advantages: string,
  disadvantages: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: number
}

export type Guitar = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number
}

export type GuitarWithComments = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number,
  comments: GuitarComment[],
}

export type GuitarReducerType = {
  guitars: GuitarWithComments[],
  displayedGuitars: GuitarWithComments[],
  similarGuitars: Guitar[],
  cart: number,
}

export type State = RootState;
export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
