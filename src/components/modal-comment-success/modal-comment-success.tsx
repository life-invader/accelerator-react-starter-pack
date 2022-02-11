import { useEffect, useRef } from 'react';
import { useModal } from '../../hooks/use-modal';

type ModalCommentSuccessType = {
  onModalSuccessClose: () => void,
}

function ModalCommentSuccess({ onModalSuccessClose }: ModalCommentSuccessType) {
  const successWindowRef = useRef(null);
  useModal(onModalSuccessClose);

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
    document.body.addEventListener('keydown', handleTabKeydown);

    return () => {
      document.body.removeEventListener('keydown', handleTabKeydown);
    };
  }, []);

  return (
    <div className="modal is-active modal--success">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal="" onClick={onModalSuccessClose}></div>
        <div className="modal__content" ref={successWindowRef}>
          <svg className="modal__icon" width="26" height="20" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <p className="modal__message">Спасибо за ваш отзыв!</p>
          <div className="modal__button-container modal__button-container--review">
            <button className="button button--small modal__button modal__button--review" tabIndex={1} onClick={onModalSuccessClose}>К покупкам!</button>
          </div>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" tabIndex={2} onClick={onModalSuccessClose}>
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCommentSuccess;
