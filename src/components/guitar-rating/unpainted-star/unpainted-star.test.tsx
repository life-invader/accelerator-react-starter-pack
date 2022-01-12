import { render, screen } from '@testing-library/react';
import UnpaintedStar from './unpainted-star';

describe('Component: UnpaintedStar', () => {
  it('should render UnpaintedStar component', () => {
    render(
      <UnpaintedStar />,
    );

    expect(screen.getByTestId('unpainted-star')).toBeInTheDocument();
  });
});
