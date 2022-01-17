import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { AppRoute } from '../../../constants/routes';
import { fetchSimilarGuitarsByName } from '../../../store/api-actions';
import { selectSimilarGuitars } from '../../../store/guitars/selectors';
import { sortBySimilarName } from '../../../utils';

function HeaderSearch() {
  const dispatch = useDispatch();
  const history = useHistory();

  const similarGuitars = useSelector(selectSimilarGuitars);
  const searchFormRef = useRef<HTMLInputElement>(null);

  const [isOpened, setIsOpened] = useState(false);
  const [searchName, setSearchName] = useState('');

  const handleGuitarClick = (id: number | string) => {
    history.push(AppRoute.getGuitarsRoute(id));
    handleFormBlur();
  };

  const handleFormSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.value.trim()) {
      setIsOpened(false);
      return;
    }

    setSearchName(evt.target.value.trim());
    dispatch(fetchSimilarGuitarsByName(evt.target.value.trim()));
  };

  const handleOutsideFormClick = useCallback((evt) => {
    if (!evt.composedPath().includes(searchFormRef.current)) {
      handleFormBlur();
    }
  }, []);

  const handleFormBlur = () => {
    setIsOpened(false);
  };

  const handleFormFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    if (!evt.target.value.trim()) {
      setIsOpened(false);
      return;
    }

    if (similarGuitars.length) {
      setIsOpened(true);
    }
  };

  const openSimilarGuitarsWindow = useCallback(() => {
    if (similarGuitars.length) {
      setIsOpened(true);
      return;
    }

    setIsOpened(false);
  }, [similarGuitars.length]);

  useEffect(() => {
    openSimilarGuitarsWindow();
  }, [openSimilarGuitarsWindow, similarGuitars]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideFormClick);

    return () => document.removeEventListener('click', handleOutsideFormClick);
  }, [handleOutsideFormClick]);

  const sortedGuitars = useMemo(
    () => (similarGuitars && sortBySimilarName(similarGuitars, searchName)),
    [searchName, similarGuitars],
  );

  return (
    <div className='form-search' ref={searchFormRef}>
      <form className='form-search__form' onSubmit={handleFormSubmit}>
        <button className='form-search__submit' type='submit'>
          <svg className='form-search__icon' width='14' height='15' aria-hidden='true'>
            <use xlinkHref='#icon-search'></use>
          </svg><span className='visually-hidden'>Начать поиск</span>
        </button>
        <input className='form-search__input' id='search' type='text' autoComplete='off' placeholder='что вы ищете?' onInput={handleInputChange} onFocus={handleFormFocus} />
        <label className='visually-hidden' htmlFor='search'>Поиск</label>
      </form>
      {
        (isOpened && similarGuitars) &&
        <ul className='form-search__select-list' style={{ zIndex: '10' }} data-testid='similar-guitars' >
          {
            sortedGuitars.map(({ name, id }) => <li key={`${name}_${id}`} className='form-search__select-item' tabIndex={0} onClick={() => handleGuitarClick(id)} >{name}</li>)
          }
        </ul>
      }
    </div >
  );
}

export default HeaderSearch;
