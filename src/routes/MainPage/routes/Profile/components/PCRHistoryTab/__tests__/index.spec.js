import React from 'react';
import { shallow } from 'enzyme';
import PCRHistoryTab from '..';
import EN from 'i18n/EN';
import { sessionService } from 'redux-react-session';

let wrapper;
const props = {
  literals: EN.en,
  profile: { id: 1, pcr: [] },
  onShowForm: jest.fn(),
  showLoading: jest.fn(),
};

let mockApiFetch = Promise.resolve([]);

jest.mock('utils/apiFetch', () => {
  return jest.fn(() => mockApiFetch);
});

describe('PCRHistoryTab tests', () => {
  beforeAll(() => {
    wrapper = shallow(<PCRHistoryTab {...props} />);
  });

  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();

    wrapper.setProps({ profile: { id: 1, pcr: [{ id: 1 }] } }, () => {
      expect(wrapper.exists()).toBeTruthy();
    });
  });

  it('getLiteralByResult', () => {
    expect(wrapper.instance().getLiteralByResult(null)).toEqual(
      'Waiting for results',
    );
  });

  it('showDetails', () => {
    const itemSelected = { item: 'selected' };
    wrapper.instance().showDetails(itemSelected);
    expect(wrapper.state().itemSelected).toEqual(itemSelected);
    expect(wrapper.state().showModal).toEqual(true);
  });

  it('hideModal', () => {
    wrapper.instance().hideModal();
    expect(wrapper.state().itemSelected).toEqual({});
    expect(wrapper.state().showModal).toEqual(false);
  });

  it('handleSubmit', () => {
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

    sessionService.saveUser = jest.fn(() => Promise.resolve({
      profiles: [
        { id: 1, pcr: [{ id: 1 }, { id: 2 }] },
        { id: 2, pcr: [{ id: 3 }] },
      ],
    }));

    const answers = {
      id: 1,
      resultTest: '5',
    };

    wrapper.instance().handleSubmit(answers);
  });

  it('handleSubmit v2', () => {
    const answers = {
      id: -1,
      resultTest: '5',
    };

    wrapper.instance().handleSubmit(answers);
    expect(props.showLoading).toHaveBeenCalledTimes(2);
  });

  it('handleSubmit error', () => {
    mockApiFetch = Promise.reject(Error('API is down'));
    const answers = {
      id: -1,
      resultTest: '5',
    };

    wrapper.instance().handleSubmit(answers);
    expect(props.showLoading).toHaveBeenCalledTimes(4);
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

    wrapper.setState({ itemSelected: { id: 1, profileID: 1 } }, () => {
      wrapper.instance().handleValidateField(values);
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

    wrapper.setState({ itemSelected: { id: 1, profileID: 1 } }, () => {
      wrapper.instance().handleValidateField(values);
    });
  });

  it('handleValidateField v3', () => {
    const values = {
      emailValidate: false,
      phoneValidate: false,
    };
    wrapper.setState({ itemSelected: { id: -1, profileID: 1 } }, () => {
      wrapper.instance().handleValidateField(values);
    });
  });

  it('handleValidateField error', () => {
    mockApiFetch = Promise.reject(Error('API is down'));

    wrapper.instance().handleValidateField({});
  });

  it('renders v3', () => {
    wrapper.setState(
      {
        arrayTests: [
          { dateTest: new Date(new Date().setDate(new Date().getDate() - 2)) },
          { dateTest: new Date(), resultTest: '-' },
          { dateTest: new Date(new Date().setDate(new Date().getDate() - 1)) },
        ],
      },
      () => {
        wrapper.instance().showDetails = jest.fn();
        wrapper.find('.history-item').first().simulate('click', {});
        expect(wrapper.instance().showDetails).toHaveBeenCalledTimes(1);

        wrapper.find('.qr-code-wrapper').at(0).simulate('click', {});
        expect(props.onShowForm).toHaveBeenCalledTimes(1);

        wrapper.setProps({ profile: { id: 1, pcr: [] } }, () => {
          wrapper.find('.qr-code-wrapper').at(0).simulate('click', {});
          expect(props.onShowForm).toHaveBeenCalledTimes(2);
        });
      },
    );
  });
});
