import React from 'react';
import { shallow } from 'enzyme';
import Input from '..';

const props = {
  name: 'name',
  maxLength: 5,
  onKeyUp: jest.fn(),
};

let wrapper;

describe('Input tests', () => {
  it('simulates input functionality properly', () => {
    wrapper = shallow(<Input {...props} />);

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
    expect(wrapper.find('input').props().value).not.toBe(
      'has more than 10 characters',
    );
  });

  it('handles props', () => {
    wrapper.setProps({ ...props, label: 'label' }, () => {
      expect(wrapper.find('label').length).toBe(1);
      expect(wrapper.find('input').props().type).toEqual('text');
    });

    wrapper.setProps({ ...props, type: 'radio' }, () => {
      expect(wrapper.find('input').props().type).toEqual('radio');
    });

    wrapper.find('input').props().onKeyUp();
    expect(props.onKeyUp).toHaveBeenCalledTimes(1);
  });

  it('goes to error state when error provided via props', () => {
    wrapper.setProps({ error: 'error' }, () => {
      expect(wrapper.find('.error').length).toBe(1);
    });
  });

  it('propagates `input` object props', () => {
    wrapper.setProps({ type: null }, () => {
      wrapper.setProps({ type: 'number' }, () => {});
    });
  });

  it('input field `onChange` accepts all variations of value', () => {
    wrapper.setProps({ onlyLetters: true }, () => {});
    wrapper
      .find('input')
      .simulate('change', { target: { value: 'a' } });
    expect(wrapper.find('input').prop('value')).toEqual('a');

    wrapper
      .find('input')
      .simulate('change', { target: { value: 'A' } });
    expect(wrapper.find('input').prop('value')).toEqual('A');

    wrapper
      .find('input')
      .simulate('change', { target: { value: String.fromCharCode(128) } });
    expect(wrapper.find('input').prop('value')).toEqual(
      String.fromCharCode(128),
    );

    wrapper
      .find('input')
      .simulate('change', { target: { value: String.fromCharCode(162) } });
    expect(wrapper.find('input').prop('value')).toEqual(
      String.fromCharCode(162),
    );

    wrapper
      .find('input')
      .simulate('change', { target: { value: String.fromCharCode(32) } });
    expect(wrapper.find('input').prop('value')).toEqual(
      String.fromCharCode(32),
    );

    wrapper
      .find('input')
      .simulate('change', { target: { value: String.fromCharCode(33) } });
    expect(wrapper.find('input').prop('value')).toEqual(' ');
  });
});
