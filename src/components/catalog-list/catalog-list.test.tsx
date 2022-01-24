import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createMockGuitars } from '../../utils/common';
import CatalogList from './catalog-list';

const displayedGuitars = createMockGuitars();

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
