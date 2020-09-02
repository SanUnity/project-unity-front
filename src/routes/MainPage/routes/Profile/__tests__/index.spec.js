import React from 'react';
import EN from 'i18n/EN';
import { shallow } from 'enzyme';
import history from 'store/history';
import EditProfile from 'components/EditProfile';
import { sessionService } from 'redux-react-session';
import Profile from '../components';
import ExitRequestTab from '../components/ExitRequestTab';

let wrapper;

// don't care about HOC logic
jest.mock('..', () => <></>);
jest.mock('routes/Results/container', () => <></>);

let mockApiFetch = Promise.resolve({ name: 'name' });

jest.mock('utils/apiFetch', () => {
  return jest.fn(() => mockApiFetch);
});

const props = {
  literals: EN.en.profile,
  literalsResults: EN.en.results,
  literalsPCR: EN.en,
  match: { params: { profileID: 1, mode: 'pcr', requestID: 1 } },
  showLoading: jest.fn(),
  profiles: [],
  phone: '1234567890',
};

describe('Profile tests', () => {
  beforeAll(() => {
    wrapper = shallow(<Profile {...props} />);
  });

  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.state().currentActiveTabIndex).toEqual(2);

    props.match.params.mode = 'request';
    const wrapper2 = shallow(<Profile {...props} />);
    expect(wrapper2.state().currentActiveTabIndex).toEqual(3);

    props.match.params.mode = '';
    const wrapper3 = shallow(<Profile {...props} />);
    expect(wrapper3.state().currentActiveTabIndex).toEqual(1);
  });

  it('componentDidUpdate', () => {
    wrapper.setProps({ profiles: [{ id: 1, name: 'John Doe' }] });
  });

  it('componentWillUnmount', () => {
    history.goForward = jest.fn();
    wrapper.instance().componentWillUnmount();
    expect(history.goForward).toHaveBeenCalledTimes(1);
  });

  it('labelClicked', () => {
    wrapper.instance().labelClicked(1);
    expect(wrapper.state().currentActiveTabIndex).toEqual(1);
  });

  it('setProfileHistory', () => {
    const profileHistory = {};
    wrapper.instance().setProfileHistory(profileHistory);
    expect(wrapper.state().profile.history).toEqual(profileHistory);
  });

  it('showTabContent', () => {
    wrapper.setState(
      {
        currentActiveTabIndex: 3,
        profile: { name: 'John Doe', exitRequests: [{ id: 1 }] },
      },
      () => {
        wrapper.instance().showTabContent();
        expect(wrapper.find(ExitRequestTab).length).toBe(1);

        wrapper.setProps(
          { match: { params: { mode: 'pcr', profileID: 1 } } },
          () => {
            wrapper.instance().showTabContent();
            wrapper.setState({ profile: { name: 'John Doe' } }, () => {
              wrapper.instance().showTabContent();
              wrapper.setState({ currentActiveTabIndex: 4 }, () => {
                wrapper.instance().showTabContent();
              });
            });
          },
        );
      },
    );
  });

  it('renders all cases', () => {
    wrapper.setState({ showEditProfile: true }, () => {
      expect(wrapper.find(EditProfile).length).toBe(1);

      wrapper.setState(
        {
          showEditProfile: false,
          loaded: true,
          profile: { name: 'John Doe', exitRequests: [{ id: 1 }] },
          showPCRTestForm: true,
          test: {},
        },
        () => {
          expect(wrapper.find('.overlay').length).toBe(1);

          wrapper
            .find('img[src$="green-arrow.svg"]')
            .at(0)
            .simulate('click', {});

          expect(wrapper.state().showPCRTestForm).toEqual(false);
        },
      );
    });
  });

  it('handleShowPCRForm', () => {
    const test = {
      firstTest: false,
      profileID: 1,
    };
    wrapper.instance().handleShowPCRForm(test);
    expect(wrapper.state().test).toEqual(test);

    test.firstTest = true;
    wrapper.instance().handleShowPCRForm(test);
    expect(wrapper.state().test).toEqual(test);

    mockApiFetch = Promise.reject(Error('API is down'));
    wrapper.instance().handleShowPCRForm(test);
    expect(wrapper.state().test).toEqual(test);
  });

  it('handleSubmit v1', () => {
    mockApiFetch = Promise.resolve({
      haveVerifyEmail: true,
      haveVerifyPhone: true,
    });

    sessionService.loadUser = jest.fn(() => Promise.resolve({
      profiles: [
        { id: 1, pcr: [{ id: 1 }, { id: 2 }] },
        { id: 2, pcr: [{ id: 2 }] },
      ],
    }));

    const answers = {
      resultTest: '5',
    };

    wrapper.instance().handleSubmit(answers);
  });

  it('handleSubmit v2', () => {
    const answers = {
      resultTest: '5',
    };
    mockApiFetch = Promise.resolve({
      haveVerifyEmail: false,
      haveVerifyPhone: true,
    });

    wrapper.instance().handleSubmit(answers);
  });

  it('handleSubmit v2', () => {
    const answers = {
      resultTest: '5',
    };
    mockApiFetch = Promise.resolve({
      haveVerifyEmail: false,
      haveVerifyPhone: false,
    });

    wrapper.instance().handleSubmit(answers);
  });

  it('handleSubmit error', () => {
    const answers = {
      resultTest: '5',
    };
    mockApiFetch = Promise.reject(Error('API is down'));
    wrapper.instance().handleSubmit(answers);
    expect(wrapper.state().showPCRTestForm).toEqual(false);
  });

  it('handleValidateField v1', () => {
    const values = {
      emailValidate: true,
      phoneValidate: true,
    };

    mockApiFetch = Promise.resolve({
      email: 'email@email.email',
      phone: '1234567890',
    });

    sessionService.saveUser = jest.fn(() => Promise.resolve({
      profiles: [
        { id: 1, pcr: [{ id: 1 }, { id: 2 }] },
        { id: 2, pcr: [{ id: 3 }] },
      ],
    }));

    wrapper.setState({ test: { id: 1, profileID: 1 } }, () => {
      wrapper.instance().handleValidateField(values);
      expect(wrapper.state().showPCRTestForm).toEqual(false);
    });
  });

  it('handleValidateField v2', () => {
    const values = {
      emailValidate: false,
      phoneValidate: false,
    };

    mockApiFetch = Promise.resolve({});

    sessionService.saveUser = jest.fn(() => Promise.resolve({
      profiles: [
        { id: 1, pcr: [{ id: 1 }, { id: 2 }] },
        { id: 2, pcr: [{ id: 3 }] },
      ],
    }));

    wrapper.setState({ test: { id: 1, profileID: 1 } }, () => {
      wrapper.instance().handleValidateField(values);
      expect(wrapper.state().showPCRTestForm).toEqual(false);
    });
  });

  it('handleValidateField error', () => {
    mockApiFetch = Promise.reject(Error('API is down'));

    wrapper.instance().handleValidateField({});
  });
});
