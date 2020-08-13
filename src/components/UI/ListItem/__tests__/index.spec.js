import React from 'react';
import { shallow } from 'enzyme';
import ListItem from '..';

it('renders', () => {
  const props = {
    imgSrc: '',
    content: '',
  };

  const wrapper1 = shallow(<ListItem {...props} />);
  expect(wrapper1.find('.two-s').length).toBe(0);

  props.hasArrow = true;

  const wrapper2 = shallow(<ListItem {...props} />);
  expect(wrapper2.find('.two-s').length).toBe(1);
});
