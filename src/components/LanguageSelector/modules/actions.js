import { loadingAction } from '../../../store/globalState/global';
import { SET_PLATFORM_LANGUAGE } from './types';

export function setPlatformLanguage(lang) {
  return {
    type: SET_PLATFORM_LANGUAGE,
    payload: lang,
  };
}

export function setPlatformLanguageAction(lang, removeLoader = true) {
  return (dispatch) => {
    dispatch(loadingAction(true));
    dispatch(setPlatformLanguage(lang));

    localStorage.setItem('USER_LANG', lang);

    setTimeout(() => {
      if (removeLoader) dispatch(loadingAction(false));
    }, 1000);
  };
}
