import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants/routes';
import { GuitarWithComments } from '../../types/guitar';
import GuitarRating from '../guitar-rating/guitar-rating';

const RATE_COUNT_PLUG = 0;

function GuitarCard({ price, name, previewImg, rating, comments, id }: GuitarWithComments): JSX.Element {
  return (
    <div className="product-card">
      <img src={`/${previewImg}`} width="75" height="190" alt={name} />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>

          <GuitarRating rating={rating} />

          <span className="rate__count">{comments ? comments.length : RATE_COUNT_PLUG}</span><span className="rate__message"></span>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={AppRoute.Guitars(id)}>Подробнее</Link>
        <Link className="button button--red button--mini button--add-to-cart" to={AppRoute.Plug()}>Купить</Link>
      </div>
    </div>
  );
}

export default GuitarCard;
