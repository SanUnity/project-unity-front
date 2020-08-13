import initialState from 'store/globalState/initialState';
import {
  SIGNUP_INIT,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from 'routes/Signup/modules/types';
import signupReducer from 'routes/Signup/modules';
import deepFreeze from 'deep-freeze';
import fetchSignupAction, {
  fetchSignupInit,
  fetchSignupSuccess,
  fetchSignupFailure,
} from 'routes/Signup/modules/actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { LOADING } from 'store/globalState/global';
import configureStore from '../../../../store/configureStore';

describe('SignUp reducer', () => {
  it('SIGNUP_INIT success', () => {
    const state = initialState.signup;
    const action = {
      type: SIGNUP_INIT,
    };

    deepFreeze(state);
    deepFreeze(action);

    expect(signupReducer(state, action)).toEqual({
      error: '',
      otp: '',
      phone: '',
    });
  });

  it('SIGNUP_SUCCESS success', () => {
    const state = initialState.signup;
    const action = {
      type: SIGNUP_SUCCESS,
      payload: {
        phone: '1234567890',
        otp: '123456',
      },
    };

    deepFreeze(state);
    deepFreeze(action);

    expect(signupReducer(state, action)).toEqual({
      error: '',
      ...action.payload,
    });
  });

  it('SIGNUP_FAILURE success', () => {
    const state = initialState.signup;
    const errorMsg = 'signup failure';
    const action = {
      type: SIGNUP_FAILURE,
      payload: errorMsg,
    };

    deepFreeze(state);
    deepFreeze(action);

    expect(signupReducer(state, action)).toEqual({
      error: errorMsg,
      otp: '',
      phone: '',
    });
  });
});

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

describe('signupInit', () => {
  let store;
  const signup = {
    error: '',
    phone: '',
    otp: '',
  };

  beforeAll(() => {
    store = configureStore({ signup });
    store.dispatch(fetchSignupInit());
  });

  it('should init error message', () => {
    expect(store.getState().signup.error).toBe('');
  });

  it('should init otp', () => {
    expect(store.getState().signup.otp).toBe('');
  });

  it('should init phone', () => {
    expect(store.getState().signup.phone).toBe('');
  });
});

describe('signupSuccess', () => {
  let store;
  const signup = {
    error: '',
    phone: '',
    otp: '',
  };

  beforeAll(() => {
    store = configureStore({ signup });
    store.dispatch(fetchSignupSuccess('1234567890'));
  });

  it('should add phone number that has length of 10 chars', () => {
    expect(store.getState().signup.phone.length).toBe(10);
  });
});

describe('signupFailure', () => {
  let store;
  const errorMsg = 'failed signup';
  const signup = {
    error: '',
    phone: '',
    otp: '',
  };

  beforeAll(() => {
    store = configureStore({ signup });
    store.dispatch(fetchSignupFailure(errorMsg));
  });

  it('should add error message', () => {
    expect(store.getState().signup.error).toBe(errorMsg);
  });
});

describe('SignUp Request', () => {
  let store;
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should add phone number that has length of 10 chars', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
      });
    });

    const expectedActions = [
      { type: LOADING, payload: true },
      { type: SIGNUP_INIT },
      { type: SIGNUP_SUCCESS, payload: { phone: '1234567890' } },
      { type: LOADING, payload: false },
    ];
    return store.dispatch(fetchSignupAction('1234567890')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('should fail if the provided phone is less than 10 chars long', (done) => {
    const errorMsg = 'failed to sign up';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: {
          message: errorMsg,
        },
      });
    });

    const expectedActions = [
      { type: LOADING, payload: true },
      { type: SIGNUP_INIT },
      {
        type: SIGNUP_FAILURE,
        payload: errorMsg,
      },
      { type: LOADING, payload: false },
    ];

    return store.dispatch(fetchSignupAction('1234')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
