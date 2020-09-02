import EN from 'i18n/EN';
import i18nReducer from '..';
import configureStore from 'store/configureStore';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { LOADING } from 'store/globalState/global';
import { setPlatformLanguage, setPlatformLanguageAction } from '../actions';
import { SET_PLATFORM_LANGUAGE } from '../types';

describe('i18nReducer', () => {
  const param = {
    type: SET_PLATFORM_LANGUAGE,
    payload: 'es',
  };

  const INITIAL_LANG_CONF = {
    language: 'en',
    literals: EN.en,
  };

  expect(i18nReducer(INITIAL_LANG_CONF, param)).not.toEqual(INITIAL_LANG_CONF);

  param.type = 'TYPE_THAT_DOESNT_EXIST';

  expect(i18nReducer(INITIAL_LANG_CONF, param)).toEqual(INITIAL_LANG_CONF);
});

describe('setPlatformLanguageAction', () => {
  let store;
  const i18n = {
    language: '',
    literals: {},
  };

  beforeAll(() => {
    store = configureStore({ i18n });
    store.dispatch(setPlatformLanguage('en'));
  });

  it('sets platform language', () => {
    expect(store.getState().i18n.language).toEqual('en');
  });
});

const middleware = [thunk];

const mockStore = configureMockStore(middleware);
describe('setPlatformLanguageAction', () => {
  let store;
  beforeAll(() => {
    jest.useFakeTimers();
    store = mockStore({});
  });

  it('triggers proper actions', () => {
    const expectedActions = [
      { type: LOADING, payload: true },
      { type: SET_PLATFORM_LANGUAGE, payload: 'en' },
      { type: LOADING, payload: false },
    ];

    store.dispatch(setPlatformLanguageAction('en'));
    jest.runAllTimers();
    expect(store.getActions()).toEqual(expectedActions);
  });
});
