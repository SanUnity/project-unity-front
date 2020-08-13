import { RESULTS_AQUIRED } from './types';

const resultsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case RESULTS_AQUIRED:
      return payload;

    default:
      return state;
  }
};

export default resultsReducer;
