import React from 'react';
import { shallow } from 'enzyme';
import ErrorBoundary from '..';
import { SUCCESS_DIV, SUCCESS_DIV_ID } from 'setupTests';

describe('ErrorBoundary tests', () => {
  let wrapper;

  beforeAll(() => {
    const props = {
      children: <></>,
    };
    wrapper = shallow(<ErrorBoundary {...props} />);
  });

  it('renders', () => {
    expect(wrapper.hasClass('ErrorBoundary')).toBeFalsy();
    wrapper.setState({ hasError: true }, () => {
      expect(wrapper.hasClass('ErrorBoundary')).toBeTruthy();
    });

    wrapper.setState({ hasError: true, loading: true }, () => {
      expect(wrapper.find('.loading').exists()).toBeTruthy();
    });
  });
});

describe('catches and displays the error', () => {
  let wrapper;

  beforeAll(() => {
    jest.spyOn(global.console, 'error');
    wrapper = shallow(<ErrorBoundary>{SUCCESS_DIV}</ErrorBoundary>);

    // dummy to cover error writing branch, actual test is covered with other variation
    wrapper.instance().componentDidCatch(null, {
      componentStack: 'some stack',
    });

    wrapper.instance().componentDidCatch('an error occured', {
      componentStack: 'some stack',
    });
    wrapper.update();
  });

  it('should log an error to console', () => {
    expect(global.console.error).toHaveBeenCalledWith('an error occured');
  });

  it('should update the state to indicate an error', () => {
    expect(wrapper.instance().state.hasError).toBeTruthy();
  });

  it('should not render the child component', () => {
    expect(wrapper.find(`#${SUCCESS_DIV_ID}`).exists()).toBeFalsy();
  });
});

describe('catches error and creates log', () => {
  let wrapper;

  beforeAll(() => {
    jest.useFakeTimers();
    Object.defineProperty(window, 'location', {
      value: {
        hostname: 'allaal',
      },
    });
    jest.spyOn(global.console, 'error');
    wrapper = shallow(<ErrorBoundary>{SUCCESS_DIV}</ErrorBoundary>);

    // dummy to cover error writing branch, actual test is covered with other variation
    wrapper.instance().componentDidCatch('an error occured', {
      componentStack: 'some stack',
    });

    wrapper.instance().componentDidCatch(null, {
      componentStack: 'some stack',
    });
    wrapper.update();
  });

  it('should update the state to indicate an error', () => {
    expect(wrapper.instance().state.hasError).toBeTruthy();
    jest.runAllTimers();
    expect(wrapper.instance().state.loading).toBeFalsy();
  });

  it('should not render the child component', () => {
    expect(wrapper.find(`#${SUCCESS_DIV_ID}`).exists()).toBeFalsy();
  });
});
