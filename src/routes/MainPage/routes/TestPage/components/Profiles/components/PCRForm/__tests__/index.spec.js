/* eslint-disable no-restricted-syntax */
/* eslint-disable no-loop-func */
import React from 'react';
import { shallow, mount } from 'enzyme';
import EN from 'i18n/EN';
import apiFetch from 'utils/apiFetch';
import PCRForm, { questions } from '../components';

let wrapper;

const onSubmitForm = jest.fn();


const props = {
  test: {},
  literals: EN.en,
  showLoading: jest.fn(),
  onSubmitForm,
};


const origOnMobileDevice = window.onMobileDevice;
const origReadNativeQR = window.readNativeQR;

function prepareMobile() {
  window.onMobileDevice = jest.fn(() => true);
  window.readNativeQR = jest.fn();
}

function resetMobile() {
  window.onMobileDevice = origOnMobileDevice;
  window.readNativeQR = origReadNativeQR;
}


jest.mock('utils/apiFetch', () => {
  return jest.fn();
});


describe('PCRForm', () => {
  beforeAll(() => {
  });

  beforeEach(() => {
    wrapper = shallow(<PCRForm {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders without test data on Desktop', () => {
    expect(wrapper.exists()).toBeTruthy();
  });


  it('renders without test data on Mobile', () => {
    prepareMobile();
    const wrapper2 = shallow(<PCRForm
      {...props}
      test={{
      }}
    />);
    expect(wrapper2.exists()).toBeTruthy();
    resetMobile();
  });

  it('renders with test data on Desktop', () => {
    const wrapper2 = shallow(<PCRForm
      {...props}
      test={{
        id: 'somettestid',
        name: 'Tester',
        phone: '123123123',
        resultTest: 2,
      }}
    />);

    expect(wrapper2.exists()).toBeTruthy();
  });


  it('renders with test data on mobile', () => {
    prepareMobile();

    const mountedWrapper = mount(<PCRForm
      {...props}
      test={{
        id: 'somettestid',
        name: 'Tester',
        phone: '123123123',
        resultTest: 2,
      }}
    />);


    mountedWrapper.setProps({
      test: {
        id: 'somettestid',
        name: 'Tester',
        email: 'some@email.com',
        phone: '123123123',
        verifiedEmail: false,
        verifiedPhone: false,
        onlyValidateFields: true,
      },
    });

    expect(mountedWrapper.exists()).toBeTruthy();

    mountedWrapper.unmount();
    resetMobile();
  });


  it('tries to read valid QR from local storage', (done) => {
    prepareMobile();

    const qrCode = 'someqrcode';

    localStorage.setItem('QRString', qrCode);


    const mountedWrapper = mount(<PCRForm
      {...props}
      test={{
        name: 'Tester',
        phone: '123123123',
        resultTest: 2,
        answers: {},
      }}
    />);

    apiFetch.mockImplementation(() => new Promise(resolve => resolve({ valid: true })));

    setTimeout(() => {
      expect(mountedWrapper.state().showQRScanner).toBeFalsy();

      localStorage.removeItem('QRString');
      resetMobile();
      done();
    }, 1000);

    expect(mountedWrapper.exists()).toBeTruthy();
  });

  it('tries to read canceled QR code from local storage', (done) => {
    prepareMobile();

    const qrCode = 'someqrcode';

    localStorage.setItem('QRString', qrCode);
    localStorage.setItem('QRCanceled', 'true');


    const mountedWrapper = mount(<PCRForm
      {...props}
      test={{
        name: 'Tester',
        phone: '123123123',
        resultTest: 2,
        answers: {},
      }}
    />);

    apiFetch.mockImplementation(() => new Promise(resolve => resolve({ valid: true })));

    setTimeout(() => {
      expect(mountedWrapper.state().showQRScanner).toBeFalsy();
      expect(localStorage.getItem('QRCanceled')).toBeFalsy();
      localStorage.removeItem('QRString');
      done();
    }, 1000);

    expect(mountedWrapper.exists()).toBeTruthy();
  });

  it('handles user input', () => {
    const mountedWrapper = mount(<PCRForm {...props} />);

    for (const question of questions) {
      const input = mountedWrapper.find(`input[name='${question}']`);
      const mockValue = 'somevalue';

      if (input.length) {
        input.simulate('change', {
          target: {
            value: mockValue,
          },
        });

        setTimeout(() => {
          expect(wrapper.state().answers[question]).toBe(mockValue);
        }, 0);
      }
    }

    mountedWrapper.unmount();
  });
});
