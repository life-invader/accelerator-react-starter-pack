/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import GuitarCard from '../guitar-card/guitar-card';

import { selectAllGuitars, selectPriceRangePlaceholders } from '../../store/guitars/selectors';
import { selectSortType, selectSortOrder, selectPriceRange, selectGuitarsStringsCount, selectGuitarTypes } from '../../store/filters/selectors';
import { fetchGuitars } from '../../store/api-action';
import { QueryParameters, SortOrder, SortType } from '../../const';
import React, { useEffect, useRef, useState } from 'react';
import { loadGuitarPriceRange, loadGuitarStringsCount, loadGuitarTypes, loadSortOrder, loadSortType, removeGuitarStringsCount, removeGuitarTypes } from '../../store/filters/actions';
import { GuitarWithComments } from '../../store/type';

export const getPriceRange = (guitars: GuitarWithComments[]) => {
  const minPrice = guitars.slice().sort((guitarA, guitarB) => guitarA.price - guitarB.price);
  const priceMin = minPrice[0]?.price;
  const maxPrice = guitars.slice().sort((guitarA, guitarB) => guitarA.price - guitarB.price);
  const priceMax = maxPrice[maxPrice.length - 1]?.price;
  return ({
    priceMin,
    priceMax,
  });
};

function CatalogPage(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false);

  const guitars = useSelector(selectAllGuitars);
  const guitarsSortOrder = useSelector(selectSortOrder);
  const guitarsSortType = useSelector(selectSortType);
  const guitarsPriceRange = useSelector(selectPriceRange);
  const guitarPriceRangePlaceholders = useSelector(selectPriceRangePlaceholders);
  const guitarsStringsCount = useSelector(selectGuitarsStringsCount);
  const guitarTypes = useSelector(selectGuitarTypes);

  const handleSortTypeButtonClick = (evt: React.BaseSyntheticEvent) => {
    const currentSortType = evt.target.dataset.sort as string;

    if (guitarsSortType === currentSortType) {
      return;
    }

    dispatch(loadSortType(currentSortType));

    if (!guitarsSortOrder) {
      dispatch(loadSortOrder(SortOrder.Ascending));
    }
    // dispatch(fetchGuitars({
    //   [QueryParameters.Sort]: evt.target.dataset.sort,
    //   [QueryParameters.Order]: guitarsSortType || SortType.Price,
    // }));

  };

  const handleSortOrderButtonClick = (evt: React.BaseSyntheticEvent) => {
    const currentSortOrder = evt.target.dataset.order as string;
    if (guitarsSortOrder === currentSortOrder) {
      return;
    }

    dispatch(loadSortOrder(currentSortOrder));

    if (!guitarsSortType) {
      dispatch(loadSortType(SortType.Price));
    }

    // dispatch(fetchGuitars({
    //   [QueryParameters.Sort]: guitarsSortOrder || SortOrder.Ascending,
    //   [QueryParameters.Order]: evt.target.dataset.order,
    // }));

  };

  const handleGuitarTypeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const guitarType = evt.target.id;

    if (evt.target.checked) {
      dispatch(loadGuitarTypes(guitarType));
    } else {
      dispatch(removeGuitarTypes(guitarType));
    }
  };

  const handleGuitarStringsCountChange = (evt: React.BaseSyntheticEvent) => {
    const stringsCount = evt.target.dataset.strings as string;

    if (evt.target.checked) {
      dispatch(loadGuitarStringsCount(stringsCount));
    } else {
      dispatch(removeGuitarStringsCount(stringsCount));
    }
  };

  const handlePriceRangeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value === '') {
      return;
    }

    const price = Number(evt.target.value);
    const priceFieldName = evt.target;

    if (priceFieldName.id === 'priceMin' && price < guitarPriceRangePlaceholders.priceMin) {
      priceFieldName.value = guitarPriceRangePlaceholders.priceMin.toString();
      dispatch(loadGuitarPriceRange({
        [priceFieldName.id]: guitarPriceRangePlaceholders.priceMin,
      }));
      return;
    }

    if (priceFieldName.id === 'priceMin' && price > guitarPriceRangePlaceholders.priceMax) {
      priceFieldName.value = guitarPriceRangePlaceholders.priceMax.toString();
      dispatch(loadGuitarPriceRange({
        [priceFieldName.id]: guitarPriceRangePlaceholders.priceMax,
      }));
      return;
    }

    if (priceFieldName.id === 'priceMax' && price > guitarPriceRangePlaceholders.priceMax) {
      priceFieldName.value = guitarPriceRangePlaceholders.priceMax.toString();
      dispatch(loadGuitarPriceRange({
        [priceFieldName.id]: guitarPriceRangePlaceholders.priceMax,
      }));
      return;
    }

    if (priceFieldName.id === 'priceMax' && price < guitarPriceRangePlaceholders.priceMin) {
      priceFieldName.value = guitarPriceRangePlaceholders.priceMin.toString();
      dispatch(loadGuitarPriceRange({
        [priceFieldName.id]: guitarPriceRangePlaceholders.priceMin,
      }));
      return;
    }

    if (priceFieldName.id === 'priceMin' && price > guitarsPriceRange.priceMax) {
      priceFieldName.value = guitarsPriceRange.priceMax.toString();
      dispatch(loadGuitarPriceRange({
        [priceFieldName.id]: guitarsPriceRange.priceMax,
      }));
      return;
    }

    if (priceFieldName.id === 'priceMax' && price < guitarsPriceRange.priceMin) {
      priceFieldName.value = guitarsPriceRange.priceMin.toString();
      dispatch(loadGuitarPriceRange({
        [priceFieldName.id]: guitarsPriceRange.priceMin,
      }));
      return;
    }

    if ((priceFieldName.id === 'priceMin' && price === guitarsPriceRange.priceMin) || (priceFieldName.id === 'priceMax' && price === guitarsPriceRange.priceMax)) {
      return;
    }

    dispatch(loadGuitarPriceRange({
      [priceFieldName.id]: price,
    }));
  };

  // Дефолтный эффект для первичной загрузки гитар
  // useEffect(() => {
  //   dispatch(fetchGuitars());
  // }, []);

  useEffect(() => {
    dispatch(fetchGuitars());

    const params = new URLSearchParams();

    console.log('2nd');

    params.delete('type');
    guitarTypes.forEach((type) => params.append('type', type));

    params.delete('stringCount');
    guitarsStringsCount.forEach((stringCount) => params.append('stringCount', stringCount));

    guitarsPriceRange.priceMin && params.set('price_gte', guitarsPriceRange.priceMin.toString());
    guitarsPriceRange.priceMax && params.set('price_lte', guitarsPriceRange.priceMax.toString());

    history.push(`${location.pathname}?${params.toString()}`);
  }, [dispatch, guitarTypes, guitarsPriceRange.priceMax, guitarsPriceRange.priceMin, guitarsStringsCount, history, location.pathname]);

  return (
    <main className='page-content'>
      <div className='container'>
        <h1 className='page-content__title title title--bigger'>Каталог гитар</h1>
        <ul className='breadcrumbs page-content__breadcrumbs'>
          <li className='breadcrumbs__item'>
            <Link className='link' to='/'>Главная</Link>
          </li>
          <li className='breadcrumbs__item'>
            <Link className='link' to='#'>Каталог</Link>
          </li>
        </ul>
        <div className='catalog'>
          <form className='catalog-filter'>
            <h2 className='title title--bigger catalog-filter__title'>Фильтр</h2>
            <fieldset className='catalog-filter__block'>
              <legend className='catalog-filter__block-title'>Цена, ₽</legend>
              <div className='catalog-filter__price-range'>
                <div className='form-input'>
                  <label className='visually-hidden'>Минимальная цена</label>
                  <input type='number' placeholder={`${guitarPriceRangePlaceholders.priceMin}`} min={`${guitarsPriceRange.priceMin}`} id='priceMin' name='от' onBlur={handlePriceRangeChange} />
                </div>
                <div className='form-input'>
                  <label className='visually-hidden'>Максимальная цена</label>
                  <input type='number' placeholder={`${guitarPriceRangePlaceholders.priceMax}`} max={`${guitarPriceRangePlaceholders.priceMax}`} id='priceMax' name='до' onBlur={handlePriceRangeChange} />
                </div>
              </div>
            </fieldset>
            <fieldset className='catalog-filter__block'>
              <legend className='catalog-filter__block-title'>Тип гитар</legend>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='acoustic' name='acoustic' onChange={handleGuitarTypeChange} />
                <label htmlFor='acoustic'>Акустические гитары</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='electric' name='electric' onChange={handleGuitarTypeChange} />
                <label htmlFor='electric'>Электрогитары</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='ukulele' name='ukulele' onChange={handleGuitarTypeChange} />
                <label htmlFor='ukulele'>Укулеле</label>
              </div>
            </fieldset>
            <fieldset className='catalog-filter__block'>
              <legend className='catalog-filter__block-title'>Количество струн</legend>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='4-strings' name='4-strings' data-strings='4' onChange={handleGuitarStringsCountChange} />
                <label htmlFor='4-strings'>4</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='6-strings' name='6-strings' data-strings='6' onChange={handleGuitarStringsCountChange} />
                <label htmlFor='6-strings'>6</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='7-strings' name='7-strings' data-strings='7' onChange={handleGuitarStringsCountChange} />
                <label htmlFor='7-strings'>7</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='12-strings' name='12-strings' data-strings='12' onChange={handleGuitarStringsCountChange} />
                <label htmlFor='12-strings'>12</label>
              </div>
            </fieldset>
          </form>
          <div className='catalog-sort'>
            <h2 className='catalog-sort__title'>Сортировать:</h2>
            <div className='catalog-sort__type'>
              <button className={`catalog-sort__type-button ${guitarsSortType === SortType.Price ? 'catalog-sort__type-button--active' : ''}`} aria-label='по цене' tabIndex={-1} data-sort={SortType.Price} onClick={handleSortTypeButtonClick} >по цене</button>
              <button className={`catalog-sort__type-button ${guitarsSortType === SortType.Rating ? 'catalog-sort__type-button--active' : ''}`} aria-label='по популярности' data-sort={SortType.Rating} onClick={handleSortTypeButtonClick} >по популярности</button>
            </div>
            <div className='catalog-sort__order'>
              <button className={`catalog-sort__order-button catalog-sort__order-button--up ${guitarsSortOrder === SortOrder.Ascending ? 'catalog-sort__order-button--active' : ''}`} aria-label='По возрастанию' tabIndex={-1} data-order={SortOrder.Ascending} onClick={handleSortOrderButtonClick}></button>
              <button className={`catalog-sort__order-button catalog-sort__order-button--down ${guitarsSortOrder === SortOrder.Descending ? 'catalog-sort__order-button--active' : ''}`} aria-label='По убыванию' data-order={SortOrder.Descending} onClick={handleSortOrderButtonClick} ></button>
            </div>
          </div>
          <div className='cards catalog__cards'>

            {
              guitars &&
              guitars.map((guitar) => <GuitarCard key={guitar.id} {...guitar} />)
            }

          </div>
          <div className='pagination page-content__pagination'>
            <ul className='pagination__list'>
              <li className='pagination__page pagination__page--active'><a className='link pagination__page-link' href='1'>1</a>
              </li>
              <li className='pagination__page'>
                <a className='link pagination__page-link' href=''>2</a>
              </li>
              <li className='pagination__page'><a className='link pagination__page-link' href='3'>3</a>
              </li>
              <li className='pagination__page pagination__page--next' id='next'>
                <a className='link pagination__page-link' href='2'>Далее</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CatalogPage;
