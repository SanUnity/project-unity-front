import React from 'react';
import { shallow } from 'enzyme';
import HealthHistoryTab from '..';
import EN from 'i18n/EN';
import {
  TEST_RESUL_LOW,
  TEST_RESUL_MEDIUM_LOW,
  TEST_RESUL_MEDIUM,
  TEST_RESUL_MEDIUM_HIGH,
  TEST_RESUL_MEDIUM_VULNERABLE,
  TEST_RESUL_HIGH,
} from 'constants/tests';

jest.mock('routes/Results/container', () => <></>);

let wrapper;
const props = {
  literals: EN.en.results,
  match: { params: { profileID: 1 } },
  showLoading: jest.fn(),
  onFetchHistory: jest.fn(),
  onShowForm: jest.fn(),
  profile: { pcr: [] },
};

let mockApiFetch = Promise.resolve([]);

jest.mock('utils/apiFetch', () => {
  return jest.fn(() => mockApiFetch);
});

describe('HealthHistoryTab tests', () => {
  beforeAll(() => {
    wrapper = shallow(<HealthHistoryTab {...props} />);
  });

  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders v2', () => {
    props.profile = {
      history: [],
      pcr: [],
    };
    const wrapper2 = shallow(<HealthHistoryTab {...props} />);
    expect(wrapper2.exists()).toBeTruthy();
    expect(wrapper2.state().loaded).toEqual(true);
  });

  it('getUserHistory', () => {
    wrapper.instance().getUserHistory();

    expect(props.onFetchHistory).toHaveBeenCalledTimes(1);
    expect(props.showLoading).toHaveBeenCalledTimes(3);
  });

  it('getUserHistory error', () => {
    mockApiFetch = Promise.reject(Error('API is down'));
    wrapper.instance().getUserHistory();
    expect(props.showLoading).toHaveBeenCalledTimes(5);
  });

  it('getLiteralByLevel', () => {
    expect(wrapper.instance().getLiteralByLevel(TEST_RESUL_LOW)).toEqual(
      props.literals.good.title,
    );
    expect(wrapper.instance().getLiteralByLevel(TEST_RESUL_MEDIUM_LOW)).toEqual(
      props.literals.medium_low.title,
    );
    expect(wrapper.instance().getLiteralByLevel(TEST_RESUL_MEDIUM)).toEqual(
      props.literals.medium.title,
    );
    expect(
      wrapper.instance().getLiteralByLevel(TEST_RESUL_MEDIUM_HIGH),
    ).toEqual(props.literals.medium_high.title);
    expect(
      wrapper.instance().getLiteralByLevel(TEST_RESUL_MEDIUM_VULNERABLE),
    ).toEqual(props.literals.medium_vulnerable.title);
    expect(wrapper.instance().getLiteralByLevel(TEST_RESUL_HIGH)).toEqual(
      props.literals.bad.title,
    );
    expect(wrapper.instance().getLiteralByLevel('')).toEqual(
      props.literals.good.title,
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

  it('renders v3', () => {
    wrapper.setState(
      {
        arrayTests: [
          { timestamp: new Date(new Date().setDate(new Date().getDate() - 2)) },
          { timestamp: new Date(), level: '-' },
          { timestamp: new Date(new Date().setDate(new Date().getDate() - 1)) },
        ],
      },
      () => {
        wrapper.instance().showDetails = jest.fn();
        wrapper.find('.history-item').first().simulate('click', {});
        expect(wrapper.instance().showDetails).toHaveBeenCalledTimes(1);

        wrapper.find('.qr-code-wrapper').first().simulate('click', {});
        expect(props.onShowForm).toHaveBeenCalledTimes(1);
      },
    );
  });
});
