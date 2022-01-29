import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../constants/routes';

type ModalAddedToCartType = {
  setAddedToCartModalOpen: (value: boolean) => void,
}

function ModalAddedToCart({ setAddedToCartModalOpen }: ModalAddedToCartType) {
  const history = useHistory();

  const handleModalClose = useCallback(() => {
    setAddedToCartModalOpen(false);
  }, [setAddedToCartModalOpen]);

  const handleEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      handleModalClose();
    }
  }, [handleModalClose]);

  const goToCartButtonClickHandler = () => {
    history.push(AppRoute.getCartRoute());
  };

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

  const handleTabKeydown = (evt: KeyboardEvent) => {
    if (evt.key === 'Tab') {
      const goToCartButton = document.querySelector('.button.button--small.modal__button') as HTMLButtonElement;
      const closeModal = document.querySelector('.modal__close-btn.button-cross') as HTMLButtonElement;

      if (evt.target === document.body) {
        evt.preventDefault();
        goToCartButton.focus();
      }

      if (evt.target === closeModal) {
        evt.preventDefault();
        goToCartButton.focus();
      }
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', handleEscapeKeydown);
    document.body.addEventListener('keydown', handleTabKeydown);
    blockScroll();

    return () => {
      document.body.removeEventListener('keydown', handleEscapeKeydown);
      document.body.removeEventListener('keydown', handleTabKeydown);
      allowScroll();
    };
  }, [handleEscapeKeydown]);

  return (
    <div className="modal is-active modal--success">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal="" onClick={handleModalClose}></div>
        <div className="modal__content">
          <svg className="modal__icon" width="26" height="20" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <p className="modal__message">Товар успешно добавлен в корзину</p>
          <div className="modal__button-container modal__button-container--add">
            <button className="button button--small modal__button" onClick={goToCartButtonClickHandler} tabIndex={1}>Перейти в корзину</button>
            <button className="button button--black-border button--small modal__button modal__button--right" onClick={handleModalClose} tabIndex={2}>Продолжить покупки</button>
          </div>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={handleModalClose} tabIndex={3}>
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddedToCart;
