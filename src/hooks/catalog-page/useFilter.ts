import { useDispatch, useSelector } from 'react-redux';
import { SortOrder, SortType } from '../../constants/query-parameters';
import { loadSortType, loadSortOrder, loadGuitarTypes, removeGuitarTypes, loadGuitarStringsCount, removeGuitarStringsCount, loadGuitarPriceRange } from '../../store/filters/actions';
import { selectSortOrder, selectSortType, selectPriceRange } from '../../store/filters/selectors';
import { selectPriceRangePlaceholders } from '../../store/guitars/selectors';
import { SortingType, SortingOrder } from '../../types/filters';
import { GuitarType, StringsCountType } from '../../types/guitar';

export const useFilter = () => {
  const dispatch = useDispatch();

  const guitarsSortOrder = useSelector(selectSortOrder);
  const guitarsSortType = useSelector(selectSortType);
  const guitarsPriceRange = useSelector(selectPriceRange);
  const guitarPriceRangePlaceholders = useSelector(selectPriceRangePlaceholders);

  const handleSortTypeButtonClick = (evt: React.BaseSyntheticEvent) => {
    const currentSortType = evt.target.dataset.sort as SortingType;

    if (guitarsSortType === currentSortType) {
      return;
    }

    dispatch(loadSortType(currentSortType));

    if (!guitarsSortOrder) {
      dispatch(loadSortOrder(SortOrder.Ascending));
    }
  };

  const handleSortOrderButtonClick = (evt: React.BaseSyntheticEvent) => {
    const currentSortOrder = evt.target.dataset.order as SortingOrder;
    if (guitarsSortOrder === currentSortOrder) {
      return;
    }

    dispatch(loadSortOrder(currentSortOrder));

    if (!guitarsSortType) {
      dispatch(loadSortType(SortType.Price));
    }
  };

  const handleGuitarTypeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const guitarType = evt.target.id as GuitarType;

    if (evt.target.checked) {
      dispatch(loadGuitarTypes(guitarType));
    } else {
      dispatch(removeGuitarTypes(guitarType));
    }
  };

  const handleGuitarStringsCountChange = (evt: React.BaseSyntheticEvent) => {
    const stringsCount = Number(evt.target.dataset.strings) as StringsCountType;

    if (evt.target.checked) {
      dispatch(loadGuitarStringsCount(stringsCount));
    } else {
      dispatch(removeGuitarStringsCount(stringsCount));
    }
  };

  const handleMinPriceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const price = Number(evt.target.value);
    const priceFieldValue = evt.target;

    if (Number(priceFieldValue.value) === guitarsPriceRange.priceMin) {
      return;
    }

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

    if (Number(priceFieldValue.value) === guitarsPriceRange.priceMax) {
      return;
    }

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

  const eventHandlers = {
    handleSortTypeButtonClick,
    handleSortOrderButtonClick,
    handleGuitarTypeChange,
    handleGuitarStringsCountChange,
    handleMinPriceChange,
    handleMaxPriceChange,
  } as const;

  return eventHandlers;
};
