import { Route, Switch, Redirect } from 'react-router-dom';

import CatalogPage from '../catalog-page/catalog-page';
import Header from '../header/header';
import Footer from '../footer/footer';
import Page404 from '../page-404/page-404';
import { AppRoute } from '../../constants/routes';
import GuitarPage from '../guitar-page/guitar-page';

const CATALOG_FIRST_PAGE = 1;

function App(): JSX.Element {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={AppRoute.getMainRoute()}>
          <Redirect to={AppRoute.getCatalogRoute(CATALOG_FIRST_PAGE)} />
        </Route>
        <Route exact path={AppRoute.getCatalogRoute()}>
          <CatalogPage />
        </Route>
        <Route exact path={AppRoute.getGuitarsRoute()}>
          <GuitarPage />
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
