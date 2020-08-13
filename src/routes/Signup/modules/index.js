import initialState from '../../../store/globalState/initialState';

import {
  SIGNUP_INIT,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from './types';

export default function signupReducer(state = initialState.signup, action) {
  switch (action.type) {
    case SIGNUP_INIT:
      return {
        error: '',
        otp: '',
        phone: '',
      };
    case SIGNUP_SUCCESS:
      return {
        error: '',
        otp: '',
        phone: action.payload.phone,
      };
    case SIGNUP_FAILURE:
      return {
        error: action.payload,
        otp: '',
        phone: '',
      };
    default:
      return state;
  }
}
