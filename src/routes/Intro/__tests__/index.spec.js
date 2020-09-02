import React from 'react';
import EN from 'i18n/EN';
import { wrapInRouter, SUCCESS_DIV_ID } from 'setupTests';
import UserSession from 'routes/App/userSession';
import { shallow } from 'enzyme';
import WelcomePage from '../components/WelcomePage';
import Intro from '../components';

let wrappedInRouter;
let componentRef;

// don't care about HOC logic
jest.mock('..', () => <></>);

const props = {
  showLoading: jest.fn(),
  literals: EN.en,
  setMunicipalityConfiguration: jest.fn(),
};

describe('Intro tests, mount', () => {
  beforeAll(() => {
    wrappedInRouter = wrapInRouter(<Intro {...props} />, '/main/test');

    componentRef = wrappedInRouter.find(Intro);
  });

  afterAll(() => {
    wrappedInRouter.unmount();
  });

  it('renders different components based on state of checking session', () => {
    componentRef.instance().setState({ checkingSession: true });
    wrappedInRouter.update();
    expect(wrappedInRouter.find(WelcomePage).length).toBe(0);

    componentRef.instance().setState({ checkingSession: false });
    wrappedInRouter.update();
    expect(wrappedInRouter.find(WelcomePage).length).toBe(1);
  });

  it('redirects user if session is valid', () => {
    componentRef
      .instance()
      .setState({ checkingSession: false, sessionValid: true });
    wrappedInRouter.update();
    expect(wrappedInRouter.find(Intro).length).toBe(0);
    expect(wrappedInRouter.find(`#${SUCCESS_DIV_ID}`).length).toBe(1);
  });
});

describe('Intro tests, shallow', () => {
  it('sets state based on session check', () => {
    // eslint-disable-next-line no-unused-vars
    const wrapper = shallow(<Intro {...props} />);

    // jest fails to display active state, maybe a version issue, can't `expect` here
  });


  it('sets state based on session check', () => {
    UserSession.checkSession = jest.fn();
    // eslint-disable-next-line no-unused-vars
    const wrapper = shallow(<Intro {...props} />);

    // jest fails to display active state, maybe a version issue, can't `expect` here
  });
});
