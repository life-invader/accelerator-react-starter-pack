import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants/routes';
import { selectCurrentPage, selectTotalPages } from '../../store/pagination/selectors';

function CatalogPagination() {
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  // Массив, содержащий числа 1, 2, 3 и т.д для вывода номеров страниц
  const emptyTemplates = new Array(totalPages).fill(null).map((_null, index) => index + 1);

  return (
    <div className='pagination page-content__pagination'>
      <ul className='pagination__list'>

        {
          currentPage > 1 ?
            <li className='pagination__page pagination__page--next' id='previous'>
              <Link className='link pagination__page-link' to={AppRoute.getCatalogRoute(currentPage - 1)}>Назад</Link>
            </li> : ''
        }

        {
          emptyTemplates &&
          emptyTemplates.map((pageNumber, index) => (
            <li key={`${pageNumber}_${index + 1}`} className={`pagination__page ${pageNumber === currentPage ? 'pagination__page--active' : ''}`} >
              <Link className='link pagination__page-link' to={AppRoute.getCatalogRoute(pageNumber)}>{pageNumber}</Link>
            </li>
          ))
        }

        {
          currentPage < totalPages ?
            <li className='pagination__page pagination__page--next' id='next'>
              <Link className='link pagination__page-link' to={AppRoute.getCatalogRoute(currentPage + 1)}>Далее</Link>
            </li> : ''
        }

      </ul>
    </div >
  );
}

export default CatalogPagination;
