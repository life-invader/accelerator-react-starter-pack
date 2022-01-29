import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { GuitarCommentPostType, GuitarCommentType, IGuitar, IGuitarWithComments } from '../types/guitar';

dayjs.locale('ru');

export const sortBySimilarName = (guitars: IGuitar[], similarName: string): IGuitar[] =>
  guitars.slice().sort(sortBySimilarNameCallback(similarName.toLocaleLowerCase()));

const sortBySimilarNameCallback = (similarName: string) => (firstGuitar: IGuitar, secondGuitar: IGuitar) => {
  const firstGuitarIndex = firstGuitar.name.toLocaleLowerCase()
    .indexOf(similarName.toLocaleLowerCase());

  const secondGuitarIndex = secondGuitar.name.toLocaleLowerCase()
    .indexOf(similarName.toLocaleLowerCase());
  return firstGuitarIndex - secondGuitarIndex;
};

export const createNewUserCommentMock = (): GuitarCommentPostType => ({
  userName: 'user_name',
  advantage: 'advantages',
  disadvantage: 'disadvantages',
  comment: 'comment',
  rating: 10,
  guitarId: 1,
});

export const createMockComment = (): GuitarCommentType => ({
  id: '1',
  userName: 'user_name',
  advantage: 'advantages',
  disadvantage: 'disadvantages',
  comment: 'comment',
  rating: 5,
  createAt: 'create_at',
  guitarId: 1,
});

export const createMockComments = (commentsNumber = 1) => {
  const comments = [] as GuitarCommentType[];

  for (let i = 0; i < commentsNumber; i++) {
    comments.push(createMockComment());
  }

  return comments;
};

export const createMockGuitar = (): IGuitarWithComments => ({
  id: 1,
  name: 'guitar name',
  vendorCode: '123',
  type: 'ukulele',
  description: 'description',
  previewImg: 'img_src',
  stringCount: 4,
  rating: 5,
  price: 999999,
  comments: createMockComments(),
});


export const createMockGuitars = (commentsNumber = 1) => {
  const guitars = [] as IGuitarWithComments[];

  for (let i = 0; i < commentsNumber; i++) {
    guitars.push(createMockGuitar());
  }

  return guitars;
};

export const formatCommentDate = (date: string) => dayjs(date).format('D MMMM');
export const formatGuitarPrice = (price: number) => new Intl.NumberFormat('ru-RU').format(price);
