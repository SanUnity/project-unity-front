import phoneValidationReducer from '..';
import moxios from 'moxios';
import configureStore from 'store/configureStore';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { LOADING } from 'store/globalState/global';
import initialState from 'store/globalState/initialState';
import phoneValidationAction, {
  phoneValidationInit,
  phoneValidationSuccess,
  phoneValidationFailure,
  userSignupAnonymousAction,
} from '../actions';
import {
  PHONE_VALIDATION_INIT,
  PHONE_VALIDATION_SUCCESS,
  PHONE_VALIDATION_FAILURE,
} from '../types';
import UserSession from 'routes/App/userSession';

describe('phoneValidationReducer', () => {
  it('PHONE_VALIDATION_INIT success', () => {
    const action = {
      type: PHONE_VALIDATION_INIT,
      payload: 'success',
    };
    const state = initialState.signup;

    const RESULT = {
      error: '',
      success: 'success',
    };

    expect(phoneValidationReducer(state, action)).toEqual(RESULT);

    action.type = 'TYPE_THAT_DOESNT_EXIST';

    expect(phoneValidationReducer(state, action)).not.toEqual(RESULT);
  });

  it('PHONE_VALIDATION_SUCCESS success', () => {
    const action = {
      type: PHONE_VALIDATION_SUCCESS,
      payload: 'success',
    };
    const state = initialState.signup;

    const RESULT = {
      error: '',
      success: 'success',
    };

    expect(phoneValidationReducer(state, action)).toEqual(RESULT);
  });

  it('PHONE_VALIDATION_FAILURE success', () => {
    const action = {
      type: PHONE_VALIDATION_FAILURE,
      payload: 'failure',
    };
    const state = initialState.signup;

    const RESULT = {
      error: 'failure',
      success: '',
    };

    expect(phoneValidationReducer(state, action)).toEqual(RESULT);
  });
});

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

describe('phoneValidationInit', () => {
  let store;
  const validation = {
    success: '',
    error: '',
  };

  it('inits empty validation object in store', () => {
    store = configureStore({ validation });
    store.dispatch(phoneValidationInit());
    expect(store.getState().validation.success).toEqual(undefined);
    expect(store.getState().validation.error).toEqual('');
  });
});

describe('phoneValidationSuccess', () => {
  let store;
  const validation = {
    success: '',
    error: '',
  };

  it('should add phone number that has length of 10 chars', () => {
    store = configureStore({ validation });
    store.dispatch(phoneValidationSuccess());
    expect(store.getState().validation.success).toEqual(undefined);
    expect(store.getState().validation.error).toEqual('');
  });
});

describe('phoneValidationFailure', () => {
  let store;
  const validation = {
    success: '',
    error: '',
  };

  it('should add phone number that has length of 10 chars', () => {
    const errorMessage = 'error!';
    store = configureStore({ validation });
    store.dispatch(phoneValidationFailure(errorMessage));
    expect(store.getState().validation.success).toEqual('');
    expect(store.getState().validation.error).toEqual(errorMessage);
  });
});

describe('phoneValidationAction Request', () => {
  let store;
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should dispatch success when phone validates', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: '1234567890',
      });
    });
    UserSession.updateSession = jest.fn();

    const expectedActions = [
      { type: LOADING, payload: true },
      { type: PHONE_VALIDATION_INIT },
      {
        type: PHONE_VALIDATION_SUCCESS,
      },
      { type: LOADING, payload: false },
    ];
    return store.dispatch(phoneValidationAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch failure when phone does not validate', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'not quite a phone number',
      });
    });
    UserSession.updateSession = jest.fn();

    const expectedActions = [
      { type: LOADING, payload: true },
      { type: PHONE_VALIDATION_INIT },
      {
        type: PHONE_VALIDATION_FAILURE,
        payload: 'error',
      },
      { type: LOADING, payload: false },
    ];
    return store.dispatch(phoneValidationAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch failure when request fails', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
      });
    });

    const expectedActions = [
      { type: LOADING, payload: true },
      { type: PHONE_VALIDATION_INIT },
      {
        type: PHONE_VALIDATION_FAILURE,
        payload: { message: 'otpError' },
      },
      { type: LOADING, payload: false },
    ];

    return store.dispatch(phoneValidationAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});

describe('userSignupAnonymousAction Request', () => {
  let store;
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should dispatch success when phone validates', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: '1234567890',
      });
    });
    UserSession.updateSession = jest.fn();

    const expectedActions = [
      { type: LOADING, payload: true },
      { type: PHONE_VALIDATION_INIT },
      {
        type: PHONE_VALIDATION_SUCCESS,
      },
      { type: LOADING, payload: false },
    ];
    return store.dispatch(userSignupAnonymousAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch failure when phone does not validate', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'not quite a phone number',
      });
    });
    UserSession.updateSession = jest.fn();

    const expectedActions = [
      { type: LOADING, payload: true },
      { type: PHONE_VALIDATION_INIT },
      {
        type: PHONE_VALIDATION_FAILURE,
        payload: 'error',
      },
      { type: LOADING, payload: false },
    ];
    return store.dispatch(userSignupAnonymousAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch failure when request fails', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
      });
    });

    const expectedActions = [
      { type: LOADING, payload: true },
      { type: PHONE_VALIDATION_INIT },
      {
        type: PHONE_VALIDATION_FAILURE,
        payload: { message: 'otpError' },
      },
      { type: LOADING, payload: false },
    ];

    return store.dispatch(userSignupAnonymousAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
