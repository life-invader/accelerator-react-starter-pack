import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../../constants/routes';
import { fetchCurrentGuitar } from '../../store/api-actions';
import { loadNewCommentSuccessStatus } from '../../store/guitars/actions';
import { selectCurrentGuitar, selectCurrentGuitarErrorStatus, selectCurrentGuitarFetchingStatus, selectNewCommentStatus } from '../../store/guitars/selectors';
import GuitarCommentList from '../guitar-comment-list/guitar-comment-list';
import GuitarPageTabs from '../guitar-page-tabs/guitar-page-tabs';
import LoadingError from '../loading-error/loading-error';
import ModalCommentSuccess from '../modal-comment-success/modal-comment-success';
import ModalComment from '../modal-comment/modal-comment';
import Rating from '../rating/rating';
import Spinner from '../spinner/spinner';

const RATE_COUNT_PLUG = 0;
const STAR_HEIGHT = '14';
const STAR_WIDTH = '14';


function GuitarPage() {
  const dispatch = useDispatch();
  const currentGuitar = useSelector(selectCurrentGuitar);
  const newCommentStatus = useSelector(selectNewCommentStatus);
  const currentGuitarFetchingStatus = useSelector(selectCurrentGuitarFetchingStatus);
  const currentGuitarErrorStatus = useSelector(selectCurrentGuitarErrorStatus);

  const { id } = useParams<{ id: string }>();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isModalSuccessOpened, setIsModalSuccessOpened] = useState(false);

  const sortedComments = currentGuitar.comments?.slice().sort((commentA, commentB) => {
    const dateA = new Date(commentA.createAt).getTime();
    const dateB = new Date(commentB.createAt).getTime();

    return dateB - dateA;
  });

  const handleModalOpen = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    setIsModalOpened(true);
  };

  const handleModalClose = () => {
    setIsModalOpened(false);
  };

  const handleModalSuccessClose = () => {
    setIsModalSuccessOpened(false);
    dispatch(loadNewCommentSuccessStatus(null));
  };

  useEffect(() => {
    if (newCommentStatus) {
      setIsModalOpened(false);
      setIsModalSuccessOpened(true);
    }

  }, [newCommentStatus]);

  useEffect(() => {
    dispatch(fetchCurrentGuitar(id));
  }, [dispatch, id]);

  if (currentGuitarFetchingStatus) {
    return (
      <Spinner />
    );
  }

  if (currentGuitarErrorStatus) {
    return (
      <LoadingError />
    );
  }

  return (
    <>
      <h1 className="page-content__title title title--bigger" id='#header'>Товар</h1>

      <ul className="breadcrumbs page-content__breadcrumbs">
        <li className="breadcrumbs__item">
          <Link className="link" to={AppRoute.getMainRoute()}>Главная</Link>
        </li>
        <li className="breadcrumbs__item">
          <Link className="link" to={AppRoute.getCatalogRoute(true)}>Каталог</Link>
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
        {
          sortedComments?.length > 0 &&
          <h3 className="reviews__title title title--bigger">Отзывы</h3>
        }
        <Link className="button button--red-border button--big reviews__sumbit-button" to={AppRoute.getPlugRoute()} onClick={handleModalOpen} style={{ 'zIndex': '10' }}>Оставить отзыв</Link>

        <GuitarCommentList comments={sortedComments} />

        {
          currentGuitar.comments?.length > 0 &&
          <a className="button button--up button--red-border button--big reviews__up-button" href="#header" style={{ 'zIndex': '10' }}>Наверх</a>
        }

        {
          isModalOpened &&
          <ModalComment handleModalClose={handleModalClose} guitarName={currentGuitar.name} guitarId={currentGuitar.id} />
        }

        {
          isModalSuccessOpened &&
          <ModalCommentSuccess handleModalSuccessClose={handleModalSuccessClose} />
        }

      </section>
    </>
  );
}

export default GuitarPage;
