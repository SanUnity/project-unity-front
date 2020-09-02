import React from 'react';
import { shallow } from 'enzyme';
import EN from 'i18n/EN';
import { TEST_RESUL_MEDIUM, TEST_RESUL_LOW } from 'constants/tests';
import { Redirect } from 'react-router';
import ComponentHeader from 'components/UI/ComponentHeader';
import Results from '../components';

let wrapper;

window.onMobileDevice = jest.fn(() => true);
window.nativeShareApp = jest.fn();
const routePush = jest.fn();


jest.mock('..', () => <></>);

const props = {
  literals: EN.en.results,
  result: { level: TEST_RESUL_MEDIUM },
  route: {
    path: 'content',
    push: routePush,
  },
};

describe('Results', () => {
  beforeAll(() => {
    wrapper = shallow(<Results {...props} />);
  });

  it('renders without result', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('handles app sharing on mobile device', () => {
    const wrapper2 = shallow(<Results
      {...props}
      simple={false}
    />);

    expect(window.onMobileDevice).toBeCalled();

    wrapper2.find('.last-ho').simulate('click');
    expect(window.nativeShareApp).toBeCalled();
    expect(wrapper2.exists()).toBeTruthy();
  });

  it('updates status on result update', () => {
    const firstState = wrapper.state().currentLevel;
    wrapper.setProps({
      result: { level: TEST_RESUL_LOW },
    });

    expect(wrapper.state().currentLevel).not.toBe(firstState);
  });


  it('hides result when level is not set', () => {
    wrapper.setProps({
      result: {
        levelt: 'none',
      },
    });

    expect(wrapper.debug()).toBe('');
  });

  it('redirects user when there are no results', () => {
    const wrapper2 = shallow(<Results
      {...props}
      result={null}
    />);


    expect(wrapper2.find(Redirect).exists()).toBeTruthy();
  });


  it('allows user to go back to the test', () => {
    const wrapper2 = shallow(<Results
      {...props}
      simple={false}
    />);
    wrapper2.find(ComponentHeader).dive().find('img.tst-abb').simulate('click');
    expect(routePush).toBeCalled();
  });
});
