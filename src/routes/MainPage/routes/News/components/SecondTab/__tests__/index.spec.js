import React from 'react';
import { shallow } from 'enzyme';
import SecondTab from '..';
import EN from 'i18n/EN';

const props = {
  literals: EN.en.news,
  listItems: [
    {
      date: '1.1.2020.',
      doc: [{}],
      video: [{}],
    },
    {
      date: '1.11.2020.',
      doc: [{}],
      video: [{}],
    },
    {
      date: '11.2.2020.',
      doc: [{}],
      video: [{}],
    },
    {
      date: '11.2.2020.',
      doc: [{}],
      video: [{}],
    },
  ],
  onClickVideo: jest.fn(),
};

let wrapper;

describe('SecondTab tests', () => {
  it('renders', () => {
    wrapper = shallow(<SecondTab {...props} />);
    expect(wrapper.find('.conferences-item').length).toBe(4);
  });

  it('triggers `onClickVideo`', () => {
    wrapper.find('.link-item').first().simulate('click', {});
    expect(props.onClickVideo).toHaveBeenCalledTimes(1);
  });
});
