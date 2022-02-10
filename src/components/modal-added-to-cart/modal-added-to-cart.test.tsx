import { render, screen } from '@testing-library/react';
import ModalAddedToCart from './modal-added-to-cart';

const onAddedToCartModalOpen = jest.fn();

describe('Component: ModalAddToCart', () => {
  it('should render ModalAddToCart component', () => {
    render(
      <ModalAddedToCart onAddedToCartModalOpen={onAddedToCartModalOpen} />,
    );

    expect(screen.getByText('Товар успешно добавлен в корзину')).toBeInTheDocument();
  });
});
