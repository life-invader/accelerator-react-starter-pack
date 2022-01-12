import { render, screen } from '@testing-library/react';
import LoadingError from './loading-error';

describe('Component: LoadingError', () => {
  it('should render LoadingError component', () => {
    render(
      <LoadingError />,
    );

    expect(screen.getByText('Нет соединения с интернетом')).toBeInTheDocument();
  });
});
