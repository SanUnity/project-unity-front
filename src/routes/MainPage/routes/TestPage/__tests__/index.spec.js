import React from 'react';
import EN from 'i18n/EN';
import { wrapInRouter } from 'setupTests';
import StartTest from '../components/StartTest';
import TestPage from '../components';
import Profiles from '../components/Profiles/components';

let wrappedInRouter;
let componentRef;

// don't care about HOC logic
jest.mock('..', () => <></>);
jest.mock('../components/Profiles/components/Profile', () => () => <></>);


const props = {
  literals: EN.en,
  profiles: [],
  showLoading: () => {},
  btActive: false,
  changeLang: () => {},
};

beforeAll(() => {
  wrappedInRouter = wrapInRouter(<TestPage {...props} />, '/form-test');

  componentRef = wrappedInRouter.find(TestPage);
});

afterAll(() => {
  wrappedInRouter.unmount();
});

it('renders different components based on state', () => {
  componentRef.instance().setState({ loaded: true });
  wrappedInRouter.update();
  expect(wrappedInRouter.find(StartTest).length).toBe(1);
  expect(wrappedInRouter.find(Profiles).length).toBe(0);

  componentRef
    .instance()
    .setState({ profiles: [{ name: 'John Doe' }], phone: '1234567890' });
  wrappedInRouter.update();
  expect(wrappedInRouter.find(StartTest).length).toBe(0);
  expect(wrappedInRouter.find(Profiles).length).toBe(1);
  // componentRef.instance().setState({
  //   loaded: true,
  //   displayTimerPage: true,
  //   hours: 0,
  //   minutes: 0,
  //   seconds: 0,
  // });
  // wrappedInRouter.update();
  // expect(wrappedInRouter.find(StartTest).length).toBe(0);
  // expect(wrappedInRouter.find(Profiles).length).toBe(1);
  componentRef.instance().setState({ loaded: false });
  wrappedInRouter.update();
  expect(wrappedInRouter.find(StartTest).length).toBe(0);
  expect(wrappedInRouter.find(Profiles).length).toBe(0);
});

// it('redirects user to testing form upon clicking on the button', () => {
//   componentRef.instance().setState({ loaded: true, displayTimerPage: false });
//   wrappedInRouter.update();
//   expect(wrappedInRouter.find(StartTest).length).toBe(1);
//   expect(wrappedInRouter.find(Button).find('a').length).toBe(1);
//   wrappedInRouter.find(Button).find('a').simulate('click', { button: 0 });
//   expect(wrappedInRouter.find(`#${SUCCESS_DIV_ID}`).length).toBe(1);
// });
