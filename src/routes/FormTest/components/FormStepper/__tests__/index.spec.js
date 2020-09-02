import React from 'react';
import { shallow } from 'enzyme';
import FormStepper from '..';

let wrapper;

const stepClicked = jest.fn();

describe('FormStepper', () => {
  beforeAll(() => {
    wrapper = shallow(<FormStepper numberOfSteps={3} stepClicked={stepClicked} />);
  });
  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('allows user to click on a step', () => {
    wrapper.find('.stepper-circle:not(.active)').at(0).simulate('click');
    expect(stepClicked).toBeCalled();
  });
});
