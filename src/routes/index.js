import MainPage from './MainPage';
import Intro from './Intro';
import ConfirmationPage from './Confirmation';
import SignupPage from './Signup';
import FormTest from './FormTest';
import NotFound from './NotFound';
import Results from './Results';
import SignupOptions from './SignupOptions';

export const ROUTE_PATH = Object.freeze({
  BASEROUTE: '/',
  CONFIRMATION: '/confirmation',
  SIGNUP: '/signup',
  SIGNUPOPTIONS: '/signup-options',
  MAIN_PAGE: '/main',
  FORM_TEST: '/form-test',
  RESULTS: '/results',
});

export const routes = [
  {
    path: ROUTE_PATH.BASEROUTE,
    component: Intro,
    exact: true,
    header: true,
    ignoreSession: true,
  },
  {
    path: ROUTE_PATH.MAIN_PAGE,
    component: MainPage,
    exact: false,
    header: true,
    ignoreSession: false,
  },
  {
    path: ROUTE_PATH.SIGNUP,
    component: SignupPage,
    exact: false,
    header: false,
    ignoreSession: true,
    redirectIfAuth: true,
  },
  {
    path: ROUTE_PATH.SIGNUPOPTIONS,
    component: SignupOptions,
    exact: false,
    header: false,
    ignoreSession: true,
    redirectIfAuth: true,
  },
  {
    path: ROUTE_PATH.CONFIRMATION,
    component: ConfirmationPage,
    exact: false,
    header: false,
    ignoreSession: true,
    redirectIfAuth: true,
  },
  {
    path: ROUTE_PATH.RESULTS,
    component: Results,
    exact: true,
    header: false,
    ignoreSession: false,
  },
  {
    path: ROUTE_PATH.FORM_TEST,
    component: FormTest,
    exact: false,
    header: false,
    ignoreSession: false,
  },
  {
    component: NotFound,
    header: false,
  },
];
