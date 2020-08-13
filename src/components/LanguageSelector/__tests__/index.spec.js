import EN from 'i18n/EN';
import i18nReducer from '../modules';

const param = {
  type: 'SET_PLATFORM_LANGUAGE',
  payload: 'es',
};

const INITIAL_LANG_CONF = {
  language: 'en',
  literals: EN.en,
};


it('changes language', () => {
  expect(i18nReducer(INITIAL_LANG_CONF, param)).not.toEqual(INITIAL_LANG_CONF);

  param.type = 'TYPE_THAT_DOESNT_EXIST';

  expect(i18nReducer(INITIAL_LANG_CONF, param)).toEqual(INITIAL_LANG_CONF);
});
