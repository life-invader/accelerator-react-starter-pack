import { render, screen } from '@testing-library/react';
import ModalCommentSuccess from './modal-comment-success';

const handleModalClose = jest.fn();

describe('Component: ModalCommentSuccess', () => {
  it('should render ModalCommentSuccess component', () => {
    render(
      <ModalCommentSuccess onModalSuccessClose={handleModalClose} />,
    );

    expect(screen.getByText('Спасибо за ваш отзыв!')).toBeInTheDocument();
  });
});
