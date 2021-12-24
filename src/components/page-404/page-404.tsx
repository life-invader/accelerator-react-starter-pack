import { Link } from 'react-router-dom';
import './page-404.css';

function Page404(): JSX.Element {
  return (
    <div className="page-404">
      <Link to='/' className="return">Вернуться на главную, которой нет</Link>
      <h1 className="error">404</h1>
    </div>
  );
}

export default Page404;
