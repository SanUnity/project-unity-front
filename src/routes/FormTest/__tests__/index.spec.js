import React from 'react';
import { shallow, mount } from 'enzyme';
import EN from 'i18n/EN';
import { getFormConfigurationByMunicipality } from 'utils';
import { TEST_RESUL_LOW } from 'constants/tests';
import history from 'store/history';
import moxios from 'moxios';
import { sessionService } from 'redux-react-session';
import FormTest, { TYPE_NONE } from '../components';
import StepProvider from '../providers/stepProvider';

const MockedStepProvider = () => {
  return <div>mocked stepProvider</div>;
};

jest.mock('../providers/stepProvider', () => jest.fn());
StepProvider.mockImplementation(MockedStepProvider);

const loadUser = jest.fn(() => ({
  profiles: [],
}));
const saveUser = jest.fn();

const originalLoadUser = sessionService.loadUser;
const originalSaveUser = sessionService.saveUser;

function mockSessionService() {
  sessionService.loadUser = loadUser;
  sessionService.saveUser = saveUser;
}

function resetSessionService() {
  sessionService.loadUser = originalLoadUser;
  sessionService.saveUser = originalSaveUser;
}

Element.prototype.scrollTo = jest.fn();

const LOCAL_MUNICIPALITY = localStorage.getItem('CONF_MUNICIPALITY');

const formTestConf = getFormConfigurationByMunicipality(LOCAL_MUNICIPALITY);

const MOCK_TEST_DATA = {
  age: '23',
  gender: 'male',
  lastname1: '',
  name: 'WingMill',
  postalCode: '20891',
  fever: 'yes',
  headache: 'yes',
  chestPain: 'yes',
  breathing: 'yes',
};

function initTestData(data = MOCK_TEST_DATA) {
  localStorage.setItem('testDetails', JSON.stringify(data));
}

function resetTestData() {
  localStorage.removeItem('testDetails');
}

const props = {
  match: {},
  literals: EN.en.formTest,
  location: {
    pathname: '2',
  },
  result: {},
  showLoading: jest.fn(),
  formTestConf,
};

describe('FormTest tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FormTest {...props} />);
    moxios.install();
  });

  afterEach(() => {
    wrapper.unmount();
    moxios.uninstall();
  });

  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('checks for results & if they are existing it redirects user to results page', () => {
    wrapper.setProps({
      result: {
        id: 'somevalidid',
        level: TEST_RESUL_LOW,
      },
    });

    expect(history.location.pathname).toBe('/results');
  });

  it('determines type if user has cached data', () => {
    initTestData();
    const wrapper2 = shallow(<FormTest {...props} />);
    expect(wrapper2.state().type).not.toBe(TYPE_NONE);

    wrapper2.setProps({
      result: {
        id: 'somevalidid',
        level: TEST_RESUL_LOW,
      },
    });

    resetTestData();
  });

  it('creates user if (s)he does not exist & checks for postal code(when moving from step 1 to step 2)', (done) => {
    mockSessionService();
    localStorage.removeItem('profile');

    const mountedWrapper = mount(
      <FormTest {...props} location={{ pathname: 'form-step/1' }} />,
    );

    mountedWrapper.find('mockConstructor').props().onNextPage();

    moxios.wait(async () => {
      let recentRequest = moxios.requests.mostRecent();
      await recentRequest.respondWith({
        status: 200,
        response: [
          {
            someprop: 'testvalue',
          },
        ],
      });

      const mockProfile = {
        user: 'test',
      };

      moxios.wait(async () => {
        recentRequest = moxios.requests.mostRecent();
        await recentRequest.respondWith({
          status: 200,
          response: mockProfile,
        });

        expect(JSON.parse(localStorage.getItem('profile'))).toEqual(mockProfile);
        expect(loadUser).toBeCalled();
        expect(saveUser).toBeCalled();
        resetSessionService();
        done();
      });
    });
  });

  it('updates data successfully from StepProvider', () => {
    initTestData();
    const mountedWrapper = mount(
      <FormTest {...props} />,
    );

    const mockUpdateObj = {
      someTest: 'test',
    };
    mountedWrapper.find('mockConstructor').props().updateData(mockUpdateObj);

    expect(mountedWrapper.state().data).toEqual({ ...MOCK_TEST_DATA, ...mockUpdateObj });

    resetTestData();
  });

  it('triggers handleSubmit on the last step', () => {
    initTestData();

    const submitTest = jest.fn();

    const mountedWrapper = mount(
      <FormTest {...props} submitTest={submitTest} />,
    );


    mountedWrapper.setState({
      numberOfSteps: 3,
      stepsCounter: 3,
    });


    mountedWrapper.find('mockConstructor').props().onNextPage();
    expect(submitTest).toBeCalled();
  });


  it('redirects user on the begining of the test if submission has failed', () => {
    initTestData();

    const submitTest = jest.fn(() => {
      // eslint-disable-next-line no-throw-literal
      throw {
        response: {
          status: 402,
        },
      };
    });

    const mountedWrapper = mount(
      <FormTest {...props} submitTest={submitTest} />,
    );


    mountedWrapper.setState({
      numberOfSteps: 3,
      stepsCounter: 3,
    });


    mountedWrapper.find('mockConstructor').props().onNextPage();
    expect(submitTest).toBeCalled();
    expect(history.location.pathname).toBe('/main/test');
  });
});
