import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants/routes';
import { IGuitarWithComments } from '../../types/guitar';
import Rating from '../rating/rating';

const RATE_COUNT_PLUG = 0;
const STAR_HEIGHT = '11';
const STAR_WIDTH = '12';

function GuitarCard({ price, name, previewImg, rating, comments, id }: IGuitarWithComments): JSX.Element {
  return (
    <div className="product-card">
      <img src={`/${previewImg}`} width="75" height="190" alt={name} />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>

          {
            <Rating rating={rating} starHeight={STAR_HEIGHT} starWidth={STAR_WIDTH} />
          }

          <span className="rate__count">{comments ? comments.length : RATE_COUNT_PLUG}</span>
          <span className="rate__message"></span>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">

        <Link className="button button--mini" to={AppRoute.getGuitarsRoute(id)}>Подробнее</Link>
        <Link className="button button--red button--mini button--add-to-cart" to={AppRoute.getPlugRoute()}>Купить</Link>

      </div>
    </div>
  );
}

export default GuitarCard;
