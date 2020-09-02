import React from 'react';
import { shallow } from 'enzyme';
import Nav from '..';
import EN from 'i18n/EN';

const props = {
  routes: [
    {
      title: 'route1',
      path: '/route1/:param',
    },
    {
      title: 'route2',
      title2: 'route2-2',
      path: '/route2/:param',
    },
  ],
  match: {},
  literals: EN.en,
  user: {
    profiles: [{}, {}],
  },
};

describe('Nav tests', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<Nav {...props} />);
  });

  it('renders', () => {
    expect(wrapper.find('nav').exists()).toBeTruthy();

    wrapper.setProps({ ...props, user: { bt_active: true } });
  });
});
