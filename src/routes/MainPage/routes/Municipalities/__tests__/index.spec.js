import React from 'react';
import { mount } from 'enzyme';
import EN from 'i18n/EN';
import moxios from 'moxios';
import { sessionReducer as session } from 'redux-react-session';
import utils from 'utils';
import Municipalities from '../components';


jest.mock('..', () => <></>);

const saveLocationMock = jest.fn();

const initialProps = {
  literals: EN.en.municipalities,
  showLoading: jest.fn(),
  saveLocation: saveLocationMock,
  location: {},
  favorites: [],
};


const mockStates = [
  {
    name: 'somename',
    cveID: 'somecveid',
  },
];

const mockStates2 = [{
  id: '01',
  name: 'Aguascalientes',
  status: 'very-high',
  cases: {
    confirm: 616, negative: 3232, death: 33, suspicious: 106,
  },
  municipalities: {
    low: 1, medium: 0, high: 2, 'very-high': 8,
  },
}, {
  id: '04',
  name: 'Campeche',
  status: 'very-high',
  cases: {
    confirm: 429, negative: 618, death: 67, suspicious: 62,
  },
  municipalities: {
    low: 0, medium: 0, high: 0, 'very-high': 11,
  },
}];

function mountWithInitialRequest(props = initialProps, mockData = mockStates) {
  const mountedWrapper = mount(<Municipalities
    {...props}
  />);

  return new Promise((resolve) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData,
      }).then(() => {
        resolve(mountedWrapper);
      });
    });
  });
}


describe('Municipalities', () => {
  beforeAll(() => {
    utils.test.initSession(utils.test.initMockStore({
      session,
    }));
  });

  beforeEach(() => {
    // import and pass your custom axios instance to this method
    moxios.install();
  });

  afterEach(() => {
    // import and pass your custom axios instance to this method
    moxios.uninstall();
  });

  it('renders without states & google script', async (done) => {
    const mountedWrapper = await mountWithInitialRequest();
    expect(mountedWrapper.exists()).toBeTruthy();
    mountedWrapper.unmount();
    done();
  });

  it('renders with already added google script', async (done) => {
    utils.test.setupGoogleScript();

    const mountedWrapper = await mountWithInitialRequest({
      ...initialProps,
      location: {
        municipalities: {
          name: 'Mexico city',
        },
      },
    });

    expect(mountedWrapper.exists()).toBeTruthy();
    expect(mountedWrapper.state().states).toEqual(mockStates.map(({
      name,
      cveID,
    }) => ({
      id: cveID,
      value: cveID,
      title: name,
    })));
    mountedWrapper.unmount();

    done();
  });

  it('renders without municipalities', async (done) => {
    utils.test.setupGoogleScript();

    const mountedWrapper = await mountWithInitialRequest();

    expect(mountedWrapper.exists()).toBeTruthy();
    mountedWrapper.unmount();

    done();
  });

  it('updates polygons on level update', async (done) => {
    const mountedWrapper = await mountWithInitialRequest();

    expect(mountedWrapper.exists()).toBeTruthy();

    mountedWrapper.setState(({ levelSelected: ls }) => ({ levelSelected: { ...ls, high: false } }));
    mountedWrapper.unmount();

    done();
  });

  it('opens modal when hospital is selected & it allows user to close it', async (done) => {
    utils.test.setupGoogleScript();
    const mountedWrapper = await mountWithInitialRequest(initialProps, mockStates2);
    mountedWrapper.update();
    expect(mountedWrapper.state().modalActive).toBeFalsy();
    mountedWrapper.find('.map-a-sec').at(0).simulate('click');
    expect(mountedWrapper.state().modalActive).toBeTruthy();

    mountedWrapper.find('.hos-head-txt > p').simulate('click');
    expect(mountedWrapper.state().modalActive).toBeFalsy();

    mountedWrapper.unmount();
    done();
  });

  it('closes modal on back button, when modal is active', async (done) => {
    utils.test.setupGoogleScript();
    const mountedWrapper = await mountWithInitialRequest(initialProps, mockStates2);
    mountedWrapper.update();
    expect(mountedWrapper.state().modalActive).toBeFalsy();
    mountedWrapper.find('.map-a-sec').at(0).simulate('click');
    expect(mountedWrapper.state().modalActive).toBeTruthy();

    window.history.go(-1);

    setTimeout(() => {
      expect(mountedWrapper.state().modalActive).toBeFalsy();
      done();
    }, 100);
  });

  it('allows user to set state as favorite', async (done) => {
    utils.test.setupGoogleScript();
    const mountedWrapper = await mountWithInitialRequest(initialProps, mockStates2);
    mountedWrapper.update();
    expect(mountedWrapper.state().modalActive).toBeFalsy();

    const ind = 0;
    mountedWrapper.find('.map-a-sec').at(ind).simulate('click');
    mountedWrapper.find('.hos-det_sec > span').simulate('click');

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
      }).then(() => {
        expect(mountedWrapper.state().hospitalsFiltered[ind].data.favorite).toBeTruthy();
        done();
      });
    });
  });


  it('renders different components based on state of current active tab index', async (done) => {
    const wrapper = await mountWithInitialRequest();

    wrapper.find('.nav-item > span').at(0).simulate('click');
    wrapper.update();

    expect(wrapper.find('.map').prop('style')).toHaveProperty(
      'display',
      'block',
    );
    expect(wrapper.find('.list').prop('style')).toHaveProperty(
      'display',
      'none',
    );

    wrapper.find('.nav-item > span').at(1).simulate('click');
    wrapper.update();

    expect(wrapper.find('.map').prop('style')).toHaveProperty(
      'display',
      'none',
    );
    expect(wrapper.find('.list').prop('style')).toHaveProperty(
      'display',
      'block',
    );

    wrapper.unmount();
    done();
  });
});
