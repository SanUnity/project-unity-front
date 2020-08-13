import React from 'react';
import { shallow } from 'enzyme';
import ScrollToTopOnMount from '..';

window.scrollTo = jest.fn();

it('triggers life hook', () => {
  const wrapper = shallow(<ScrollToTopOnMount />);

  expect(wrapper.exists()).toBeTruthy();

  expect(window.scrollTo).toHaveBeenCalledTimes(1);
});
