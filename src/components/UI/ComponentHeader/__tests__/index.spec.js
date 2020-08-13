import React from 'react';
import { shallow } from 'enzyme';
import ComponentHeader from '..';

const props = {
  title: 'title',
  leftIconSrc: 'leftIconSrc',
  leftIconClicked: jest.fn(),
};

it('triggers a function upon clicking on image', () => {
  const wrapper = shallow(<ComponentHeader {...props} />);
  wrapper.find('img').simulate('click', {});
  expect(props.leftIconClicked).toHaveBeenCalledTimes(1);
});
