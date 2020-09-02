import React from 'react';
import EN from 'i18n/EN';
import { shallow } from 'enzyme';
// import FirstTab from '../components/FirstTab';
// import SecondTab from '../components/SecondTab';
import Button from 'components/UI/Button';
import Faq from '../components';

let wrapper;

// don't care about HOC logic
jest.mock('..', () => <></>);

const props = {
  literals: EN.en.faq,
  match: { params: { activeTab: 'exposed' } },
  showLoading: jest.fn(),
};

beforeAll(() => {
  wrapper = shallow(<Faq {...props} />);

  wrapper.setState({ showExposedModal: false }, () => {
    wrapper.instance().componentDidMount();
  });
});

const mockLabelClicked = jest.fn();
let actualLabelClicked;

it('componentDidUpdate', () => {
  actualLabelClicked = wrapper.instance().labelClicked;
  wrapper.instance().labelClicked = mockLabelClicked;
  wrapper.setProps(
    {
      match: { params: { activeTab: 'not exposed' } },
    },
    () => {
      expect(mockLabelClicked).toHaveBeenCalledTimes(1);
    },
  );
});

it('getIndexByURL', () => {
  expect(wrapper.instance().getIndexByURL('advices')).toEqual(1);
  expect(wrapper.instance().getIndexByURL('faq')).toEqual(2);
  expect(wrapper.instance().getIndexByURL('default')).toEqual(1);
});

it('labelClicked', () => {
  wrapper.instance().labelClicked = actualLabelClicked;
  wrapper.instance().labelClicked(1);
  expect(wrapper.state().currentActiveTabIndex).toEqual(1);
});

it('renderTab', () => {
  wrapper.instance().renderTab(0);
  wrapper.update();
  wrapper.instance().renderTab(1);
  wrapper.update();
  expect(wrapper.find('.tab-municipalities-wrapper').length).toBe(1);
  wrapper.instance().renderTab(2);
  // wrapper.update();
  //   expect(wrapper.find(FirstTab).length).toBe(1);
  wrapper.instance().renderTab(3);
  wrapper.update();
  //   expect(wrapper.find(SecondTab).length).toBe(1);
});

it('goToRoute', () => {
  wrapper.instance().goToRoute('');
  expect(wrapper.state().showExposedModal).toEqual(false);
});

it('renderActions', () => {
  wrapper.instance().goToRoute = jest.fn();

  const actions = [
    {
      action: 'faq',
      text: 'faq',
    },
    {
      action: 'external',
      text: 'external',
    },
    {
      action: 'something else',
      text: 'something else',
    },
  ];
  wrapper.setState(
    {
      showExposedModal: true,
      exposedData: { actions, title: 'title', body: {} },
    },
    () => {
      wrapper.find(Button).at(0).simulate('click', {});
      expect(wrapper.instance().goToRoute).toHaveBeenCalledTimes(1);

      wrapper.find('img[src$="green-arrow.svg"]').at(0).simulate('click', {});
      expect(wrapper.state().showExposedModal).toEqual(false);
    },
  );
});

it('updates state when labelClicked fn called', () => {
  // wrapper.setState({ currentActiveTabIndex: 1 }, () => {
  //   expect(wrapper.find(FirstTab).length).toBe(1);
  //   expect(wrapper.find(SecondTab).length).toBe(0);
  // });
  // wrapper.setState({ currentActiveTabIndex: 2 }, () => {
  //   expect(wrapper.find(FirstTab).length).toBe(0);
  //   expect(wrapper.find(SecondTab).length).toBe(1);
  // });
  // wrapper.instance().labelClicked(1);
  // expect(wrapper.state().currentActiveTabIndex).toBe(1);
});
