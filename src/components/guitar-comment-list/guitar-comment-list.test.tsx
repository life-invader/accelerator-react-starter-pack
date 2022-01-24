import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMockComment, createMockComments } from '../../utils/common';
import GuitarCommentList from './guitar-comment-list';

const VISIBLE_REVIEWS_BY_DEFAULT = 3;
const VISIBLE_REVIEWS_BY_CLICK = 3;

const mockComment = createMockComment();
const mockComments = createMockComments(VISIBLE_REVIEWS_BY_DEFAULT);
const mockCommentsAfterClick = createMockComments(VISIBLE_REVIEWS_BY_DEFAULT + VISIBLE_REVIEWS_BY_CLICK);

describe('Component: GuitarCommentList', () => {
  it('should render GuitarCommentList component', () => {
    render(
      <GuitarCommentList comments={mockComments} />,
    );

    expect(screen.getAllByText(mockComment.comment)).toHaveLength(mockComments.length);
  });

  it('should show extra comments after click', () => {
    render(
      <GuitarCommentList comments={mockCommentsAfterClick} />,
    );

    expect(screen.getAllByText(mockComment.comment)).toHaveLength(VISIBLE_REVIEWS_BY_DEFAULT); // найдет все отрендеренные комменты
    userEvent.click(screen.getByRole('button'));
    expect(screen.getAllByText(mockComment.comment)).toHaveLength(mockCommentsAfterClick.length); // найдет все отрендеренные комменты после клика
  });
});
