import type { GuitarCommentType } from '../../types/guitar';

type GuitarCommentComponentType = {
  comment: GuitarCommentType,
}

function GuitarComment({ comment }: GuitarCommentComponentType) {
  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{comment.userName}</h4>
        <span className="review__date">{comment.createAt}</span>
      </div>
      <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-full-star"></use>
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-full-star"></use>
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-full-star"></use>
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-full-star"></use>
        </svg>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-star"></use>
        </svg><span className="rate__count"></span><span className="rate__message"></span>
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
