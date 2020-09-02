import React from 'react';
import { shallow } from 'enzyme';
import Footer from '..';

describe('Footer tests', () => {
  it('renders', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('section').length).toBe(1);
  });
});
