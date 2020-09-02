import formTestReducer, { baseConf } from '..';
import deepFreeze from 'deep-freeze';
import utils from 'utils';
import setMunicipalityConfigurationAction, {
  setFormTestConfiguration,
} from '../actions';
import { FORM_CDMX } from 'constants/testConfiguration';
import { LOADING } from 'store/globalState/global';

let store;

describe('FormTest reducer', () => {
  beforeEach(() => {
    store = utils.test.initMockStore({});
  });
  it('SET_FORM_CONFIGURATION success', () => {
    const state = baseConf;
    const mockUpdate = {
      someprop: 'test',
    };
    const action = setFormTestConfiguration(mockUpdate);

    deepFreeze(state);
    deepFreeze(action);

    expect(formTestReducer(state, action)).toEqual({
      ...state,
      ...mockUpdate,
    });
  });

  it('sets config by municipality', () => {
    const municipality = '1';
    store.dispatch(setMunicipalityConfigurationAction(municipality));

    const expectedActions = [
      {
        type: LOADING,
        payload: true,
      },
      setFormTestConfiguration({ municipality, questions: FORM_CDMX }),
      {
        type: LOADING,
        payload: false,
      },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('defaults on other actions', () => {
    const action = {
      type: 'sometestaction',
    };
    deepFreeze(action);

    expect(formTestReducer(undefined, action)).toEqual(baseConf);
  });
});
