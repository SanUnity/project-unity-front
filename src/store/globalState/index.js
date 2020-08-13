import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import Reducers from './reducers';

export default history => combineReducers({
  router: connectRouter(history),
  ...Reducers,
});

// const rootReducer = (state, action) => appReducer(state, action);
// export default rootReducer;
