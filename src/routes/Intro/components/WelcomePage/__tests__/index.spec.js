import React from 'react';
import { shallow } from 'enzyme';
import WelcomePage from '..';
import EN from 'i18n/EN';
import SelectInput from 'components/SelectInput';
import Button from 'components/UI/Button';
import Onboarding from '../Onboarding';

const props = {
  literals: EN.en,
  setMunicipalityConfiguration: jest.fn(),
};

jest.mock('utils/apiFetch', () => {
  return jest.fn().mockReturnValue([
    { id: 1, name: 'first' },
    { id: 2, name: 'second' },
  ]);
});

describe('WelcomePage tests', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<WelcomePage {...props} />);
  });

  it('renders', () => {
    expect(wrapper.find('section').length).toBe(1);
    expect(wrapper.instance().state.statesArray.length).toBe(2);
  });

  it('handleChange triggered on SelectInput onChange event', () => {
    wrapper
      .find(SelectInput)
      .simulate('change', { target: { value: 'selected' } });
    expect(wrapper.instance().state.stateSelected).toEqual('selected');
  });

  it('handleStateSelected triggered on Button onClick event', () => {
    wrapper.find(Button).simulate('click', {});
    expect(props.setMunicipalityConfiguration).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().state.showOnboarding).toEqual(true);
  });

  it('handleFinish triggered on Onboarding onFinish event', () => {
    wrapper.find(Onboarding).simulate('finish', {});
  });
});

const props1 = {
  literals: EN.en.onboarding,
  onFinish: jest.fn(),
};

describe('Onboarding tests', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<Onboarding {...props1} />);
  });

  it('renders', () => {
    expect(wrapper.find('.onboarding-main-wrapper').length).toBe(1);
  });

  it('handleClick covers all cases', () => {
    wrapper.instance().slider = { current: { slickNext: jest.fn() } };
    wrapper.find(Button).first().simulate('click', {});
    expect(wrapper.instance().slider.current.slickNext).toHaveBeenCalledTimes(
      1,
    );
    wrapper
      .find(Button)
      .at(wrapper.instance().state.steps.length - 1)
      .simulate('click', {});
    expect(props1.onFinish).toHaveBeenCalledTimes(1);

    wrapper.instance().handleClick('activateBT', 0);
    expect(wrapper.instance().slider.current.slickNext).toHaveBeenCalledTimes(
      2,
    );
    wrapper
      .instance()
      .handleClick('continue', wrapper.instance().state.steps.length - 1);
    expect(props1.onFinish).toHaveBeenCalledTimes(2);

    // dummy to trigger default
    wrapper.instance().handleClick('', 0);
    expect(wrapper.instance().slider.current.slickNext).toHaveBeenCalledTimes(
      2,
    );
    expect(props1.onFinish).toHaveBeenCalledTimes(2);

    wrapper.find('.onboarding-skip').simulate('click', {});
    expect(wrapper.instance().slider.current.slickNext).toHaveBeenCalledTimes(
      2,
    );
    expect(props1.onFinish).toHaveBeenCalledTimes(3);
  });
});
