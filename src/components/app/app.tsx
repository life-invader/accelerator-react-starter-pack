import { Route, Switch, Redirect } from 'react-router-dom';

import CatalogPage from '../catalog-page/catalog-page';
import Header from '../header/header';
import Footer from '../footer/footer';
import Page404 from '../page-404/page-404';
import { AppRoute } from '../../constants/routes';

const CATALOG_FIRST_PAGE = 1;

function App(): JSX.Element {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={AppRoute.Main()}>
          <Redirect to={AppRoute.Catalog(CATALOG_FIRST_PAGE)} />
        </Route>
        <Route exact path={AppRoute.Catalog()}>
          <CatalogPage />
        </Route>
        <Route exact path={AppRoute.Guitars()}>
          <Page404 />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
