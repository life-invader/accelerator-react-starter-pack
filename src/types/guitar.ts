import { STRINGS_COUNTS, GuitarTypeValue } from '../constants/guitars';

export type GuitarType = typeof GuitarTypeValue[keyof typeof GuitarTypeValue];
export type StringsCountType = typeof STRINGS_COUNTS[number];

export type GuitarCommentType = {
  id: string,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: number,
}

export type GuitarCommentPostType = {
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  guitarId: number,
}

export interface IGuitar {
  id: number,
  name: string,
  vendorCode: string,
  type: GuitarType,
  description: string,
  previewImg: string,
  stringCount: StringsCountType,
  rating: number,
  price: number
}

export interface IGuitarWithComments extends IGuitar {
  comments: GuitarCommentType[],
}
