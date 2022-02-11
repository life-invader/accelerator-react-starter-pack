import { Link } from 'react-router-dom';
import { removeGuitarStringsCount } from '../../store/filters/actions';
import { AppRoute } from '../../constants/routes';
import { SortOrder, SortType } from '../../constants/query-parameters';
import { GuitarTypeValue, GuitarInfo, STRINGS_COUNTS } from '../../constants/guitars';
import CatalogPagination from '../catalog-pagination/catalog-pagination';
import CatalogList from '../catalog-list/catalog-list';
import LoadingError from '../loading-error/loading-error';
import Spinner from '../spinner/spinner';
import { useCatalog } from '../../hooks/catalog-page/use-catalog';
import { useFilter } from '../../hooks/catalog-page/use-filter';
import { useDispatch } from 'react-redux';

function CatalogPage(): JSX.Element {
  const dispatch = useDispatch();

  const [
    displayedGuitars,
    isLoading,
    isError,
    guitarPriceRangePlaceholders,
    availableStrings,
    guitarsSortOrder,
    guitarsSortType,
    guitarsPriceRange,
    guitarsStringsCount,
    guitarTypes,
  ] = useCatalog();

  const {
    handleGuitarStringsCountChange,
    handleSortOrderButtonClick,
    handleGuitarTypeChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleSortTypeButtonClick,
  } = useFilter();

  return (
    <>
      <h1 className='page-content__title title title--bigger'>Каталог гитар</h1>
      <ul className='breadcrumbs page-content__breadcrumbs'>
        <li className='breadcrumbs__item'>
          <Link className='link' to={AppRoute.getMainRoute()}>Главная</Link>
        </li>
        <li className='breadcrumbs__item'>
          <Link className='link' to={AppRoute.getCatalogRoute(true)}>Каталог</Link>
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
              Object.values(GuitarTypeValue).map((guitarType) => (
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
              STRINGS_COUNTS.map((strings) => {
                const name = `${strings}-strings`;
                const isChecked = guitarsStringsCount.includes(strings); // 7
                const isDisabled = availableStrings.length > 0 ? !availableStrings.includes(strings) : false; // 4 6 7 12

                (isChecked && isDisabled) && dispatch(removeGuitarStringsCount(strings));

                return (
                  <div key={name} className='form-checkbox catalog-filter__block-item'>
                    <input className='visually-hidden' type='checkbox' id={name} name={name} data-strings={strings} checked={!isDisabled && isChecked} onChange={handleGuitarStringsCountChange} disabled={isDisabled} />
                    <label htmlFor={name}>{strings}</label>
                  </div>
                );
              })
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
          (isLoading && <Spinner />) || ((!isError && <CatalogList displayedGuitars={displayedGuitars} />) || <LoadingError />)
        }

        <CatalogPagination />

      </div>
    </>
  );
}

export default CatalogPage;
