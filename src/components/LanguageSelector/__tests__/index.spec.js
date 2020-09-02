import React from 'react';
import { shallow } from 'enzyme';
import LanguageSelector from '../components';

// don't care about HOC logic
jest.mock('..', () => <></>);

const props = {
  setLanguage: jest.fn(),
};

let wrapper;

beforeAll(() => {
  wrapper = shallow(<LanguageSelector {...props} />);
});

it('renders', () => {
  expect(wrapper.exists()).toBeTruthy();
});

it('triggers `setLanguage` upon clicking on a language image', () => {
  wrapper.find('img').first().simulate('click', {});
  expect(props.setLanguage).toHaveBeenCalledTimes(1);
});
