import React from 'react';
import EN from 'i18n/EN';
import { mount } from 'enzyme';
import utils from 'utils';
import { sessionReducer as session } from 'redux-react-session';
import moxios from 'moxios';
import TestingCenters from '../components';

const props = {
  showLoading: () => {
    return false;
  },
  saveLocation: () => {},
  location: { lat: 0, lng: 0 },
  literals: EN.en.testingCenters,
  match: { params: { levelType: 1 } },
};

const mockStates = [
  {
    id: 1,
    name: 'Aguascalientes',
    status: 'very-high',
    cases: {
      confirm: 616,
      negative: 3232,
      death: 33,
      suspicious: 106,
    },
    municipalities: {
      low: 1,
      medium: 0,
      high: 2,
      'very-high': 8,
    },
  },
  {
    id: 4,
    name: 'Campeche',
    status: 'very-high',
    cases: {
      confirm: 429,
      negative: 618,
      death: 67,
      suspicious: 62,
    },
    municipalities: {
      low: 0,
      medium: 0,
      high: 0,
      'very-high': 11,
    },
  },
];

function mountWithInitialRequest(properties = props, mockData = mockStates) {
  const mountedWrapper = mount(<TestingCenters {...properties} />);

  return new Promise((resolve) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: mockData,
        })
        .then(() => {
          resolve(mountedWrapper);
        });
    });
  });
}

// don't care about HOC logic
jest.mock('..', () => <></>);

describe('Testing centers', () => {
  beforeAll(() => {
    utils.test.initSession(
      utils.test.initMockStore({
        session,
      }),
    );
  });

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
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

  it('renders with already initialized google script', async (done) => {
    utils.test.setupGoogleScript();
    const mountedWrapper = await mountWithInitialRequest();

    expect(mountedWrapper.exists()).toBeTruthy();
    mountedWrapper.unmount();

    done();
  });

  it('loads with prepared testing centers', async (done) => {
    utils.test.setupGoogleScript();
    const mountedWrapper = await mountWithInitialRequest({
      ...props,
      location: {
        lat: 45,
        lng: 45,
        testingCenters: [
          {
            name: 'test-center',
          },
        ],
      },
    });

    expect(mountedWrapper.exists()).toBeTruthy();

    mountedWrapper.unmount();

    done();
  });

  it('allows user to select a hospital within a modal', async (done) => {
    utils.test.setupGoogleScript();
    const mountedWrapper = await mountWithInitialRequest();

    expect(mountedWrapper.exists()).toBeTruthy();

    const stateSelect = mountedWrapper.find('select[name="state"]');
    stateSelect.simulate('change', {
      target: {
        value: mockStates[0].id,
      },
    });

    const mockMunicipalities = [
      {
        id: 2,
        name: 'test-municipality',
      },
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: mockMunicipalities,
        })
        .then(() => {
          expect(mountedWrapper.state().municipalities).toEqual(
            mockMunicipalities.map(({ id, name }) => ({
              id,
              title: name,
              value: id,
            })),
          );

          const municipalitySelect = mountedWrapper.find(
            'select[name="municipality"]',
          );
          municipalitySelect.simulate('change', {
            target: {
              value: mockMunicipalities[0].id,
            },
          });

          const mockHospitals = [
            {
              hospitalID: 911,
              hospital: 'first hospital',
              address: 'CARRETERA TRANSPENINSULAR,S/N.',
              level: 2,
              openTime: [],
              location: { lon: '-111.36473608707', lat: '26.007347674099' },
              suburb: 'NUEVO LORETO',
              covid: true,
            },
            {
              hospitalID: 523,
              hospital: 'second hospital',
              address: 'test address',
              level: 1,
              openTime: [],
              suburb: 'test LORETO',
              covid: true,
            },
            {
              hospitalID: 132,
              hospital: 'third hospital',
              address: 'address test',
              level: 3,
              openTime: ['00-24h'],
              suburb: 'NUEVO test',
              covid: true,
            },

            {
              hospitalID: 231,
              hospital: 'fourth hospital',
              address: 'some test address',
              level: 1,
              openTime: [],
              suburb: 'test 2',
              covid: false,
            },
          ];

          moxios.wait(() => {
            const request2 = moxios.requests.mostRecent();
            request2
              .respondWith({
                status: 200,
                response: mockHospitals,
              })
              .then(() => {
                expect(mountedWrapper.state().hospitals).toEqual(mockHospitals);

                const levelSelect = mountedWrapper.find('select[name="level"]');

                levelSelect.simulate('change', {
                  target: {
                    value: 2,
                  },
                });

                levelSelect.simulate('change', {
                  target: {
                    value: 3,
                  },
                });

                levelSelect.simulate('change', {
                  target: {
                    value: 1,
                  },
                });

                const firstLevelHospitals = mountedWrapper
                  .state()
                  .hospitalsFiltered.filter(h => h.level === 1);

                expect(
                  mountedWrapper
                    .state()
                    .hospitalsFiltered.filter(h => h.level !== 1).length,
                ).toBe(0);

                const searchInput = mountedWrapper.find('.search input[type="text"]');
                searchInput.simulate('change', {
                  target: {
                    value: firstLevelHospitals[0].suburb.slice(0, 10),
                  },
                });

                expect(mountedWrapper
                  .state()
                  .hospitalsFiltered[0]).toEqual(firstLevelHospitals[0]);


                expect(mountedWrapper.state().modalActive).toBeFalsy();
                mountedWrapper.find('.map-a-sec').at(0).simulate('click');
                expect(mountedWrapper.state().modalActive).toBeTruthy();

                /** allows user to close it on 'close' button */
                mountedWrapper.find('.hos-head-txt > p').simulate('click');
                expect(mountedWrapper.state().modalActive).toBeFalsy();

                /** reset to lvl 3 */
                searchInput.simulate('change', {
                  target: {
                    value: '',
                  },
                });
                levelSelect.simulate('change', {
                  target: {
                    value: 3,
                  },
                });

                mountedWrapper.update();

                mountedWrapper.find('.map-a-sec').at(0).simulate('click');
                expect(mountedWrapper.state().modalActive).toBeTruthy();

                mountedWrapper.find('#overlayMiddleware').simulate('click');
                expect(mountedWrapper.state().modalActive).toBeFalsy();

                mountedWrapper.unmount();
                done();
              });
          });
        });
    });
  });
});
