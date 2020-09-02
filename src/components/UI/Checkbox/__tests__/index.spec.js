import React from 'react';
import { shallow } from 'enzyme';
import Checkbox from '..';

const props = {
  name: 'name',
  label: 'label',
  value: false,
  LabelComponent: () => <></>,
};

describe('Checkbox tests', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<Checkbox {...props} />);
  });

  it('renders', () => {
    expect(wrapper.find('LabelComponent').exists()).toBeTruthy();
  });

  it('updates state even when no `onChange` prop passed', () => {
    wrapper.find('input').simulate('change', {
      target: {
        checked: true,
      },
    });
  });

  it('triggers onChange prop', () => {
    props.onChange = jest.fn();
    wrapper.setProps(props, () => {
      wrapper.find('input').simulate('change', {
        target: {
          checked: true,
        },
      });
      expect(props.onChange).toHaveBeenCalledTimes(1);
    });
  });
});
