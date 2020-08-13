import React from 'react';
import EN from 'i18n/EN';
import { wrapInRouter, SUCCESS_DIV_ID } from 'setupTests';
import SplashScreen from '../components/SplashScreen';
import WelcomePage from '../components/WelcomePage';
import Intro from '../components';

let wrappedInRouter;
let componentRef;

// don't care about HOC logic
jest.mock('..', () => <></>);

beforeAll(() => {
  wrappedInRouter = wrapInRouter(<Intro literals={EN.en} />, '/main/test');

  componentRef = wrappedInRouter.find(Intro);
});

afterAll(() => {
  wrappedInRouter.unmount();
});

it('renders different components based on state of checking session', () => {
  componentRef.instance().setState({ checkingSession: true });
  wrappedInRouter.update();
  expect(wrappedInRouter.find(SplashScreen).length).toBe(1);
  expect(wrappedInRouter.find(WelcomePage).length).toBe(0);

  componentRef.instance().setState({ checkingSession: false });
  wrappedInRouter.update();
  expect(wrappedInRouter.find(SplashScreen).length).toBe(0);
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
