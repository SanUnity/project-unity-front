import React from 'react';
import EN from 'i18n/EN';
import { shallow } from 'enzyme';
import { sessionService } from 'redux-react-session';
import history from 'store/history';
import EditProfile from '../components';

let wrapper;
const props = {
  literals: EN.en.profileDetails,
  showLoading: jest.fn(),
  id: '1',
  mainProfile: '',
};

// don't care about HOC logic
jest.mock('..', () => <></>);

jest.useFakeTimers();

let mockApiFetch = Promise.resolve({});

jest.mock('utils/apiFetch', () => {
  return jest.fn(() => mockApiFetch);
});

describe('EditProfile tests', () => {
  beforeAll(() => {
    wrapper = shallow(<EditProfile {...props} />);
  });

  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('handleDeleteProfile', () => {
    history.push = jest.fn();

    sessionService.loadUser = jest.fn(() => Promise.resolve({
      profiles: [
        {
          id: '1',
          pcr: [{ id: 1 }, { id: 2 }],
          exitRequests: [{ id: 1, timestamp: new Date() }],
        },
        {
          id: '2',
          pcr: [{ id: 2 }],
          exitRequests: [{ id: 2, timestamp: new Date() }],
        },
      ],
    }));

    sessionService.saveUser = jest.fn(() => Promise.resolve({
      profiles: [
        { id: 1, pcr: [{ id: 1 }, { id: 2 }] },
        { id: 2, pcr: [{ id: 3 }] },
      ],
    }));

    wrapper.instance().handleDeleteProfile();

    expect(props.showLoading).toHaveBeenCalledTimes(3);
  });

  it('handleDeleteProfile error', () => {
    mockApiFetch = Promise.reject(Error('API is down'));

    wrapper.instance().handleDeleteProfile();

    expect(props.showLoading).toHaveBeenCalledTimes(5);
  });

  const mockValidateCP = jest.fn();
  let actualValidateCP;

  it('handleEditProfile', () => {
    mockApiFetch = Promise.resolve({});
    actualValidateCP = wrapper.instance().validateCP;
    wrapper.instance().validateCP = mockValidateCP;
    wrapper.setState(
      {
        postalCodeData: [{ suburbID: 1 }, { suburbID: 2 }],
        dataInfo: {
          name: 'name',
          age: 35,
          postalCode: 12345,
          gender: 'male',
          municipalityID: 1,
          suburbID: 1,
        },
        currentMunicipaly: 'municipality',
        currentSuburb: 'suburb',
      },
      () => {
        wrapper.instance().handleEditProfile();
        expect(props.showLoading).toHaveBeenCalledTimes(7);

        wrapper.setState(
          {
            postalCodeData: [{ suburbID: 1 }, { suburbID: 2 }],
            dataInfo: {},
            currentMunicipaly: '',
            currentSuburb: '',
          },
          () => {
            wrapper.instance().handleEditProfile();
            expect(props.showLoading).toHaveBeenCalledTimes(7);

            wrapper.setState(
              {
                postalCodeData: [{ suburbID: 1 }, { suburbID: 2 }],
                dataInfo: {
                  name: 'name',
                  age: 35,
                  postalCode: 12345,
                  gender: 'male',
                  municipalityID: 1,
                  suburbID: 1,
                },
                currentMunicipaly: 'municipality',
                currentSuburb: 'suburb',
                isDefault: 'yes',
              },
              () => {
                wrapper.instance().handleEditProfile();
                jest.runAllTimers();
                expect(props.showLoading).toHaveBeenCalledTimes(8);
              },
            );
          },
        );
      },
    );
  });

  it('handleEditProfile error', () => {
    mockApiFetch = Promise.reject(Error('API is down'));
    wrapper.setState(
      {
        postalCodeData: [{ suburbID: 1 }, { suburbID: 2 }],
        dataInfo: {
          name: 'name',
          age: 35,
          postalCode: 12345,
          gender: 'male',
          municipalityID: 1,
          suburbID: 1,
        },
        currentMunicipaly: 'municipality',
        currentSuburb: 'suburb',
      },
      () => {
        wrapper.instance().handleEditProfile();
        expect(props.showLoading).toHaveBeenCalledTimes(11);
      },
    );
  });

  it('getUserInfo', () => {
    mockApiFetch = Promise.resolve({ postalCode: 12345 });
    wrapper.instance().getUserInfo();
  });

  it('getUserInfo error', () => {
    mockApiFetch = Promise.reject(Error('API is down'));
    wrapper.instance().getUserInfo();
    expect(props.showLoading).toHaveBeenCalledTimes(15);
  });

  it('handlePCInfo', () => {
    mockApiFetch = Promise.resolve({ postalCode: 12345 });
    const postalCodeData = [
      { suburbID: 1, stateID: 1, municipality: 'municipality' },
      { suburbID: 2 },
    ];

    wrapper.setState({ dataInfo: { suburbID: 1 } }, () => {
      wrapper.instance().handlePCInfo(postalCodeData);
      expect(wrapper.state().currentSuburb).toEqual(1);
      wrapper.setState({ dataInfo: { suburbID: 3 } }, () => {
        wrapper.instance().handlePCInfo(postalCodeData);
        wrapper.setState({ dataInfo: {} }, () => {
          wrapper.instance().handlePCInfo(postalCodeData);
        });
      });
    });
  });

  it('handleChangePC', () => {
    wrapper.instance().validateCP = actualValidateCP;
    const e = { target: { value: '12345' } };
    wrapper.instance().handleChangePC(e);
    e.target.value = '123456';
    wrapper.instance().handleChangePC(e);
  });

  it('handleChangePC error', () => {
    mockApiFetch = Promise.reject(Error('API is down'));
    const e = { target: { value: '12345' } };
    wrapper.instance().handleChangePC(e);
  });

  it('handleSelectSuburb', () => {
    const e = { target: { value: '1' } };
    wrapper.setState(
      {
        postalCodeData: [{ suburbID: 1 }, { suburbID: 2 }],
        dataInfo: {
          name: 'name',
          age: 35,
          postalCode: '12345',
          gender: 'male',
          municipalityID: 1,
          suburbID: 1,
        },
      },
      () => {
        wrapper.instance().handleSelectSuburb(e);
        expect(wrapper.state().changes).toEqual(true);
        e.target.value = '3';
        wrapper.setState(
          {
            postalCodeData: [{ suburbID: 1 }, { suburbID: 2 }],
            dataInfo: {
              name: 'name',
              age: 35,
              postalCode: '12345',
              gender: 'male',
              municipalityID: 1,
              suburbID: 1,
            },
          },
          () => {
            wrapper.instance().handleSelectSuburb(e);
          },
        );
      },
    );
  });

  it('handleChange', () => {
    const value = 'value';
    const name = 'name';
    wrapper.instance().handleChange(value, name);
    expect(wrapper.state().dataInfo).toEqual({
      ...wrapper.state().dataInfo,
      name: value,
    });
  });

  it('handleChangeState', () => {
    const value = 'value';
    const name = 'name';
    wrapper.instance().handleChangeState(value, name);
    expect(wrapper.state()[name]).toEqual(value);
  });
});
