import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from '..';

let wrapper;

beforeAll(() => {
  const props = {
    placeholder: '',
    listItems: [],
    filters: [],
    searchInitiated: jest.fn(),
    itemSelected: jest.fn(),
    filterSelected: jest.fn(),
  };

  wrapper = shallow(<SearchBar {...props} />);
});

it('has a field that accepts user input', () => {
  wrapper.find('input').simulate('change', { target: { value: 'some input' } });
  expect(wrapper.find('input').prop('value')).toEqual('some input');
});

it('triggers proper callbacks', () => {
  // TODO: dunno how to mock document...
  wrapper.instance().closeSearchDropdown = jest.fn();
  wrapper.find('#searchOverlayMiddleware').simulate('click', {});
  expect(wrapper.instance().closeSearchDropdown).toHaveBeenCalledTimes(1);
});
