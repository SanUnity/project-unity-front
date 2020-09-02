import React from 'react';
import { shallow } from 'enzyme';
import Toggle from '..';

describe('Toggle tests', () => {
  const props = {
    checked: true,
    callback: jest.fn(),
  };

  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<Toggle {...props} />);
  });

  it('triggers callback prop onChange', () => {
    wrapper.find('input').simulate('change', {});
    expect(props.callback).toHaveBeenCalledTimes(1);
  });
});
