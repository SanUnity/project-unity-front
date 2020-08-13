import initialState from 'store/globalState/initialState';
import { SAVE_LOCATION } from './types';

export default function locationReducer(state = initialState.location, { type, payload }) {
  switch (type) {
    case SAVE_LOCATION:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
}
