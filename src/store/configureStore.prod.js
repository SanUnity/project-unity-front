import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import history from './history';
import createRootReducer from './globalState';

const routerReduxMiddleware = routerMiddleware(history);

const middlewares = [
  thunk,
  routerReduxMiddleware,
];

const enhancer = compose(
  applyMiddleware(...middlewares),
);

export default function configureStore(initialState) {
  const store = createStore(
    createRootReducer(history),
    initialState,
    enhancer,
  );

  return store;
}
