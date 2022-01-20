import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createMockGuitar } from '../../utils/common';
import CatalogList from './catalog-list';

const mockGuitar = createMockGuitar();
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
