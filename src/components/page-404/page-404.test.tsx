import { render, screen } from '@testing-library/react';
import Page404 from './page-404';
import { BrowserRouter } from 'react-router-dom';

describe('Component: Page404', () => {
  it('should render Page404 component', () => {
    render(
      <BrowserRouter>
        <Page404 />
      </BrowserRouter>,
    );

    expect(screen.getByText('Вернуться на главную, которой нет')).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
