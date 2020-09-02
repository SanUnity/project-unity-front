import React from 'react';
import { shallow } from 'enzyme';
import SignupOptions from '..';
import EN from 'i18n/EN';

const props = {
  literals: EN.en,
  onContinueAnonymous: jest.fn(),
};

describe('SignupOptions tests', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<SignupOptions {...props} />);
  });

  it('renders', () => {
    expect(wrapper.find('section').length).toBe(1);
  });
});
