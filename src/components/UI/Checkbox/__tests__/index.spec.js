import React from 'react';
import { shallow } from 'enzyme';
import Checkbox from '..';

const props = {
  name: 'name',
  label: 'label',
  value: false,
  onChange: jest.fn(),
};

const wrapper = shallow(<Checkbox {...props} />);

it('renders', () => {
  expect(wrapper.find('label').length).toBe(1);
});
