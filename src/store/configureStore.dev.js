import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import history from './history';
import createRootReducer from './globalState';

const routerReduxMiddleware = routerMiddleware(history);
const enhancers = [];

const middlewares = [
  thunk,
  routerReduxMiddleware,
];

// eslint-disable-next-line
const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
  enhancers.push(devToolsExtension());
}

const enhancer = compose(
  applyMiddleware(...middlewares),
  ...enhancers,
);

export default function configureStore(initialState) {
  const store = createStore(
    createRootReducer(history),
    initialState,
    enhancer,
  );

  return store;
}
