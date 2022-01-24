import { render, screen } from '@testing-library/react';
import GuitarComment from './guitar-comment';
import { createMockComment } from '../../utils/common';

const mockComment = createMockComment();

describe('Component: GuitarComment', () => {
  it('should render GuitarComment component', () => {
    render(
      <GuitarComment comment={mockComment} />,
    );

    expect(screen.getByText('Достоинства:')).toBeInTheDocument();
    expect(screen.getByText('Недостатки:')).toBeInTheDocument();
    expect(screen.getByText('Комментарий:')).toBeInTheDocument();
    expect(screen.getByText(mockComment.comment)).toBeInTheDocument();
  });
});
