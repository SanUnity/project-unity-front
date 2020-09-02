import React from 'react';
import { shallow } from 'enzyme';
import SiNo from '..';
import * as redux from 'react-redux';

describe('SiNo tests', () => {
  let wrapper;
  const props = {
    name: 'name',
  };

  beforeEach(() => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue({ yes: 'yes', no: 'no' });
  });

  it('renders two inputs by default', () => {
    wrapper = shallow(<SiNo {...props} />);
    wrapper
      .find('input')
      .first()
      .simulate('change', { target: { value: '' } });
    expect(wrapper.find('input').length).toBe(2);
  });

  it('renders one input when `onlyYes` prop is true', () => {
    props.onlyYes = true;
    wrapper = shallow(<SiNo {...props} />);
    expect(wrapper.find('input').length).toBe(1);
  });

  it('triggers `onChange` when passed as prop', () => {
    props.onChange = jest.fn();
    wrapper = shallow(<SiNo {...props} />);
    wrapper
      .find('input')
      .first()
      .simulate('change', { target: { value: '' } });
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });

  it('triggers `onChange` when passed as prop, not depending on passed `value`', () => {
    props.value = 'some value';
    wrapper = shallow(<SiNo {...props} />);
    wrapper
      .find('input')
      .first()
      .simulate('change', { target: { value: '' } });
    expect(props.onChange).toHaveBeenCalledTimes(2);

    wrapper.setProps({ ...props, value: true }, () => {
      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: '' } });
      expect(props.onChange).toHaveBeenCalledTimes(3);
    });

    wrapper.setProps({ ...props, value: false }, () => {
      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { value: '' } });
      expect(props.onChange).toHaveBeenCalledTimes(4);
    });
  });
});
