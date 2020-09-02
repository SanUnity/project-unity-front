import React from 'react';
import { shallow } from 'enzyme';
import CooldownTimer from '..';
import EN from 'i18n/EN';

let wrapper;
const props = {
  literals: EN.en,
  hours: 1,
  minutes: 1,
  seconds: 1,
};

describe('CooldownTimer tests', () => {
  beforeAll(() => {
    wrapper = shallow(<CooldownTimer {...props} />);
  });

  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
