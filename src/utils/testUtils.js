import { sessionService } from 'redux-react-session';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

function setupGoogleScript() {
  const googleScript = document.createElement('script');

  googleScript.setAttribute('id', 'googleScript');
  document.body.appendChild(googleScript);

  window.google = {
    maps: {
      Map: () => ({
        setCenter: jest.fn(),
        setZoom: jest.fn(),
      }),
      Marker: () => ({
        setMap: jest.fn(),
      }),
      LatLng: () => {},
      LatLngBounds: () => ({
        extend: jest.fn(),
      }),
      Polygon: () => ({
        setMap: jest.fn(),
      }),
      event: {
        addListener: jest.fn(),
        removeListener: jest.fn(),
      },
    },
  };
}


const mockProfiles = [{
  id: 'OAhvFXQBcrCcd3otcgKZ',
  name: 'Community sdasd',
  lastTest: 1598101234,
  level: 'medium-high',
  postalCode: '11560',
  passStatus: 'good',
  exitRequests: [],
  pcr: [],
  isDefault: true,
}, {
  id: 'OAhvFXQBcrCcd3otcgK2',
  name: 'Community sdasd',
  lastTest: 1598101254,
  level: 'medium-high',
  postalCode: '11560',
  passStatus: 'good',
  exitRequests: [],
  pcr: [],
  isDefault: true,
}];

function initMockStore(reducers) {
  const middleware = [thunk];

  const mockStore = configureMockStore(middleware);
  return mockStore(reducers);
}

function initSession(store) {
  sessionService.initSessionService(store);

  sessionService.saveUser({
    id: 'testid',
    profiles: mockProfiles,
  });
}

export default {
  setupGoogleScript,
  mockProfiles,
  initMockStore,
  initSession,
};
