import { Link } from 'react-router-dom';
import { GuitarWithComments } from '../../store/type';
import { renderRatingStars } from '../../utils';

const paintedStar = (
  <svg width="12" height="11" aria-hidden="true">
    <use xlinkHref="#icon-full-star"></use>
  </svg>
);

const unpaintedStar = (
  <svg width="12" height="11" aria-hidden="true">
    <use xlinkHref="#icon-star"></use>
  </svg>
);

function GuitarCard({ price, name, previewImg, rating, comments }: GuitarWithComments): JSX.Element {

  return (
    <div className="product-card">
      <img src={previewImg} width="75" height="190" alt={name} />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>

          {renderRatingStars(rating, paintedStar, unpaintedStar)}

          <span className="rate__count">{comments.length}</span><span className="rate__message"></span>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to="#">Подробнее</Link>
        <Link className="button button--red button--mini button--add-to-cart" to="#">Купить</Link>
      </div>
    </div>
  );
}

export default GuitarCard;
