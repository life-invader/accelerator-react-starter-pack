import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { GuitarInfo } from '../../constants/guitars';
import { useModal } from '../../hooks/use-modal';
import { addToCart } from '../../store/cart/actions';
import { IGuitarWithComments } from '../../types/guitar';
import { formatGuitarPrice } from '../../utils/common';

type ModalAddToCartType = {
  guitar: IGuitarWithComments,
  onAddToCartModalOpen: (value: boolean) => void,
  onAddedToCartModalOpen: (value: boolean) => void,
}

function ModalAddToCart({ guitar, onAddToCartModalOpen, onAddedToCartModalOpen }: ModalAddToCartType) {
  const dispatch = useDispatch();
  const firstFocusElementRef = useRef<HTMLButtonElement>(null);
  const { vendorCode, name, stringCount, price, previewImg, type } = guitar;

  const handleModalClose = useCallback(() => {
    onAddToCartModalOpen(false);
  }, [onAddToCartModalOpen]);

  useModal(handleModalClose);

  const addToCartClickHandler = () => {
    dispatch(addToCart(guitar));
    onAddToCartModalOpen(false);
    onAddedToCartModalOpen(true);
  };

  const handleFirstElementFocus = (evt: React.KeyboardEvent<HTMLButtonElement>) => {
    if (evt.key === 'Tab') {
      evt.preventDefault();
      firstFocusElementRef.current?.focus();
    }
  };

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
