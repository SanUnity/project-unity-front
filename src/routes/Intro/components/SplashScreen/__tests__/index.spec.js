import React from 'react';
import { shallow } from 'enzyme';
import SplashScreen from '..';
import EN from 'i18n/EN';

const props = {
  literals: EN.en,
};

describe('SplashScreen tests', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<SplashScreen {...props} />);
  });

  it('renders', () => {
    expect(wrapper.find('section').length).toBe(1);
  });
});
