import { IGuitar, IGuitarWithComments } from './types/guitar';

export const sortBySimilarName = (guitars: IGuitar[], similarName: string): IGuitar[] =>
  guitars.slice().sort(sortBySimilarNameCallback(similarName.toLocaleLowerCase()));

const sortBySimilarNameCallback = (similarName: string) => (firstGuitar: IGuitar, secondGuitar: IGuitar) => {
  const firstGuitarIndex = firstGuitar.name.toLocaleLowerCase()
    .indexOf(similarName.toLocaleLowerCase());

  const secondGuitarIndex = secondGuitar.name.toLocaleLowerCase()
    .indexOf(similarName.toLocaleLowerCase());
  return firstGuitarIndex - secondGuitarIndex;
};

export const createMockGuitar = (): IGuitarWithComments => ({
  id: 1,
  name: 'guitar name',
  vendorCode: '123',
  type: 'guitar type',
  description: 'description',
  previewImg: 'img_src',
  stringCount: 4,
  rating: 10,
  price: 999999,
  comments: [{
    id: '1',
    userName: 'user_name',
    advantage: 'advantages',
    disadvantage: 'disadvantages',
    comment: 'comment',
    rating: 10,
    createAt: 'create_at',
    guitarId: 1,
  }],
});
