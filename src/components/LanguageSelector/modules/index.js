import i18n from '../../../i18n';
import { getBrowserLanguage } from '../../../utils/language';

import {
  SET_PLATFORM_LANGUAGE,
} from './types';

const LOCAL_LANG = localStorage.getItem('USER_LANG');
const USER_LANG = LOCAL_LANG || getBrowserLanguage();

const INITIAL_LANG_CONF = {
  language: USER_LANG,
  literals: i18n[USER_LANG],
};

export default function i18nReducer(state = INITIAL_LANG_CONF, { type, payload: language }) {
  switch (type) {
    case SET_PLATFORM_LANGUAGE:
      return {
        language,
        literals: i18n[language],
      };
    default:
      return state;
  }
}
