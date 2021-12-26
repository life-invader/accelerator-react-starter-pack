import { Link } from 'react-router-dom';
import { GuitarWithComments } from '../../store/type';
import GuitarRating from '../guitar-rating/guitar-rating';

function GuitarCard({ price, name, previewImg, rating, comments }: GuitarWithComments): JSX.Element {

  return (
    <div className="product-card">
      <img src={previewImg} width="75" height="190" alt={name} />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>

          <GuitarRating rating={rating} />

          <span className="rate__count">{comments ? comments.length : 0}</span><span className="rate__message"></span>
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
