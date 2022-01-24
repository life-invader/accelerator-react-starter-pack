import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createMockGuitar } from '../../utils/common';
import GuitarPageTabs from './guitar-page-tabs';

const mockGuitar = createMockGuitar();

describe('Component: GuitarPageTabs', () => {
  it('should render GuitarPageTabs component', () => {
    render(
      <BrowserRouter>
        <GuitarPageTabs currentGuitar={mockGuitar} />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('tabs')).toBeInTheDocument();
  });
});
