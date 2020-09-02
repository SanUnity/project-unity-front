import React from 'react';
import { shallow } from 'enzyme';
import EN from 'i18n/EN';
import {
  TEST_RESUL_LOW,
  TEST_RESUL_MEDIUM_LOW,
  TEST_RESUL_MEDIUM,
  TEST_RESUL_MEDIUM_HIGH,
  TEST_RESUL_MEDIUM_VULNERABLE,
  TEST_RESUL_HIGH,
} from 'constants/tests';
import Profile from '../components';

// don't care about HOC logic
jest.mock('..', () => <></>);

let wrapper;
const props = {
  literals: EN.en,
  showLoading: jest.fn(),
  onShowError: jest.fn(),
  profile: { pcr: [] },
};

const mockApiFetch = Promise.resolve([]);

jest.mock('utils/apiFetch', () => {
  return jest.fn(() => mockApiFetch);
});

describe('Profile tests', () => {
  beforeAll(() => {
    wrapper = shallow(<Profile {...props} />);
  });

  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('getLiteralByLevel', () => {
    expect(wrapper.instance().getLiteralByLevel(TEST_RESUL_LOW)).toEqual(
      props.literals.results.good.title,
    );
    expect(wrapper.instance().getLiteralByLevel(TEST_RESUL_MEDIUM_LOW)).toEqual(
      props.literals.results.medium_low.title,
    );
    expect(wrapper.instance().getLiteralByLevel(TEST_RESUL_MEDIUM)).toEqual(
      props.literals.results.medium.title,
    );
    expect(
      wrapper.instance().getLiteralByLevel(TEST_RESUL_MEDIUM_HIGH),
    ).toEqual(props.literals.results.medium_high.title);
    expect(
      wrapper.instance().getLiteralByLevel(TEST_RESUL_MEDIUM_VULNERABLE),
    ).toEqual(props.literals.results.medium_vulnerable.title);
    expect(wrapper.instance().getLiteralByLevel(TEST_RESUL_HIGH)).toEqual(
      props.literals.results.bad.title,
    );
    expect(wrapper.instance().getLiteralByLevel('')).toEqual(
      props.literals.results.good.title,
    );
  });
});
