import React from 'react';
import { shallow } from 'enzyme';
import SelectInput from '..';

const props = {
  label: 'label',
  options: [{ id: 1, value: 'option1', title: 'option1' }],
  onChange: jest.fn(),
  name: 'name',
};

const wrapper = shallow(<SelectInput {...props} />);

describe('SelectInput tests', () => {
  it('renders same number of option elements as quantity of options passed', () => {
    // + 1 due to the `hidden` one
    expect(wrapper.find('option').length).toBe(props.options.length + 1);
  });

  it('triggers callback function upon selecting an option in select element', () => {
    wrapper.find('select').simulate('change', {});
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });

  it('applies `error` class when error prop is passed', () => {
    expect(wrapper.hasClass('error')).toBeFalsy();
    wrapper.setProps({ ...props, error: 'error' }, () => {
      expect(wrapper.hasClass('error')).toBeTruthy();
    });
  });

  it('sets `not-empty` or `is-empty` class and the color css property to `black` or `#495057` depending on value prop', () => {
    expect(wrapper.find('select').hasClass('is-empty')).toBeTruthy();
    expect(wrapper.find('select').prop('style')).toHaveProperty(
      'color',
      '#495057',
    );
    wrapper.setProps({ ...props, value: 'value' }, () => {
      expect(wrapper.find('select').hasClass('not-empty')).toBeTruthy();
      expect(wrapper.find('select').prop('style')).toHaveProperty(
        'color',
        'black',
      );
    });
  });
});
