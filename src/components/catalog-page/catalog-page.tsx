import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GuitarCard from '../guitar-card/guitar-card';

import { selectAllGuitars } from '../../store/selector';
import { fetchGuitars } from '../../store/api-action';
import { QueryParameters, SortOrder, SortType } from '../../const';
import React, { useState } from 'react';

function CatalogPage(): JSX.Element {
  const dispatch = useDispatch();
  const guitars = useSelector(selectAllGuitars);
  const [currentSort, setCurrentSort] = useState<typeof SortType.Rating | typeof SortType.Price | undefined>(undefined);
  const [currentSortOrder, setCurrentSortOrder] = useState<typeof SortOrder.Ascending | typeof SortOrder.Descending | undefined>(undefined);

  const handleSortButtonClick = (evt: React.BaseSyntheticEvent) => {
    if (currentSort === evt.target.dataset.sort) {
      return;
    }

    setCurrentSort(evt.target.dataset.sort);
    dispatch(fetchGuitars({
      [QueryParameters.Sort]: evt.target.dataset.sort,
      [QueryParameters.Order]: currentSortOrder || SortOrder.Ascending,
    }));
  };

  const handleOrderSortButtonClick = (evt: React.BaseSyntheticEvent) => {
    if (currentSortOrder === evt.target.dataset.order) {
      return;
    }

    if (!currentSort) {
      setCurrentSort(SortType.Price);
    }

    setCurrentSortOrder(evt.target.dataset.order);
    dispatch(fetchGuitars({
      [QueryParameters.Sort]: currentSort || SortType.Price,
      [QueryParameters.Order]: evt.target.dataset.order,
    }));
  };

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
                  <input type='number' placeholder='1 000' id='priceMin' name='от' />
                </div>
                <div className='form-input'>
                  <label className='visually-hidden'>Максимальная цена</label>
                  <input type='number' placeholder='30 000' id='priceMax' name='до' />
                </div>
              </div>
            </fieldset>
            <fieldset className='catalog-filter__block'>
              <legend className='catalog-filter__block-title'>Тип гитар</legend>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='acoustic' name='acoustic' />
                <label htmlFor='acoustic'>Акустические гитары</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='electric' name='electric' />
                <label htmlFor='electric'>Электрогитары</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='ukulele' name='ukulele' />
                <label htmlFor='ukulele'>Укулеле</label>
              </div>
            </fieldset>
            <fieldset className='catalog-filter__block'>
              <legend className='catalog-filter__block-title'>Количество струн</legend>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='4-strings' name='4-strings' />
                <label htmlFor='4-strings'>4</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='6-strings' name='6-strings' />
                <label htmlFor='6-strings'>6</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='7-strings' name='7-strings' />
                <label htmlFor='7-strings'>7</label>
              </div>
              <div className='form-checkbox catalog-filter__block-item'>
                <input className='visually-hidden' type='checkbox' id='12-strings' name='12-strings' disabled />
                <label htmlFor='12-strings'>12</label>
              </div>
            </fieldset>
          </form>
          <div className='catalog-sort'>
            <h2 className='catalog-sort__title'>Сортировать:</h2>
            <div className='catalog-sort__type'>
              <button className={`catalog-sort__type-button ${currentSort === SortType.Price ? 'catalog-sort__type-button--active' : ''}`} aria-label='по цене' tabIndex={-1} data-sort={SortType.Price} onClick={handleSortButtonClick} >по цене</button>
              <button className={`catalog-sort__type-button ${currentSort === SortType.Rating ? 'catalog-sort__type-button--active' : ''}`} aria-label='по популярности' data-sort={SortType.Rating} onClick={handleSortButtonClick} >по популярности</button>
            </div>
            <div className='catalog-sort__order'>
              <button className={`catalog-sort__order-button catalog-sort__order-button--up ${currentSortOrder === SortOrder.Ascending ? 'catalog-sort__order-button--active' : ''}`} aria-label='По возрастанию' tabIndex={-1} data-order={SortOrder.Ascending} onClick={handleOrderSortButtonClick}></button>
              <button className={`catalog-sort__order-button catalog-sort__order-button--down ${currentSortOrder === SortOrder.Descending ? 'catalog-sort__order-button--active' : ''}`} aria-label='По убыванию' data-order={SortOrder.Descending} onClick={handleOrderSortButtonClick} ></button>
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
