import React from 'react';
import { shallow } from 'enzyme';
import Modal from '..';

it('renders', () => {
  const wrapper = shallow(<Modal content={() => {}} />);
  expect(wrapper.exists()).toBeTruthy();
});
