import React from 'react';
import { shallow } from 'enzyme';
import EN from 'i18n/EN';
import UserSession from 'routes/App/userSession';
import { wrapInRouter } from 'setupTests';
import Terms from 'routes/Signup/components/Terms';
import history from 'store/history';
import SignupOptions from '../components';

let wrapper;

jest.mock('..', () => <></>);

const premockFunc = UserSession.checkSession;

describe('SignupOptions', () => {
  const props = {
    literals: EN.en,
    showLoading: jest.fn(),
    onSignupAnonymous: Promise.resolve({}),
  };

  beforeAll(() => {
    UserSession.checkSession = jest.fn();
    wrapper = shallow(<SignupOptions {...props} />);
  });

  afterAll(() => {
    UserSession.checkSession = premockFunc;
  });

  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('checks for session', () => {
    const wrappedInRouter = wrapInRouter(
      <SignupOptions {...props} />,
      '/signup-options',
    );

    /** wait for component mount */
    expect(UserSession.checkSession).toBeCalled();
    expect(props.showLoading).toBeCalled();
    setTimeout(() => wrappedInRouter.unmount(), 0);
  });

  it('shows terms for anonymous user', () => {
    UserSession.checkSession = jest.fn(() => {
      throw Error('error');
    });

    const wrappedInRouter = wrapInRouter(
      <SignupOptions {...props} />,
      '/signup-options',
    );

    const signUpOptionsWrapper = wrappedInRouter.find(SignupOptions);

    expect(signUpOptionsWrapper.state().showTerms).toBeFalsy();

    signUpOptionsWrapper.find('.link-anonymous').simulate('click');

    expect(signUpOptionsWrapper.state().showTerms).toBeTruthy();

    signUpOptionsWrapper.setState({
      showTerms: true,
    });

    wrappedInRouter.update();

    const updatedSignUpOptions = wrappedInRouter.find(SignupOptions);

    expect(updatedSignUpOptions.find('button').exists()).toBeTruthy();

    updatedSignUpOptions
      .find(Terms)
      .find('input[type="checkbox"]')
      .simulate('change', {
        target: {
          checked: true,
        },
      });

    expect(updatedSignUpOptions.find(Terms).state().cbAgree).toBeTruthy();
    updatedSignUpOptions.find('button').simulate('click');
  });

  it('handleContinueAnonymous', async () => {
    jest.useFakeTimers();
    wrapper.setProps({ onSignupAnonymous: () => Promise.resolve() }, () => {
      wrapper.instance().handleContinueAnonymous().then(() => {
        jest.runAllTimers();
        expect(wrapper.state().sessionValid).toEqual(true);
      });
    });
  });

  it('allows user to go back', () => {
    UserSession.checkSession = jest.fn(() => {
      throw Error('error');
    });

    const wrappedInRouter = wrapInRouter(
      <SignupOptions {...props} />,
      '/signup-options',
    );

    const oldGoBack = history.goBack;
    history.goBack = jest.fn();
    const signUpOptionsWrapper = wrappedInRouter.find(SignupOptions);

    const backEl = signUpOptionsWrapper.find('img[src$="arrow.svg"]');
    expect(backEl.exists()).toBeTruthy();

    backEl.simulate('click');
    expect(history.goBack).toBeCalled();

    wrappedInRouter.unmount();
    history.goBack = oldGoBack;
    UserSession.checkSession = premockFunc;
  });
});
