import React from 'react';
import { shallow, mount } from 'enzyme';
import Content from '..';
import EN from 'i18n/EN';

let wrapper;

const routePush = jest.fn();

const props = {
  literals: EN.en.results,
  route: {
    path: 'content',
    push: routePush,
  },
  data: {
    call911: true,
    showHealthUnits: true,
    extraSubtitle: true,
    recomendations: [<div>recommendation</div>],
    showMoreButton: true,
    showMessage: true,
    showCall: true,
    showCallEmergency: true,
  },
  result: {
    folio: true,
  },
};

describe('Content', () => {
  beforeAll(() => {
    wrapper = shallow(<Content {...props} />);
  });
  it('renders as page', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders as modal', () => {
    const modalWraper = shallow(<Content {...props} modal data={{ ...props.data, call911: false }} result={{ timestamp: Math.floor(new Date().getTime() / 1000) }} />);
    expect(modalWraper.exists()).toBeTruthy();
    modalWraper.unmount();
  });

  it('redirects on button click', () => {
    const mountedWrapper = mount(<Content {...props} />);
    const buttons = mountedWrapper.find('button');

    buttons.forEach(button => button.simulate('click'));

    expect(routePush).toHaveBeenCalledTimes(buttons.length);
    mountedWrapper.unmount();
  });

  afterAll(() => {
    wrapper.unmount();
  });
});
