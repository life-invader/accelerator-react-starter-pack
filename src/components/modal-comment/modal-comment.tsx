import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../hooks/useModal';
import { sendNewComment } from '../../store/api-actions';
import { GuitarCommentPostType } from '../../types/guitar';

type ModalCommentType = {
  onModalClose: () => void,
  guitarName: string,
  guitarId: number,
}

const newPostCommentTemplate: GuitarCommentPostType = {
  userName: '',
  advantage: '',
  disadvantage: '',
  comment: '',
  rating: 0,
  guitarId: 0,
};

function ModalComment({ onModalClose, guitarName, guitarId }: ModalCommentType) {
  const dispatch = useDispatch();
  useModal(onModalClose);

  const firstFocusElementRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formFieldError, setFormFieldError] = useState({
    userName: false,
    advantage: false,
    disadvantage: false,
    comment: false,
    rating: false,
    guitarId: false,
  });

  const readinessIndexMax = Object.values(newPostCommentTemplate).length;

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const newCommentPost: GuitarCommentPostType = {
      userName: formRef.current?.['new-comment-post-name'].value.trim(),
      advantage: formRef.current?.['new-comment-post-advantage'].value.trim(),
      disadvantage: formRef.current?.['new-comment-post-disadvantage'].value.trim(),
      comment: formRef.current?.['new-comment-post-comment-text'].value.trim(),
      rating: Number(formRef.current?.['rate'].value),
      guitarId,
    };

    const readinessIndex = Object.values(newCommentPost).reduce((accumulator: number, currentValue, index) => {
      if (currentValue) {
        const emptyFormField = Object.keys(newCommentPost)[index];

        // Ставит false, т.е. поле заполнено и ошибку показывать не надо
        setFormFieldError((prevState) => ({
          ...prevState,
          [emptyFormField]: false,
        }));

        return ++accumulator;
      }

      const emptyFormField = Object.keys(newCommentPost)[index];

      // Ставит true, т.е. есть ошибка и ее надо показать
      setFormFieldError((prevState) => ({
        ...prevState,
        [emptyFormField]: true,
      }));

      return 0;
    }, 0);

    if (readinessIndex === readinessIndexMax) {
      dispatch(sendNewComment(newCommentPost));
    }
  };

  const handleFirstElementFocus = (evt: React.KeyboardEvent<HTMLButtonElement>) => {
    if (evt.key === 'Tab') {
      evt.preventDefault();
      firstFocusElementRef.current?.focus();
    }
  };


  return (
    <div className="modal is-active modal--review">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal="" onClick={onModalClose}></div>
        <div className="modal__content" ref={modalRef}>
          <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
          <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitarName}</h3>

          <form className="form-review" ref={formRef} onSubmit={handleFormSubmit}>
            <div className="form-review__wrapper">
              <div className="form-review__name-wrapper">

                <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                <input className="form-review__input form-review__input--name" name='new-comment-post-name' id="user-name" type="text" data-testid='input-name' autoComplete="off" tabIndex={1} autoFocus ref={firstFocusElementRef} />

                {
                  formFieldError.userName &&
                  <span className="form-review__warning">Заполните поле</span>
                }

              </div>
              <div>
                <span className="form-review__label form-review__label--required">Ваша Оценка</span>
                <div className="rate rate--reverse">

                  <input className="visually-hidden" type="radio" id="star-5" name="rate" value="5" />
                  <label className="rate__label" htmlFor="star-5" title="Отлично" />

                  <input className="visually-hidden" type="radio" id="star-4" name="rate" value="4" />
                  <label className="rate__label" htmlFor="star-4" title="Хорошо" />

                  <input className="visually-hidden" type="radio" id="star-3" name="rate" value="3" />
                  <label className="rate__label" htmlFor="star-3" title="Нормально" />

                  <input className="visually-hidden" type="radio" id="star-2" name="rate" value="2" />
                  <label className="rate__label" htmlFor="star-2" title="Плохо" />

                  <input className="visually-hidden" type="radio" id="star-1" name="rate" value="1" />
                  <label className="rate__label" htmlFor="star-1" title="Ужасно" />

                  <span className="rate__count"></span>

                  {
                    formFieldError.rating &&
                    <span className="rate__message">Поставьте оценку</span>
                  }

                </div>
              </div>
            </div>

            <label className="form-review__label" htmlFor="user-name">Достоинства</label>
            <input className="form-review__input" name='new-comment-post-advantage' id="pros" type="text" autoComplete="off" tabIndex={2} />

            {
              formFieldError.advantage &&
              <span className="form-review__warning">Заполните поле</span>
            }

            <label className="form-review__label" htmlFor="user-name">Недостатки</label>
            <input className="form-review__input" name='new-comment-post-disadvantage' id="user-name" type="text" autoComplete="off" tabIndex={3} />

            {
              formFieldError.disadvantage &&
              <span className="form-review__warning">Заполните поле</span>
            }

            <label className="form-review__label" htmlFor="user-name">Комментарий</label>
            <textarea tabIndex={4} className="form-review__input form-review__input--textarea" name='new-comment-post-comment-text' id="user-name" rows={5} autoComplete="off"></textarea>

            {
              formFieldError.comment &&
              <span className="form-review__warning">Заполните поле</span>
            }

            <button className="button button--medium-20 form-review__button" type="submit" tabIndex={5}>Отправить отзыв</button>
          </form>

          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={onModalClose} tabIndex={6} onKeyDown={handleFirstElementFocus}>
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>

        </div>
      </div>
    </div>
  );
}

export default ModalComment;
