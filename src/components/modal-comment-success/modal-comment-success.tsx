import { useCallback, useEffect, useRef } from 'react';

type ModalCommentSuccessType = {
  handleModalSuccessClose: () => void,
}

function ModalCommentSuccess({ handleModalSuccessClose }: ModalCommentSuccessType) {
  const successWindowRef = useRef(null);

  const handleModalClose = () => {
    handleModalSuccessClose();
  };

  const handleEscapeKeydown = useCallback((evt) => {
    if (evt.key === 'Escape') {
      handleModalSuccessClose();
    }
  }, [handleModalSuccessClose]);

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
      evt.preventDefault();

      const button = document.querySelector('.modal__button--review') as HTMLButtonElement;
      const closeButton = document.querySelector('.button-cross') as HTMLButtonElement;

      button.focus();

      if (evt.target === button) {
        closeButton.focus();
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
        <div className="modal__content" ref={successWindowRef}>
          <svg className="modal__icon" width="26" height="20" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <p className="modal__message">Спасибо за ваш отзыв!</p>
          <div className="modal__button-container modal__button-container--review">
            <button className="button button--small modal__button modal__button--review" tabIndex={1} onClick={handleModalClose}>К покупкам!</button>
          </div>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" tabIndex={2} onClick={handleModalClose}>
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCommentSuccess;
