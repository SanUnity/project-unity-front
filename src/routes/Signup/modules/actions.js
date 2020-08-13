// import apiFetch from 'utils/apiFetch';
import apiFetch from 'utils/apiFetch';
import { API_URLS } from 'constants/apiConf';
import { loadingAction } from '../../../store/globalState/global';

import { SIGNUP_INIT, SIGNUP_SUCCESS, SIGNUP_FAILURE } from './types';

export function fetchSignupInit() {
  return {
    type: SIGNUP_INIT,
  };
}

export function fetchSignupSuccess(phone) {
  return {
    type: SIGNUP_SUCCESS,
    payload: {
      phone,
    },
  };
}

export function fetchSignupFailure(error) {
  return {
    type: SIGNUP_FAILURE,
    payload: error,
  };
}

export default function fetchSignupAction(params) {
  return (dispatch) => {
    dispatch(loadingAction(true));
    dispatch(fetchSignupInit());
    return apiFetch({
      method: 'POST',
      url: API_URLS.userSignup,
      params,
      withAuthorization: false,
    })
      .then(() => {
        dispatch(fetchSignupSuccess(params.phone));
        dispatch(loadingAction(false));
      })
      .catch((err) => {
        dispatch(
          fetchSignupFailure(err?.response?.data || { message: 'signupError' }),
        );
        dispatch(loadingAction(false));
      });
  };
}
