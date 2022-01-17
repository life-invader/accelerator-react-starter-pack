import { IGuitar } from './types/guitar';

export const sortBySimilarName = (guitars: IGuitar[], similarName: string): IGuitar[] =>
  guitars.slice().sort(sortBySimilarNameCallback(similarName.toLocaleLowerCase()));

const sortBySimilarNameCallback = (similarName: string) => (firstGuitar: IGuitar, secondGuitar: IGuitar) => {
  const firstGuitarIndex = firstGuitar.name.toLocaleLowerCase()
    .indexOf(similarName.toLocaleLowerCase());

  const secondGuitarIndex = secondGuitar.name.toLocaleLowerCase()
    .indexOf(similarName.toLocaleLowerCase());
  return firstGuitarIndex - secondGuitarIndex;
};
