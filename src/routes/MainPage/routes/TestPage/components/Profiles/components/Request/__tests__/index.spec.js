import React from 'react';
import { shallow } from 'enzyme';
import Request from '..';
import EN from 'i18n/EN';
import history from 'store/history';

let wrapper;
const props = {
  literals: EN.en,
  request: { id: 1, timestamp: 1234567 },
};

describe('Request tests', () => {
  beforeAll(() => {
    wrapper = shallow(<Request {...props} />);
  });

  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();

    wrapper.setProps({ request: { id: -1, timestamp: 1234567 } }, () => {
      expect(wrapper.exists()).toBeTruthy();
    });
  });

  it('goToProfile', () => {
    history.push = jest.fn();
    wrapper.instance().goToProfile();
    expect(history.push).toHaveBeenCalledTimes(1);

    wrapper.setProps(
      { request: { id: -1, timestamp: 1234567, profileID: 1 } },
      () => {
        wrapper.instance().goToProfile();
        expect(history.push).toHaveBeenCalledTimes(2);
      },
    );
  });
});
