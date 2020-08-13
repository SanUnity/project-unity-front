import React from 'react';
import { shallow } from 'enzyme';
import WideToggle from '..';

const props = {
  title: 'title',
  firstLabel: 'firstLabel',
  secondLabel: 'secondLabel',
  activeLabelIndex: 1,
  labelClicked: jest.fn(),
};

const wrapper = shallow(<WideToggle {...props} />);

it('switches active class when toggle switched', () => {
  wrapper.setProps({ activeLabelIndex: 1 });

  expect(wrapper.find('li:first-child > span').hasClass('active')).toBeTruthy();
  expect(wrapper.find('li:last-child > span').hasClass('active')).toBeFalsy();

  wrapper.setProps({ activeLabelIndex: 2 });

  expect(wrapper.find('li:first-child > span').hasClass('active')).toBeFalsy();
  expect(wrapper.find('li:last-child > span').hasClass('active')).toBeTruthy();

  wrapper.find('li:first-child > span').simulate('click', {});

  expect(props.labelClicked).toHaveBeenCalledTimes(1);
  wrapper.find('li:last-child > span').simulate('click', {});

  expect(props.labelClicked).toHaveBeenCalledTimes(2);
});
