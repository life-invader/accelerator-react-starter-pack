import { Route, Switch, Redirect } from 'react-router-dom';

import CatalogPage from '../catalog-page/catalog-page';
import Page404 from '../page-404/page-404';
import { AppRoute } from '../../constants/routes';
import GuitarPage from '../guitar-page/guitar-page';
import AppLayout from '../app-layout/app-layout';

function App(): JSX.Element {
  return (
    <AppLayout>
      <Switch>
        <Route exact path={AppRoute.getMainRoute()}>
          <Redirect to={AppRoute.getCatalogRoute(true)} />
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
    </AppLayout>
  );
}

export default App;
