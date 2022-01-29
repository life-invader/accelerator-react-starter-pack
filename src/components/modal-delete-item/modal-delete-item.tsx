import { useCallback, useEffect, useRef } from 'react';
import { GuitarInfo } from '../../constants/guitars';
import { IGuitarWithComments } from '../../types/guitar';
import { formatGuitarPrice } from '../../utils/common';

type ModalDeleteItemType = {
  cartItem: IGuitarWithComments,
  setModalDeleteItem: (value: boolean) => void,
  removeItem: () => void,
}

function ModalDeleteItem({ cartItem, setModalDeleteItem, removeItem }: ModalDeleteItemType) {
  const firstFocusElementRef = useRef<HTMLButtonElement>(null);
  const { name, vendorCode, stringCount, price, type, previewImg } = cartItem;

  const handleModalClose = useCallback(() => {
    setModalDeleteItem(false);
  }, [setModalDeleteItem]);

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
          <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
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
            <button className="button button--small modal__button" onClick={removeItem} autoFocus tabIndex={1} ref={firstFocusElementRef}>Удалить товар</button>
            <button className="button button--black-border button--small modal__button modal__button--right" onClick={handleModalClose} tabIndex={2}>Продолжить покупки</button>
          </div>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={handleModalClose} onKeyDown={handleFirstElementFocus} tabIndex={3}>
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDeleteItem;
