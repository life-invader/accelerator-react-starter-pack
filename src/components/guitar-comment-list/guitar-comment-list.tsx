import { useState } from 'react';
import { GuitarCommentType } from '../../types/guitar';
import GuitarComment from '../guitar-comment/guitar-comment';

type GuitarCommentListType = {
  comments: GuitarCommentType[],
}

const VISIBLE_REVIEWS_BY_DEFAULT = 3;
const VISIBLE_REVIEWS_BY_CLICK = 3;

function GuitarCommentList({ comments }: GuitarCommentListType) {
  const [visibleCommentsNumber, setVisibleCommentsNumber] = useState(VISIBLE_REVIEWS_BY_DEFAULT);

  const visibleComments = comments && comments.slice(0, visibleCommentsNumber);
  const allCommentsNumber = comments?.length || VISIBLE_REVIEWS_BY_DEFAULT;

  return (
    <>
      {
        visibleComments &&
        visibleComments.map((comment, index) => <GuitarComment key={`${comment.guitarId + index}`} comment={comment} />)
      }
      {
        (visibleCommentsNumber < allCommentsNumber) &&
        <button className="button button--medium reviews__more-button" onClick={() => setVisibleCommentsNumber((prevState) => prevState + VISIBLE_REVIEWS_BY_CLICK)}>Показать еще отзывы</button>
      }
    </>
  );
}

export default GuitarCommentList;
