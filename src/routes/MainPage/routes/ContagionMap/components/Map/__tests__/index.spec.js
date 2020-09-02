import React from 'react';
import { mount } from 'enzyme';
import Map from '..';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));
let wrapper;

describe('Map tests', () => {
  beforeAll(() => {
    wrapper = mount(<Map />);
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
