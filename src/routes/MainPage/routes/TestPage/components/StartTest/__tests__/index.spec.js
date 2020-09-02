import React from 'react';
import { shallow } from 'enzyme';
import StartTest from '..';
import EN from 'i18n/EN';
import history from 'store/history';
import Button from 'components/UI/Button';

let wrapper;
const props = {
  literals: EN.en,
  onShowModalLangs: jest.fn(),
};

describe('StartTest tests', () => {
  beforeAll(() => {
    wrapper = shallow(<StartTest {...props} />);
  });

  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('goToTest ', () => {
    history.push = jest.fn();
    wrapper.find(Button).simulate('click', {});
    expect(history.push).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem('testDetails')).toEqual('{}');
  });
});
