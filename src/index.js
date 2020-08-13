import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { sessionService } from 'redux-react-session';
import UserSession from 'routes/App/userSession';
import { loadingAction } from 'store/globalState/global';
import store from './store';
import { ROUTE_PATH } from './routes';
import App from './routes/App';
import { unregister } from './serviceWorker';

import 'utils/polyfills';
import 'utils/nativeScripts';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/index.css';

async function validateSession() {
  try {
    store.dispatch(loadingAction(true));
    await UserSession.checkSession();
    store.dispatch(loadingAction(false));
    return true;
  } catch (err) {
    store.dispatch(loadingAction(false));
    return false;
  }
}

const sessionOptions = {
  refreshOnCheckAuth: true,
  redirectPath: ROUTE_PATH.BASEROUTE,
  validateSession,
};

sessionService
  .initSessionService(store, sessionOptions)
  .then()
  .catch(err => console.error(err));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
unregister();
