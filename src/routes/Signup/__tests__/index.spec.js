import React from 'react';
import { mount, shallow } from 'enzyme';
import EN from 'i18n/EN';
import { Redirect } from 'react-router';
import { ROUTE_PATH } from 'routes';
import history from 'store/history';
import Signup from '../components';
import Terms from '../components/Terms';

let wrapper;
let wrapperWithPhone;
let mountedWrapper;


const onSignup = jest.fn();

const props = {
  literals: EN.en.signup,
  signupData: {
    phone: '23125123',
  },
  municipality: 'municipality',
  onSignup,
  showLoading: jest.fn(),
};


const remountWrapper = () => {
  mountedWrapper.unmount();
  return mount(<Signup {...props} signupData={{ phone: '' }} />);
};


jest.mock('..', () => <></>);


describe('Signup', () => {
  beforeAll(() => {
    wrapper = shallow(<Signup {...props} signupData={{ phone: '' }} />);
    wrapperWithPhone = shallow(<Signup {...props} />);
    mountedWrapper = mount(<Signup {...props} signupData={{ phone: '' }} />);
  });

  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('allows user to go back', () => {
    const oldGoBack = history.goBack;
    history.goBack = jest.fn();

    const backEl = wrapper.find('img[src$="arrow.svg"]');
    expect(backEl.exists()).toBeTruthy();

    backEl.simulate('click');
    expect(history.goBack).toBeCalled();

    history.goBack = oldGoBack;
  });

  it('shows terms to user', () => {
    expect(wrapper.state().showTerms).toBeFalsy();

    const showTermsEl = mountedWrapper.find('.terms-link');
    showTermsEl.simulate('click');
    mountedWrapper.update();
    expect(mountedWrapper.state().showTerms).toBeTruthy();
    expect(mountedWrapper.find(Terms).exists()).toBeTruthy();

    const showFullTermsLink = mountedWrapper.find('.privacy-link');
    expect(showFullTermsLink.exists()).toBeTruthy();

    showFullTermsLink.simulate('click');
    expect(mountedWrapper.find(Terms).state().handleShowFullTerms).toBeTruthy();

    mountedWrapper.find(Terms).find('img[src$="arrow.svg"]').at(1).simulate('click');
    expect(mountedWrapper.find(Terms).state().handleShowFullTerms).toBeFalsy();

    mountedWrapper.find(Terms).find('img[src$="arrow.svg"]').simulate('click');

    expect(mountedWrapper.state().showTerms).toBeFalsy();
  });


  it('redirects user with existing phone', () => {
    const redirect = wrapperWithPhone.find(Redirect);
    expect(redirect.exists()).toBeTruthy();
    expect(redirect.props().to).toBe(ROUTE_PATH.CONFIRMATION);
  });

  it('handles user\'s input', () => {
    mountedWrapper = remountWrapper();
    const input = mountedWrapper.find('input[type="number"]');

    const mockedInput = '123';
    mountedWrapper.update();

    input.simulate('change', {
      target: {
        name: 'phone',
        value: mockedInput,
      },
    });

    const checkbox = mountedWrapper.find('input[type="checkbox"]');
    checkbox.simulate('change', {
      target: {
        checked: true,
      },
    });

    expect(mountedWrapper.state().phone).toBe(mockedInput);
    expect(mountedWrapper.state().cbAgree).toBeTruthy();
  });

  it('shows snack error on invalid sumbission', () => {
    const mockedError = 'invalid input';

    wrapper.setProps({ signupData: { error: mockedError } });
    expect(wrapper.state().snackError).toBe(EN.en.signup.signupError);

    wrapper.setProps({ signupData: { error: { next: new Date() + 1000000 } } });
    expect(wrapper.state().snackError).not.toBe(mockedError);
    expect(wrapper.state().snackError).not.toBe(EN.en.signup.signupError);
  });

  it('handles user\'s submit', () => {
    mountedWrapper = remountWrapper();

    const submitButton = mountedWrapper.find('button');
    submitButton.simulate('click');

    expect(mountedWrapper.state().formValid).toBeFalsy();


    const checkbox = mountedWrapper.find('input[type="checkbox"]');
    checkbox.simulate('change', {
      target: {
        checked: true,
      },
    });

    const mockedInput = '1231231231';
    const input = mountedWrapper.find('input[type="number"]');
    input.simulate('change', {
      target: {
        name: 'phone',
        value: mockedInput,
      },
    });

    expect(mountedWrapper.state().formValid).toBeTruthy();

    submitButton.simulate('click');

    expect(onSignup).toBeCalled();
  });

  afterAll(() => {
    wrapper.unmount();
    wrapperWithPhone.unmount();
    mountedWrapper.unmount();
  });
});
