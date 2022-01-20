import { render, screen } from '@testing-library/react';
import Rating from './rating';

describe('Component: GuitarRating', () => {
  it('should render GuitarRating component with all unpainted stars', () => {
    const rating = 0;
    render(
      <Rating rating={rating} />,
    );

    expect(screen.getAllByTestId('unpainted-star')).toHaveLength(5);
  });

  it('should render GuitarRating component with all painted stars', () => {
    const rating = 5;
    render(
      <Rating rating={rating} />,
    );

    expect(screen.getAllByTestId('painted-star')).toHaveLength(5);
  });

  it('should render GuitarRating component with 3 painted and 2 unpainted stars', () => {
    const rating = 3;
    render(
      <Rating rating={rating} />,
    );

    expect(screen.getAllByTestId('painted-star')).toHaveLength(3);
    expect(screen.getAllByTestId('unpainted-star')).toHaveLength(2);
  });
});
