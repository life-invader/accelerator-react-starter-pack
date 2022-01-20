import type { GuitarCommentType } from '../../types/guitar';
import { formatCommentDate } from '../../utils/common';
import Rating from '../rating/rating';

type GuitarCommentComponentType = {
  comment: GuitarCommentType,
}

const STAR_WIDTH = '16';
const STAR_HEIGHT = '16';

function GuitarComment({ comment }: GuitarCommentComponentType) {

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{comment.userName}</h4>
        <span className="review__date">{formatCommentDate(comment.createAt)}</span>
      </div>
      <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>

        {
          <Rating rating={comment?.rating} starHeight={STAR_HEIGHT} starWidth={STAR_WIDTH} />
        }

        <span className="rate__count"></span>
        <span className="rate__message"></span>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{comment.advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{comment.disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment.comment}</p>
    </div>
  );
}

export default GuitarComment;
