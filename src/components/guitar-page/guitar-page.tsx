/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../../constants/routes';
import { fetchCurrentGuitar } from '../../store/api-actions';
import { selectCurrentGuitar } from '../../store/guitars/selectors';
import GuitarCommentList from '../guitar-comment-list/guitar-comment-list';
import GuitarPageTabs from '../guitar-page-tabs/guitar-page-tabs';
import Rating from '../rating/rating';

const RATE_COUNT_PLUG = 0;

const STAR_HEIGHT = '14';
const STAR_WIDTH = '14';


function GuitarPage() {
  const dispatch = useDispatch();
  const currentGuitar = useSelector(selectCurrentGuitar);
  const { id } = useParams<{ id: string }>();

  const sortedComments = currentGuitar.comments?.slice().sort((commentA, commentB) => {
    const dateA = new Date(commentA.createAt).getTime();
    const dateB = new Date(commentB.createAt).getTime();

    return dateB - dateA;
  });

  useEffect(() => {
    dispatch(fetchCurrentGuitar(id));
  }, [dispatch, id]);

  return (
    <main className="page-content" id='#header'>
      <div className="container">
        <h1 className="page-content__title title title--bigger">Товар</h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item">
            <Link className="link" to={AppRoute.getMainRoute()}>Главная</Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="link" to={AppRoute.getCatalogRoute(1)}>Каталог</Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="link" to={AppRoute.getPlugRoute()}>{currentGuitar.name}</Link>
          </li>
        </ul>
        <div className="product-container">
          <img className="product-container__img" src={`/${currentGuitar.previewImg}`} width="90" height="235" alt="" />
          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">{currentGuitar.name}</h2>
            <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>

              {
                <Rating rating={currentGuitar?.rating} starHeight={STAR_HEIGHT} starWidth={STAR_WIDTH} />
              }

              <span className="rate__count">{currentGuitar.comments?.length || RATE_COUNT_PLUG}</span>
              <span className="rate__message"></span>
            </div>

            {
              <GuitarPageTabs currentGuitar={currentGuitar} />
            }

          </div>
          <div className="product-container__price-wrapper">
            <p className="product-container__price-info product-container__price-info--title">Цена:</p>
            <p className="product-container__price-info product-container__price-info--value">{currentGuitar.price} ₽</p>
            <Link className="button button--red button--big product-container__button" to={AppRoute.getPlugRoute()}>Добавить в корзину</Link>
          </div>
        </div>
        <section className="reviews">
          <h3 className="reviews__title title title--bigger">Отзывы</h3>
          <Link className="button button--red-border button--big reviews__sumbit-button" to={AppRoute.getPlugRoute()}>Оставить отзыв</Link>

          <GuitarCommentList comments={sortedComments} />

          {
            currentGuitar.comments?.length > 0 &&
            <a className="button button--up button--red-border button--big reviews__up-button" href="#header" style={{ 'zIndex': '10' }}>Наверх</a>
          }

        </section>
      </div>
    </main >
  );
}

export default GuitarPage;
