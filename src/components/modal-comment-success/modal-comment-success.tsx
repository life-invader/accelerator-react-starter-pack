import { useCallback, useEffect, useRef } from 'react';

type ModalCommentSuccessType = {
  handleModalSuccessClose: () => void,
}

function ModalCommentSuccess({ handleModalSuccessClose }: ModalCommentSuccessType) {
  const successWindowRef = useRef(null);

  const handleModalClose = () => {
    handleModalSuccessClose();
  };

  const handleOutsideModalClick = useCallback((evt) => {
    if (!evt.composedPath().includes(successWindowRef.current)) {
      handleModalSuccessClose();
    }
  }, [handleModalSuccessClose]);

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

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideModalClick);
    document.body.addEventListener('keydown', handleEscapeKeydown);
    blockScroll();

    return () => {
      document.body.removeEventListener('click', handleOutsideModalClick);
      document.body.removeEventListener('keydown', handleEscapeKeydown);
      allowScroll();
    };
  }, [handleEscapeKeydown, handleOutsideModalClick]);

  return (
    <div className="modal is-active modal--success modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal=""></div>
        <div className="modal__content" ref={successWindowRef}>
          <svg className="modal__icon" width="26" height="20" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <p className="modal__message">Спасибо за ваш отзыв!</p>
          <div className="modal__button-container modal__button-container--review">
            <button className="button button--small modal__button modal__button--review" onClick={handleModalClose}>К покупкам!</button>
          </div>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area" onClick={handleModalClose}></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCommentSuccess;
