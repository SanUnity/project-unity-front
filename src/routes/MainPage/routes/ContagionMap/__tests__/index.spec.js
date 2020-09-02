import React from 'react';
import { shallow } from 'enzyme';
import EN from 'i18n/EN';
import ContagionMap from '../components';

// don't care about HOC logic
jest.mock('..', () => <></>);

let wrapper;

const props = {
  literals: EN.en.contagionMap,
};

describe('ContagionMap tests', () => {
  beforeAll(() => {
    wrapper = shallow(<ContagionMap {...props} />);
  });

  it('renders', () => {
    expect(wrapper.find('section').length).toBe(1);
  });
});
