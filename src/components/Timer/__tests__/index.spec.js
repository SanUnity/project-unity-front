import React from 'react';
import { shallow } from 'enzyme';
import Timer from '..';
import { SUCCESS_DIV, SUCCESS_DIV_ID } from 'setupTests';

describe('Timer tests', () => {
  const props = {
    timestamp: new Date('1.1.1999.').getTime() / 1000,
    DoneContent: () => SUCCESS_DIV,
  };
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<Timer {...props} />);
  });

  it('renders', () => {
    expect(wrapper.find(`#${SUCCESS_DIV_ID}`).exists()).toBeFalsy();
  });

  it('takes else branches when timestamp is in future and clears interval', () => {
    jest.useFakeTimers();
    props.timestamp = new Date('1.1.9999.').getTime();
    const wrapper2 = shallow(<Timer {...props} />);
    wrapper2.instance().componentWillUnmount();
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });

  it('refreshTime', () => {
    wrapper.instance().timestamp = Number.MIN_SAFE_INTEGER;
    wrapper.instance().refreshTime();
    wrapper.instance().timestamp = Number.MAX_SAFE_INTEGER;
    wrapper.instance().refreshTime();
  });
});
