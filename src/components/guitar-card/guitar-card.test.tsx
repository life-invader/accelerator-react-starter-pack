import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GuitarCard from './guitar-card';

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

describe('Component: GuitarCard', () => {
  it('should render GuitarCard component', () => {
    render(
      <BrowserRouter>
        <GuitarCard {...mockGuitar} />
      </BrowserRouter>,
    );

    expect(screen.getByText('Цена:')).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
    expect(screen.getByText('Купить')).toBeInTheDocument();
  });
});
