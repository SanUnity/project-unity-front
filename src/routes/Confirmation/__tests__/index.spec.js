import React from 'react';
import EN from 'i18n/EN';
import { wrapInRouter, SUCCESS_DIV_ID } from 'setupTests';
import { shallow } from 'enzyme';
import Confirmation from '../components';

let wrappedInRouter;

// don't care about HOC logic
jest.mock('..', () => <></>);
jest.mock('components/UI/Button', () => () => <div />);

const props = {
  signupData: { phone: '1234567890' },
  validationData: {},
  literals: EN.en.confirmation,
  showLoading: jest.fn(),
  initSignup: jest.fn(),
  onValidate: jest.fn(),
  onSignupAnonymous: jest.fn(),
};

describe('Confirmation tests', () => {
  afterEach(() => {
    wrappedInRouter.unmount();
  });

  it('renders', () => {
    wrappedInRouter = wrapInRouter(<Confirmation {...props} />, '/signup');
    expect(wrappedInRouter.exists()).toBeTruthy();
  });

  it('redirects to signup when phone is null', () => {
    props.signupData.phone = null;
    wrappedInRouter = wrapInRouter(<Confirmation {...props} />, '/signup');
    expect(wrappedInRouter.find(`#${SUCCESS_DIV_ID}`).length).toBe(1);
  });
});

