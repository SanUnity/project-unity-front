
import { loadingAction } from 'store/globalState/global';
import apiFetch from 'utils/apiFetch';
import { API_URLS } from 'constants/apiConf';
import UserSession from 'routes/App/userSession';
import { PHONE_VALIDATION_INIT, PHONE_VALIDATION_SUCCESS, PHONE_VALIDATION_FAILURE } from './types';


export function phoneValidationInit() {
  return {
    type: PHONE_VALIDATION_INIT,
  };
}

export function phoneValidationSuccess() {
  return {
    type: PHONE_VALIDATION_SUCCESS,
  };
}

export function phoneValidationFailure(error) {
  return {
    type: PHONE_VALIDATION_FAILURE,
    payload: error,
  };
}

export default function phoneValidationAction(validationForm) {
  return (dispatch) => {
    dispatch(loadingAction(true));
    dispatch(phoneValidationInit());

    return apiFetch({
      method: 'POST',
      url: API_URLS.userValidate,
      params: validationForm,
    })
      .then(async (res) => {
        if (typeof res === 'string') {
          dispatch(phoneValidationFailure('error'));
          dispatch(loadingAction(false));
          return;
        }
        await UserSession.updateSession(res);
        dispatch(phoneValidationSuccess());
        dispatch(loadingAction(false));
      })
      .catch((err) => {
        dispatch(
          phoneValidationFailure(err?.response?.data || { message: 'otpError' }),
        );
        dispatch(loadingAction(false));
      });
  };
}

export function userSignupAnonymousAction(validationForm) {
  return (dispatch) => {
    dispatch(loadingAction(true));
    dispatch(phoneValidationInit());

    return apiFetch({
      method: 'POST',
      url: API_URLS.userSignupAnonymous,
      params: validationForm,
    })
      .then(async (res) => {
        if (typeof res === 'string') {
          dispatch(phoneValidationFailure('error'));
          dispatch(loadingAction(false));
          return;
        }

        await UserSession.updateSession(res);
        dispatch(phoneValidationSuccess());
        dispatch(loadingAction(false));
      })
      .catch((err) => {
        dispatch(
          phoneValidationFailure(err?.response?.data || { message: 'otpError' }),
        );
        dispatch(loadingAction(false));
      });
  };
}
