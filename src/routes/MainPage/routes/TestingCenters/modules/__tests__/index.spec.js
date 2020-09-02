import initialState from 'store/globalState/initialState';
import deepFreeze from 'deep-freeze';
import locationReducer from '..';
import configureStore from 'store/configureStore';
import { SAVE_LOCATION } from '../types';
import { saveLocation } from '../actions';

describe('locationReducer', () => {
  it('SAVE_LOCATION', () => {
    const state = initialState.location;
    const action = {
      type: SAVE_LOCATION,
    };

    deepFreeze(state);
    deepFreeze(action);

    expect(locationReducer(state, action)).toEqual({});
  });

  it('default', () => {
    const action = {
      type: '',
    };

    deepFreeze(action);

    expect(locationReducer({}, action)).toEqual({});
  });
});

describe('saveLocation', () => {
  let store;
  const location = {};

  beforeAll(() => {
    store = configureStore({ location });
    store.dispatch(saveLocation({ location: 'location' }));
  });

  it('should save location', () => {
    expect(store.getState().location).toEqual({ location: 'location' });
  });
});