describe('Confirmation tests (shallow wrapped)', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<Confirmation {...props} />);
  });

  it('clears time interval, only if current time is `bigger` than start time (+5mins)', () => {
    jest.useFakeTimers();
    wrapper.setState(
      {
        start: (d => new Date(d.setDate(d.getDate() - 1)))(
          new Date(),
        ).getTime(),
      },
      () => {
        wrapper.instance().checkTime();
        expect(clearInterval).toHaveBeenCalledTimes(1);
      },
    );

    wrapper.setState(
      {
        start: new Date().getTime(),
      },
      () => {
        wrapper.instance().checkTime();
        expect(clearInterval).toHaveBeenCalledTimes(1);
      },
    );
  });

  it('handles keydown `Backspace`', () => {
    jest.useFakeTimers();
    const focus = jest.fn();
    document.querySelectorAll = jest.fn().mockReturnValue([{ focus }]);
    wrapper.instance().handleKeyDown({ key: 'Backspace' }, 1);
    jest.runAllTimers();
    expect(document.querySelectorAll).toHaveBeenCalledTimes(1);
    expect(focus).toHaveBeenCalledTimes(1);

    wrapper.instance().handleKeyDown({ key: 'Not backspace' }, 0);
    jest.runAllTimers();
    expect(document.querySelectorAll).toHaveBeenCalledTimes(1);

    document.querySelectorAll = jest.fn().mockReturnValue([]);
    wrapper.instance().handleKeyDown({ key: 'Backspace' }, 1);
    jest.runAllTimers();
    // new jest.fn() means counter reset, means expecting 1
    expect(document.querySelectorAll).toHaveBeenCalledTimes(1);
  });

  let actualValidateForm;
  it('handles pasting', () => {
    actualValidateForm = wrapper.instance().validateForm;
    wrapper.instance().validateForm = jest.fn();
    const getData = jest.fn();
    wrapper.instance().handleOnPaste(
      {
        stopPropagation: () => {},
        preventDefault: () => {},
        clipboardData: { getData },
      },
      0,
    );
    expect(wrapper.instance().state.numbers).toEqual(['', '', '', '', '', '']);
    expect(getData).toHaveBeenCalledTimes(1);

    window.clipboardData = window.clipboardData || { getData: jest.fn() };

    // the instant return
    wrapper.instance().handleOnPaste(
      {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
      },
      1,
    );

    wrapper.instance().handleOnPaste(
      {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
      },
      0,
    );
    expect(wrapper.instance().state.numbers).toEqual(['', '', '', '', '', '']);

    wrapper.instance().handleOnPaste(
      {
        stopPropagation: () => {},
        preventDefault: () => {},
        clipboardData: {
          getData: () => {
            return '12345';
          },
        },
      },
      0,
    );
    expect(wrapper.instance().state.numbers).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
      '',
    ]);

    wrapper.instance().handleOnPaste(
      {
        stopPropagation: () => {},
        preventDefault: () => {},
        clipboardData: {
          getData: () => {
            return '123456';
          },
        },
      },
      0,
    );
    expect(wrapper.instance().state.numbers).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
    ]);
  });

  it('handles `onChange` event', () => {
    wrapper.instance().focusInput = jest.fn();
    wrapper.instance().handleOnChange({ target: { value: '123456' } }, 1);
    expect(wrapper.instance().state.numbers).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
    ]);

    wrapper.instance().handleOnChange({ target: { value: '5' } }, 5);
    expect(wrapper.instance().focusInput).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().state.numbers[5]).toEqual('5');

    wrapper.instance().handleOnChange({ target: { value: '' } }, 0);
    expect(wrapper.instance().focusInput).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().state.numbers[0]).toEqual('');
  });

  it('validates the form', () => {
    wrapper.instance().validateForm = actualValidateForm;
    wrapper.setState({ numbers: ['1', '2', '3', '4', '5', '6'] }, () => {
      wrapper.instance().validateForm();
      expect(wrapper.instance().state.formValid).toEqual(true);
    });

    wrapper.setState({ numbers: ['', '', '', '', '', ''] }, () => {
      wrapper.instance().validateForm();
      expect(wrapper.instance().state.formValid).toEqual(false);
    });
  });

  it('handles submit', () => {
    // this case is just => return;
    wrapper.instance().handleSubmit();

    wrapper.setState({ numbers: ['1', '2', '3', '4', '5', '6'] }, () => {
      wrapper
        .instance()
        .handleSubmit()
        .then(() => {
          expect(props.onValidate).toHaveBeenCalledTimes(1);
          expect(wrapper.instance().state.validating).toEqual(false);
        });

      wrapper.setProps(
        {
          onValidate: () => {
            throw new Error('error!');
          },
        },
        () => {
          wrapper
            .instance()
            .handleSubmit()
            .then(() => {
              expect(wrapper.instance().state.error).toEqual(true);
            });
        },
      );
    });
  });

  it('handles anonymous submit', () => {
    wrapper
      .instance()
      .handleSubmitAnonymous()
      .then(() => {
        expect(wrapper.instance().state.validating).toEqual(false);
      });

    wrapper.setProps(
      {
        onSignupAnonymous: () => {
          throw new Error('error!');
        },
      },
      () => {
        wrapper
          .instance()
          .handleSubmitAnonymous()
          .then(() => {
            expect(wrapper.instance().state.error).toEqual(true);
          });
      },
    );
  });

  it('renders depending on props/state', () => {
    wrapper.setState({ validating: false }, () => {
      wrapper.setProps(
        {
          validationData: { success: 'success' },
          signupData: { phone: '1234567890' },
        },
        () => {
          expect(wrapper.find('section').length).toEqual(0);
        },
      );

      wrapper.setProps(
        {
          validationData: { success: '', error: { next: '123' } },
          signupData: { phone: '1234567890' },
        },
        () => {
          expect(wrapper.instance().showError).not.toEqual('');
        },
      );

      wrapper.setProps(
        {
          validationData: { success: '', error: '123' },
          signupData: { phone: '1234567890' },
        },
        () => {
          expect(wrapper.instance().showError).not.toEqual('');
        },
      );
    });
  });

  it('triggers handling functions on catched events on input field', () => {
    wrapper.instance().handleOnChange = jest.fn();
    wrapper.instance().handleOnPaste = jest.fn();
    wrapper.instance().handleKeyDown = jest.fn();

    wrapper.find('input').first().simulate('change', {});
    wrapper.find('input').first().simulate('paste', {});
    wrapper.find('input').first().simulate('keydown', {});

    expect(wrapper.instance().handleOnChange).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().handleOnPaste).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().handleKeyDown).toHaveBeenCalledTimes(1);
  });
});
