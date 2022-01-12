import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CatalogList from './catalog-list';

const mockGuitar = {
  id: 1,
  name: 'guitar name',
  vendorCode: '123',
  type: 'guitar type',
  description: 'description',
  previewImg: 'img_src',
  stringCount: 4,
  rating: 5,
  price: 999999,
  comments: [{
    id: '1',
    userName: 'user_name',
    advantages: 'advantages',
    disadvantages: 'disadvantages',
    comment: 'comment',
    rating: 10,
    createAt: 'create_at',
    guitarId: 1,
  }],
};
const displayedGuitars = [mockGuitar];

describe('Component: CatalogList', () => {
  it('should render CatalogList component', () => {
    render(
      <BrowserRouter>
        <CatalogList displayedGuitars={displayedGuitars} />
      </BrowserRouter>,
    );

    expect(screen.getByText('Рейтинг:')).toBeInTheDocument();
    expect(screen.getByText('Цена:')).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
  });
});
