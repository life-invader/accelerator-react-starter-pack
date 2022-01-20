import { render, screen } from '@testing-library/react';
import PaintedStar from './painted-star';

describe('Component: PaintedStar', () => {
  it('should render PaintedStar component', () => {
    render(
      <PaintedStar />,
    );

    expect(screen.getByTestId('painted-star')).toBeInTheDocument();
  });
});
