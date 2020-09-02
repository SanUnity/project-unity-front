import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from '..';

describe('SearchBar tests', () => {
  let wrapper;
  const props = {
    placeholder: '',
    listItems: [],
    filters: [],
    searchInitiated: jest.fn(),
    filterSelected: jest.fn(),
    onShowFilters: jest.fn(),
  };

  beforeAll(() => {
    wrapper = shallow(<SearchBar {...props} />);
  });

  it('input field `onChange` accepts all variations of value', () => {
    wrapper
      .find('input')
      .simulate('change', { target: { value: 'some input' } });
    expect(wrapper.find('input').prop('value')).toEqual('some input');

    wrapper
      .find('input')
      .simulate('change', { target: { value: String.fromCharCode(128) } });
    expect(wrapper.find('input').prop('value')).toEqual(
      String.fromCharCode(128),
    );

    wrapper
      .find('input')
      .simulate('change', { target: { value: String.fromCharCode(162) } });
    expect(wrapper.find('input').prop('value')).toEqual(
      String.fromCharCode(162),
    );

    wrapper
      .find('input')
      .simulate('change', { target: { value: String.fromCharCode(32) } });
    expect(wrapper.find('input').prop('value')).toEqual(
      String.fromCharCode(32),
    );

    wrapper.find('input').simulate('change', { target: { value: String.fromCharCode(33) } });
    expect(wrapper.find('input').prop('value')).toEqual(' ');
  });

  it('removes keydown listener on unmount', () => {
    window.removeEventListener = jest.fn();
    wrapper.instance().componentWillUnmount();
    expect(window.removeEventListener).toHaveBeenCalledTimes(1);
  });

  it('closes search dropdown if it is open and `ESC` key is clicked', () => {
    document.querySelector = () => {
      return { classList: { add: jest.fn(), remove: jest.fn() } };
    };
    wrapper.instance().inputRef = { current: { blur: jest.fn() } };
    wrapper.instance().openSearchDropdown();
    wrapper.instance().keydownListener({ keyCode: 27 });

    expect(wrapper.instance().searchActive).toBeFalsy();

    wrapper.instance().openSearchDropdown();
    wrapper.instance().keydownListener({ keyCode: 26 });
    expect(wrapper.instance().searchActive).toBeTruthy();
  });

  it('toggles filter dropdown by toggling it`s `open` class', () => {
    const mockFn = jest.fn();
    document.querySelector = () => {
      return { classList: { toggle: mockFn } };
    };
    wrapper.instance().toggleFilterDropdown();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('closes search dropdown when clicked on root div with id `searchOverlayMiddleware`', () => {
    wrapper.instance().closeSearchDropdown = jest.fn();
    wrapper.find('#searchOverlayMiddleware').simulate('click', {});
    expect(wrapper.instance().closeSearchDropdown).toHaveBeenCalledTimes(1);
  });

  it('triggers `itemSelected` prop (THIS IS A PLACEHOLDER DUE TO FUNCTIONALITY REMOVED)', () => {
    wrapper.instance().props.itemSelected();
  });

  it('renders a button and triggers `onShowFilters` function, if passed as prop', () => {
    wrapper.find('.btn-filters').simulate('click', {});
    expect(props.onShowFilters).toHaveBeenCalledTimes(1);
  });
});
