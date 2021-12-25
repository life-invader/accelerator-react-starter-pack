import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { RootReducerType } from './root-reducer';
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

export type RootState = {
  guitars: GuitarWithComments[],
  similarGuitars: Guitar[],
  cart: number,
}

export type State = RootReducerType;
export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
