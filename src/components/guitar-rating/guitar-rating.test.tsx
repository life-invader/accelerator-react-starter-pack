import { render, screen } from '@testing-library/react';
import GuitarRating from './guitar-rating';

describe('Component: GuitarRating', () => {
  it('should render GuitarRating component with all unpainted stars', () => {
    const rating = 0;
    render(
      <GuitarRating rating={rating} />,
    );

    expect(screen.getAllByTestId('unpainted-star')).toHaveLength(5);
  });

  it('should render GuitarRating component with all painted stars', () => {
    const rating = 5;
    render(
      <GuitarRating rating={rating} />,
    );

    expect(screen.getAllByTestId('painted-star')).toHaveLength(5);
  });

  it('should render GuitarRating component with 3 painted and 2 unpainted stars', () => {
    const rating = 3;
    render(
      <GuitarRating rating={rating} />,
    );

    expect(screen.getAllByTestId('painted-star')).toHaveLength(3);
    expect(screen.getAllByTestId('unpainted-star')).toHaveLength(2);
  });
});
