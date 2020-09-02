import React from 'react';
import { shallow } from 'enzyme';
import ToggleQuestion from '..';

let wrapper;

const props = {
  component: () => <div />,
};
describe('ToggleQuestion tests', () => {
  it('renders', () => {
    wrapper = shallow(<ToggleQuestion {...props} />);
    expect(wrapper.exists()).toBeTruthy();

    wrapper.setProps({ error: 'error' }, () => {
      expect(wrapper.find('.form-question--error').length).toBe(1);
    });

    wrapper.find('component').first().simulate('change', {});

    props.onChange = jest.fn();
    wrapper.setProps(
      {
        ...props,
      },
      () => {
        wrapper.find('component').first().simulate('change', {});
        expect(props.onChange).toHaveBeenCalledTimes(1);
      },
    );
  });
});
