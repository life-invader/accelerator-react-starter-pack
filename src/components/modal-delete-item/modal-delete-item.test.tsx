import { render, screen } from '@testing-library/react';
import { createMockGuitar } from '../../utils/common';
import ModalDeleteItem from './modal-delete-item';

const cartItem = createMockGuitar();
const onModalOpen = jest.fn();
const onRemoveItem = jest.fn();

describe('Component: ModalAddToCart', () => {
  it('should render ModalAddToCart component', () => {
    render(
      <ModalDeleteItem onRemoveItem={onRemoveItem} onModalOpen={onModalOpen} cartItem={cartItem} />,
    );

    expect(screen.getByText('Удалить этот товар?')).toBeInTheDocument();
  });
});
