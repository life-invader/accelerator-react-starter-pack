import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { selectDisplayedGuitars, selectGuitarsByCurrentType, selectPriceRangePlaceholders } from '../../store/guitars/selectors';
import { selectSortType, selectSortOrder, selectPriceRange, selectGuitarsStringsCount, selectGuitarTypes } from '../../store/filters/selectors';
import { loadGuitarPriceRange, loadGuitarStringsCount, loadGuitarTypes, loadSortOrder, loadSortType, removeGuitarStringsCount, removeGuitarTypes } from '../../store/filters/actions';
import { fetchDisplayedGuitars, fetchGuitars } from '../../store/api-action';
import GuitarCard from '../guitar-card/guitar-card';
import { SortOrder, SortType } from '../../constants/const';
import { GuitarType, GuitarInfo, StringsCount } from '../../constants/guitars';

function CatalogPage(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [firstTimeLoad, setFirstTimeLoad] = useState(false);

  const displayedGuitars = useSelector(selectDisplayedGuitars);
  const guitarsByType = useSelector(selectGuitarsByCurrentType);
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
    const price = Number(evt.target.value);
    const priceFieldName = evt.target;

    if (evt.target.value === '' && priceFieldName.id === 'priceMin') {
      dispatch(loadGuitarPriceRange({
        priceMin: guitarPriceRangePlaceholders.priceMin,
      }));

      return;
    }

    if (evt.target.value === '' && priceFieldName.id === 'priceMax') {
      dispatch(loadGuitarPriceRange({
        priceMax: guitarPriceRangePlaceholders.priceMax,
      }));

      return;
    }

    if (priceFieldName.id === 'priceMin' && price <= guitarPriceRangePlaceholders.priceMin) {
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

    if (priceFieldName.id === 'priceMax' && price >= guitarPriceRangePlaceholders.priceMax) {
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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (!searchParams.toString()) {
      setFirstTimeLoad(true);
      return;
    }

    dispatch(loadGuitarTypes(searchParams.getAll('type')));
    dispatch(loadGuitarStringsCount(searchParams.getAll('stringCount')));

    const priceMin = searchParams.get('price_gte');
    const priceMax = searchParams.get('price_lte');

    if (priceMin || priceMax) {
      dispatch(loadGuitarPriceRange({
        priceMin: Number(priceMin),
        priceMax: Number(priceMax),
      }));
    }

    setFirstTimeLoad(true);
  }, []);

  useEffect(() => {
    if (!firstTimeLoad) {
      dispatch(fetchGuitars());
      return;
    }

    dispatch(fetchDisplayedGuitars());

    const params = new URLSearchParams();

    params.delete('type');
    guitarTypes.forEach((type) => params.append('type', type));

    params.delete('stringCount');
    guitarsStringsCount.forEach((stringCount) => params.append('stringCount', stringCount));

    guitarsPriceRange.priceMin && params.set('price_gte', guitarsPriceRange.priceMin.toString());
    guitarsPriceRange.priceMax && params.set('price_lte', guitarsPriceRange.priceMax.toString());

    history.push(`${location.pathname}?${params.toString()}`);
  }, [dispatch, guitarTypes, guitarsPriceRange.priceMax, guitarsPriceRange.priceMin, guitarsStringsCount, history, location.pathname, guitarsSortOrder, guitarsSortType, firstTimeLoad]);

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

              {
                Object.values(GuitarType).map((guitarType) => (
                  <div key={guitarType} className='form-checkbox catalog-filter__block-item'>
                    <input className='visually-hidden' type='checkbox' id={GuitarInfo[guitarType].id} name={GuitarInfo[guitarType].id} onChange={handleGuitarTypeChange} checked={guitarTypes.includes(guitarType)} />
                    <label htmlFor={GuitarInfo[guitarType].id}>{GuitarInfo[guitarType].name}</label>
                  </div>
                ))
              }

            </fieldset>
            <fieldset className='catalog-filter__block'>
              <legend className='catalog-filter__block-title'>Количество струн</legend>

              {
                StringsCount.map((strings) => (
                  <div key={strings.name} className='form-checkbox catalog-filter__block-item'>
                    <input className='visually-hidden' type='checkbox' id={strings.name} name={strings.name} data-strings={strings.count} checked={guitarsStringsCount.includes(strings.count.toString())} onChange={handleGuitarStringsCountChange} disabled={!guitarsByType.map((guitar) => guitar.stringCount).includes(strings.count)} />
                    <label htmlFor={strings.name}>{strings.count}</label>
                  </div>
                ))
              }

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
              displayedGuitars &&
              displayedGuitars.map((guitar) => <GuitarCard key={guitar.id} {...guitar} />)
            }

          </div>
          <div className='pagination page-content__pagination'>
            <ul className='pagination__list'>
              <li className='pagination__page pagination__page--active'>
                <a className='link pagination__page-link' href='catalog/page_1'>1</a>
              </li>
              <li className='pagination__page'>
                <a className='link pagination__page-link' href='catalog/page_1'>2</a>
              </li>
              <li className='pagination__page'>
                <a className='link pagination__page-link' href='/catalog/page_1'>3</a>
              </li>
              <li className='pagination__page pagination__page--next' id='next'>
                <a className='link pagination__page-link' href='3'>Далее</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CatalogPage;
