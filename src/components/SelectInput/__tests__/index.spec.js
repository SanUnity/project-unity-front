import React from 'react';
import { shallow } from 'enzyme';
import SelectInput from '..';

const props = {
  value: 'value',
  label: 'label',
  options: ['first', 'second'],
  callback: jest.fn(),
};

const wrapper = shallow(<SelectInput {...props} />);

it('renders same number of option elements as quantity of options passed', () => {
  expect(wrapper.find('option').length).toBe(props.options.length);
});

it('triggers callback function upon selecting an option in select element', () => {
  wrapper.find('select').simulate('change', {});
  expect(props.callback).toHaveBeenCalledTimes(1);
});
