import React from 'react';
import { shallow } from 'enzyme';
import Loading from '..';

it('toggles hidden class based on `hide` prop', () => {
  const props = {
    hide: true,
  };

  const wrapper = shallow(<Loading {...props} />);
  expect(wrapper.hasClass('hidden')).toBeTruthy();

  props.hide = false;

  wrapper.setProps(props, () => {
    expect(wrapper.hasClass('hidden')).toBeFalsy();
  });
});
