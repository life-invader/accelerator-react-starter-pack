import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { AppRoute } from '../../constants/routes';
import { fetchDisplayedGuitars, fetchGuitars } from '../../store/api-actions';
import { loadGuitarTypes, loadGuitarStringsCount, loadGuitarPriceRange } from '../../store/filters/actions';
import { selectSortOrder, selectSortType, selectPriceRange, selectGuitarsStringsCount, selectGuitarTypes } from '../../store/filters/selectors';
import { selectFetchStatus, selectErrorStatus, selectDisplayedGuitars, selectAvailableStringsCount, selectPriceRangePlaceholders } from '../../store/guitars/selectors';
import { loadCurrentPage } from '../../store/pagination/actions';
import { selectCurrentPage, selectTotalPages } from '../../store/pagination/selectors';
import { GuitarType, StringsCountType } from '../../types/guitar';

export const useCatalog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { page = 1 } = useParams<{ page: string }>();

  const [isFirstTimeLoaded, setIsFirstTimeLoaded] = useState(false);

  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  const isLoading = useSelector(selectFetchStatus);
  const isError = useSelector(selectErrorStatus);

  const displayedGuitars = useSelector(selectDisplayedGuitars);
  const availableStrings = useSelector(selectAvailableStringsCount);
  const guitarsSortOrder = useSelector(selectSortOrder);
  const guitarsSortType = useSelector(selectSortType);
  const guitarsPriceRange = useSelector(selectPriceRange);
  const guitarPriceRangePlaceholders = useSelector(selectPriceRangePlaceholders);
  const guitarsStringsCount = useSelector(selectGuitarsStringsCount);
  const guitarTypes = useSelector(selectGuitarTypes);

  // Эффект для разбора адресной строки и установки фильтров. Срабатывает только при один раз при рендере
  useEffect(() => {
    if (isFirstTimeLoaded) {
      return;
    }

    const searchParams = new URLSearchParams(location.search);

    if (!searchParams.toString()) {
      return;
    }

    dispatch(loadGuitarTypes(searchParams.getAll('type') as GuitarType[]));

    dispatch(loadGuitarStringsCount(searchParams.getAll('stringCount').map((count) => Number(count)) as StringsCountType[]));

    const priceMin = searchParams.get('price_gte');
    const priceMax = searchParams.get('price_lte');

    if (priceMin || priceMax) {
      dispatch(loadGuitarPriceRange({
        priceMin: Number(priceMin),
        priceMax: Number(priceMax),
      }));
    }

    setIsFirstTimeLoaded(true);
  }, [dispatch, isFirstTimeLoaded, location.search]);

  // Следит, чтобы текущая страница не была больше общего количества страниц
  useEffect(() => {
    if (!totalPages) {
      return;
    }
    if (currentPage > totalPages) {
      history.push(`${AppRoute.getCatalogRoute(Math.max(totalPages, 1))}${location.search}`);
    }
  }, [currentPage, history, location.search, totalPages]);

  // Пушит текущую страницу в стор
  useEffect(() => {
    dispatch(loadCurrentPage(Number(page)));
  }, [dispatch, page]);

  // Запрашивает товары при изменении фильтров и текущей страницы
  useEffect(() => {
    dispatch(fetchDisplayedGuitars());
  }, [dispatch, guitarsSortOrder, guitarsSortType, guitarsPriceRange, guitarTypes, guitarsStringsCount, currentPage]);

  // Единоразовый запрос всех товаров
  useEffect(() => {
    dispatch(fetchGuitars());
  }, [dispatch]);

  // Держит адресную строку согласно фильтрам
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.delete('type');
    guitarTypes.forEach((type) => searchParams.append('type', type));

    searchParams.delete('stringCount');
    guitarsStringsCount.forEach((stringCount) => searchParams.append('stringCount', stringCount.toString()));

    guitarsPriceRange.priceMin && searchParams.set('price_gte', guitarsPriceRange.priceMin.toString());
    guitarsPriceRange.priceMax && searchParams.set('price_lte', guitarsPriceRange.priceMax.toString());

    history.push(`${location.pathname}?${searchParams.toString()}`);
  }, [guitarsSortOrder, guitarsSortType, guitarsPriceRange, guitarTypes, guitarsStringsCount, history, location.pathname, location.search]);

  const catalogValues = [
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
  ] as const;

  return catalogValues;
};
