import React from 'react';
import { shallow } from 'enzyme';
import FirstTab from '..';
import EN from 'i18n/EN';

const props = {
  literals: EN.en.news,
  listItems: [
    {
      date: '1.1.2020.',
    },
    {
      date: '1.11.2020.',
    },
    {
      date: '11.2.2020.',
    },
    {
      date: '11.2.2020.',
    },
  ],
  onClickNews: jest.fn(),
};

let wrapper;

describe('FirstTab tests', () => {
  it('renders', () => {
    wrapper = shallow(<FirstTab {...props} />);
    expect(wrapper.find('.releases-item').length).toBe(4);
  });

  it('triggers `onClickNews`', () => {
    wrapper.find('.releases-item').first().simulate('click', {});
    expect(props.onClickNews).toHaveBeenCalledTimes(1);
  });

  it('shows `no-elements` when array is empty', () => {
    wrapper.setProps({ listItems: [] }, () => {
      expect(wrapper.find('.no-elements').length).toBe(1);
    });
  });
});
