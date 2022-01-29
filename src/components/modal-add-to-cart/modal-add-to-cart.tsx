import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { GuitarInfo } from '../../constants/guitars';
import { addToCart } from '../../store/cart/actions';
import { IGuitarWithComments } from '../../types/guitar';
import { formatGuitarPrice } from '../../utils/common';

type ModalAddToCartType = {
  guitar: IGuitarWithComments,
  setAddToCartModalOpen: (value: boolean) => void,
  setAddedToCartModalOpen: (value: boolean) => void,
}

function ModalAddToCart({ guitar, setAddToCartModalOpen, setAddedToCartModalOpen }: ModalAddToCartType) {
  const dispatch = useDispatch();
  const firstFocusElementRef = useRef<HTMLButtonElement>(null);
  const { vendorCode, name, stringCount, price, previewImg, type } = guitar;

  const handleModalClose = useCallback(() => {
    setAddToCartModalOpen(false);
  }, [setAddToCartModalOpen]);

  const addToCartClickHandler = () => {
    dispatch(addToCart(guitar));
    setAddToCartModalOpen(false);
    setAddedToCartModalOpen(true);
  };

  const handleEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      handleModalClose();
    }
  }, [handleModalClose]);

  const blockScroll = () => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth; // ширина скролла справа
    const bodyPaddingRight = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'), 10) || 0; // отступ справа

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

    document.body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;
  };

  const allowScroll = () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

  const handleFirstElementFocus = (evt: React.KeyboardEvent<HTMLButtonElement>) => {
    if (evt.key === 'Tab') {
      evt.preventDefault();
      firstFocusElementRef.current?.focus();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', handleEscapeKeydown);
    blockScroll();

    return () => {
      document.body.removeEventListener('keydown', handleEscapeKeydown);
      allowScroll();
    };
  }, [handleEscapeKeydown]);

  return (
    <div className="modal is-active modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal="" onClick={handleModalClose}></div>
        <div className="modal__content">
          <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
          <div className="modal__info">
            <img className="modal__img" src={`/${previewImg}`} width="67" height="137" alt="Честер bass" />
            <div className="modal__info-wrapper">
              <h3 className="modal__product-name title title--little title--uppercase">Гитара {name}</h3>
              <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
              <p className="modal__product-params">{GuitarInfo[type].nameForOne}, {stringCount} струнная</p>
              <p className="modal__price-wrapper">
                <span className="modal__price">Цена:</span>
                <span className="modal__price">{formatGuitarPrice(price)} ₽</span>
              </p>
            </div>
          </div>
          <div className="modal__button-container">
            <button className="button button--red button--big modal__button modal__button--add" ref={firstFocusElementRef} autoFocus onClick={addToCartClickHandler} tabIndex={1}>Добавить в корзину</button>
          </div>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={handleModalClose} tabIndex={2} onKeyDown={handleFirstElementFocus}>
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddToCart;
