import { Route, Switch, Redirect } from 'react-router-dom';

import CatalogPage from '../catalog-page/catalog-page';
import Header from '../header/header';
import Footer from '../footer/footer';
import Page404 from '../page-404/page-404';

function App(): JSX.Element {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Redirect to='/catalog/page_1' />
        </Route>
        <Route exact path='/catalog/page_:page'>
          <CatalogPage />
        </Route>
        <Route exact path='/guitars/:id'>
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
