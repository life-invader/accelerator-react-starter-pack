/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { selectDisplayedGuitars, selectGuitarsByCurrentType, selectPriceRangePlaceholders } from '../../store/guitars/selectors';
import { selectSortType, selectSortOrder, selectPriceRange, selectGuitarsStringsCount, selectGuitarTypes } from '../../store/filters/selectors';
import { loadGuitarPriceRange, loadGuitarStringsCount, loadGuitarTypes, loadSortOrder, loadSortType, removeGuitarStringsCount, removeGuitarTypes } from '../../store/filters/actions';
import { fetchDisplayedGuitars, fetchGuitars } from '../../store/api-actions';
import { AppRoute } from '../../constants/routes';
import { SortOrder, SortType } from '../../constants/query-parameters';
import { GuitarType, GuitarInfo, StringsCounts } from '../../constants/guitars';
import CatalogPagination from '../catalog-pagination/catalog-pagination';
import { loadCurrentPage } from '../../store/pagination/actions';
import CatalogList from '../catalog-list/catalog-list';
import LoadingError from '../loading-error/loading-error';

function CatalogPage(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { page = 1 } = useParams<{ page: string }>();

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
      dispatch(loadCurrentPage(1));
    } else {
      dispatch(removeGuitarTypes(guitarType));
    }
  };

  const handleGuitarStringsCountChange = (evt: React.BaseSyntheticEvent) => {
    const stringsCount = evt.target.dataset.strings as string;

    if (evt.target.checked) {
      dispatch(loadGuitarStringsCount(stringsCount));
      dispatch(loadCurrentPage(1));
    } else {
      dispatch(removeGuitarStringsCount(stringsCount));
    }
  };

  const handleMinPriceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const price = Number(evt.target.value);
    const priceFieldValue = evt.target;

    if (priceFieldValue.value === '') {
      dispatch(loadGuitarPriceRange({
        priceMin: 0,
      }));

      return;
    }

    if (price < guitarPriceRangePlaceholders.priceMin) {
      priceFieldValue.value = guitarPriceRangePlaceholders.priceMin.toString();
      dispatch(loadGuitarPriceRange({
        priceMin: guitarPriceRangePlaceholders.priceMin,
      }));

      return;
    }

    if (price > guitarsPriceRange.priceMax && guitarsPriceRange.priceMax) {
      priceFieldValue.value = guitarsPriceRange.priceMax.toString();
      dispatch(loadGuitarPriceRange({
        priceMin: guitarsPriceRange.priceMax,
      }));

      return;
    }

    if (price > guitarPriceRangePlaceholders.priceMax) {
      priceFieldValue.value = guitarPriceRangePlaceholders.priceMax.toString();
      dispatch(loadGuitarPriceRange({
        priceMin: guitarPriceRangePlaceholders.priceMax,
      }));

      return;
    }

    dispatch(loadGuitarPriceRange({
      priceMin: price,
    }));
  };

  const handleMaxPriceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const price = Number(evt.target.value);
    const priceFieldValue = evt.target;

    if (priceFieldValue.value === '') {
      dispatch(loadGuitarPriceRange({
        priceMax: 0,
      }));

      return;
    }

    if (price > guitarPriceRangePlaceholders.priceMax) {
      priceFieldValue.value = guitarPriceRangePlaceholders.priceMax.toString();
      dispatch(loadGuitarPriceRange({
        priceMax: guitarPriceRangePlaceholders.priceMax,
      }));

      return;
    }

    if (price < guitarsPriceRange.priceMin && guitarsPriceRange.priceMin) {
      priceFieldValue.value = guitarsPriceRange.priceMin.toString();
      dispatch(loadGuitarPriceRange({
        priceMax: guitarsPriceRange.priceMin,
      }));

      return;
    }

    if (price < guitarPriceRangePlaceholders.priceMin) {
      priceFieldValue.value = guitarPriceRangePlaceholders.priceMin.toString();
      dispatch(loadGuitarPriceRange({
        priceMax: guitarPriceRangePlaceholders.priceMin,
      }));

      return;
    }

    dispatch(loadGuitarPriceRange({
      priceMax: price,
    }));
  };

  // Эффект для разбора адресной строки и установки фильтров
  useEffect(() => {
    if (firstTimeLoad) {
      return;
    }

    const searchParams = new URLSearchParams(location.search);

    if (!searchParams.toString()) {
      const currentPage = Number(page);

      setFirstTimeLoad(true);
      dispatch(loadCurrentPage(currentPage));

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
  }, [page, dispatch, location.search, firstTimeLoad]);

  useEffect(() => {
    dispatch(fetchGuitars());
    setFirstTimeLoad(true);
  }, [dispatch]);

  // Эффект для запроса новых товаров при изменении фильтров
  useEffect(() => {
    if (!firstTimeLoad) {
      return;
    }

    dispatch(fetchDisplayedGuitars());

    const searchParams = new URLSearchParams();

    searchParams.delete('type');
    guitarTypes.forEach((type) => searchParams.append('type', type));

    searchParams.delete('stringCount');
    guitarsStringsCount.forEach((stringCount) => searchParams.append('stringCount', stringCount));

    guitarsPriceRange.priceMin && searchParams.set('price_gte', guitarsPriceRange.priceMin.toString());
    guitarsPriceRange.priceMax && searchParams.set('price_lte', guitarsPriceRange.priceMax.toString());

    console.log(location.pathname);
    history.push(`${location.pathname}?${searchParams.toString()}`);
  }, [dispatch, firstTimeLoad, guitarTypes, guitarsPriceRange.priceMax, guitarsPriceRange.priceMin, guitarsStringsCount, history, location.pathname]);


  return (
    <main className='page-content'>
      <div className='container'>
        <h1 className='page-content__title title title--bigger'>Каталог гитар</h1>
        <ul className='breadcrumbs page-content__breadcrumbs'>
          <li className='breadcrumbs__item'>
            <Link className='link' to={AppRoute.getMainRoute()}>Главная</Link>
          </li>
          <li className='breadcrumbs__item'>
            <Link className='link' to={AppRoute.getCatalogRoute(1)}>Каталог</Link>
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
                  <input type='number' data-testid='priceMin' placeholder={guitarPriceRangePlaceholders.priceMin.toString()} min={guitarsPriceRange.priceMin} id='priceMin' name='от' onBlur={handleMinPriceChange} />
                </div>
                <div className='form-input'>
                  <label className='visually-hidden'>Максимальная цена</label>
                  <input type='number' data-testid='priceMax' placeholder={guitarPriceRangePlaceholders.priceMax.toString()} max={guitarPriceRangePlaceholders.priceMax} id='priceMax' name='до' onBlur={handleMaxPriceChange} />
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
                StringsCounts.map((strings) => (
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

          {
            (displayedGuitars.length > 0 && <CatalogList displayedGuitars={displayedGuitars} />) ||
            <LoadingError />
          }

          <CatalogPagination />

        </div>
      </div>
    </main>
  );
}

export default CatalogPage;
