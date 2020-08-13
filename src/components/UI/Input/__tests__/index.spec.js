import React from 'react';
import { shallow } from 'enzyme';
import Input from '..';

const props = {
  name: 'name',
  maxLength: 5,
  onKeyUp: jest.fn(),
};

it('simulates input functionality properly', () => {
  const wrapper = shallow(<Input {...props} />);

  expect(wrapper.exists()).toBeTruthy();

  wrapper.find('input').simulate('change', {
    target: {
      value: 'hello',
    },
  });
  expect(wrapper.find('input').props().value).toBe('hello');

  wrapper.find('input').simulate('change', {
    target: {
      value: 'has more than 10 characters',
    },
  });
  expect(wrapper.find('input').props().value).not.toBe('has more than 10 characters');
});

it('handles props', () => {
  props.label = 'label';

  const wrapper = shallow(<Input {...props} />);

  expect(wrapper.find('label').length).toBe(1);
  expect(wrapper.find('input').props().type).toEqual('text');

  props.type = 'radio';
  const wrapper2 = shallow(<Input {...props} />);

  expect(wrapper2.find('input').props().type).toEqual(props.type);

  wrapper2.find('input').props().onKeyUp();

  expect(props.onKeyUp).toHaveBeenCalledTimes(1);
});
