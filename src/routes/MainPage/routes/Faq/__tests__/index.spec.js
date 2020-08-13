import React from 'react';
import EN from 'i18n/EN';
import { shallow } from 'enzyme';
import FirstTab from '../components/FirstTab';
import SecondTab from '../components/SecondTab';
import Faq from '../components';

let wrapper;

// don't care about HOC logic
jest.mock('..', () => <></>);


beforeAll(() => {
  wrapper = shallow(<Faq literals={EN.en.faq} />);
});

it('renders different components based on state of current active tab index', () => {
  wrapper.setState({ currentActiveTabIndex: 1 }, () => {
    expect(wrapper.find(FirstTab).length).toBe(1);
    expect(wrapper.find(SecondTab).length).toBe(0);
  });

  wrapper.setState({ currentActiveTabIndex: 2 }, () => {
    expect(wrapper.find(FirstTab).length).toBe(0);
    expect(wrapper.find(SecondTab).length).toBe(1);
  });
});

it('updates state when labelClicked fn called', () => {
  wrapper.instance().labelClicked(1);
  expect(wrapper.state().currentActiveTabIndex).toBe(1);
});
