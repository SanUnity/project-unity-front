import deepFreeze from 'deep-freeze';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import resultsReducer from '..';
import { getFormConfigurationByMunicipality } from 'utils';
import { sessionReducer as session, sessionService } from 'redux-react-session';
import { API_URLS } from 'constants/apiConf';
import { TEST_RESUL_HIGH } from 'constants/tests';
import { RESULTS_AQUIRED } from '../types';
import { submitTest } from '../actions';


const LOCAL_MUNICIPALITY = localStorage.getItem('CONF_MUNICIPALITY');

const formTestConf = {
  municipality: LOCAL_MUNICIPALITY || '0',
  questions: getFormConfigurationByMunicipality(LOCAL_MUNICIPALITY),
};

const mockSubmitData = {
  age: '24',
  breathing: false,
  defenses: true,
  diabetes: false,
  gender: 'male',
  hypertension: false,
  imss: false,
  lastTest: 1598087480,
  lastname1: 'sdasd',
  lastname2: 'sdasd',
  municipality: 'Miguel Hidalgo',
  municipalityID: 11,
  name: 'Community',
  newStep: 3,
  newSubstep: 2,
  numberExternal: '',
  numberInternal: '',
  obesity: true,
  postalCode: '11560',
  state: 'Ciudad de México',
  stateID: 1,
  street: '',
  suburb: 'Polanco V Sección,',
  suburbID: 1057,
  symptoms: true,
};

const mockTestResult = {
  folio: 'OwhBFnQBcrCcd3otoQJ-',
  id: 'OAhvFXQBcrCcd3otcgKZ',
  lastTest: 1598101234,
  level: TEST_RESUL_HIGH,
  name: 'Community',
};

const mockProfiles = [{
  id: 'OAhvFXQBcrCcd3otcgKZ',
  name: 'Community sdasd',
  lastTest: 1598101234,
  level: 'medium-high',
  postalCode: '11560',
  passStatus: 'good',
  exitRequests: [],
  pcr: [],
  isDefault: true,
}, {
  id: 'OAhvFXQBcrCcd3otcgK2',
  name: 'Community sdasd',
  lastTest: 1598101254,
  level: 'medium-high',
  postalCode: '11560',
  passStatus: 'good',
  exitRequests: [],
  pcr: [],
  isDefault: true,
}];

describe('RESULTS reducer', () => {
  it('RESULTS_AQUIRED success', () => {
    const action = {
      type: RESULTS_AQUIRED,
      payload: 'ok',
    };

    deepFreeze(action);

    expect(resultsReducer({}, action)).toBe(action.payload);
  });
});


const middleware = [thunk];

const mockStore = configureMockStore(middleware);

const originalSendTraceData = window.sendTraceData;


describe('submitTest', () => {
  let store;

  beforeAll(() => {
    window.sendTraceData = jest.fn();
  });

  beforeEach(() => {
    moxios.install();
    store = mockStore({
      session,
      formTestConf,
    });
    sessionService.initSessionService(store);
    sessionService.saveUser({
      id: 'testid',
      profiles: mockProfiles,
    });
  });


  afterEach(() => {
    moxios.uninstall();
  });

  it('submits test with data and updates the reducers', (done) => {
    const postalCodeData = [{
      suburbID: 1057,
      street: '',
      state: 'Ciudad de México',
      suburb: 'Polanco V Seccion',
    }];

    localStorage.setItem('postalCodeData', JSON.stringify(postalCodeData));

    moxios.stubRequest(new RegExp(`.*${API_URLS.userProfile}.*`), {
      response: mockTestResult,
    });

    return store.dispatch(submitTest(mockSubmitData, formTestConf.questions)).then(() => {
      expect(store.getActions().map(({ type }) => type).find(type => type === RESULTS_AQUIRED)).toBeTruthy();
      localStorage.removeItem('postalCodeData');
      done();
    });
  });

  afterAll(() => {
    window.sendTraceData = originalSendTraceData;
  });
});
