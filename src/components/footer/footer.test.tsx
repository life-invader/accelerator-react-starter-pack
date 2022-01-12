import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render Footer component', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Магазин гитар, музыкальных инструментов и гитарная мастерская/)).toBeInTheDocument();
  });
});
