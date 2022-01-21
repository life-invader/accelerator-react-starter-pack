import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './components/app/app';
import { store } from './store/store';

const TOASTS_LIMIT = 1;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer limit={TOASTS_LIMIT} />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'));
