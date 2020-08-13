import initialState from '../../../store/globalState/initialState';

import { PHONE_VALIDATION_INIT, PHONE_VALIDATION_SUCCESS, PHONE_VALIDATION_FAILURE } from './types';

export default function phoneValidationReducer(state = initialState.signup, action) {
  switch (action.type) {
    case PHONE_VALIDATION_INIT:
    case PHONE_VALIDATION_SUCCESS:
      return {
        error: '',
        success: action.payload,
      };
    case PHONE_VALIDATION_FAILURE:
      return {
        error: action.payload,
        success: '',
      };
    default:
      return state;
  }
}
