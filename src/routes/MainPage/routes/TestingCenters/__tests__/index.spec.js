import React from 'react';
import EN from 'i18n/EN';
import { shallow } from 'enzyme';
import Map from '../components/Map';
import List from '../components/List';
import TestingCenters from '../components';

let wrapper;

// don't care about HOC logic
jest.mock('..', () => <></>);

beforeAll(() => {
  const props = {
    showLoading: () => {
      return false;
    },
    saveLocation: () => {},
    location: { lat: 0, lng: 0 },
    literals: EN.en.testingCenters,
  };

  wrapper = shallow(<TestingCenters {...props} />);
});

it('renders different components based on state of current active tab index', () => {
  wrapper.setState({ currentActiveTabIndex: 1 }, () => {
    expect(wrapper.find('.map').prop('style')).toHaveProperty(
      'display',
      'block',
    );
    expect(wrapper.find('.list').prop('style')).toHaveProperty(
      'display',
      'none',
    );
    expect(wrapper.find(Map).length).toBe(1);
    expect(wrapper.find(List).length).toBe(1);
  });

  wrapper.setState({ currentActiveTabIndex: 2 }, () => {
    expect(wrapper.find('.map').prop('style')).toHaveProperty(
      'display',
      'none',
    );
    expect(wrapper.find('.list').prop('style')).toHaveProperty(
      'display',
      'block',
    );
    expect(wrapper.find(Map).length).toBe(1);
    expect(wrapper.find(List).length).toBe(1);
  });
});
