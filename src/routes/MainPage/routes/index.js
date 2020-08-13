import React from 'react';
import { Redirect } from 'react-router';
import FaqIcon from '../icons/Faq';
import Home from '../icons/Home';
// import ManagementHealth from '../icons/ManagementHealth';
// import Location from '../icons/Location';
import Hospital from '../icons/Hospital';
import NewsIcon from '../icons/News';
import BTIcon from '../icons/BT';
import Faq from './Faq';
// import Municipalities from './Municipalities';
// import ContagionMap from './ContagionMap';
import TestingCenters from './TestingCenters';
import TestPage from './TestPage';
import News from './News';
import Profile from './Profile';
import BTStatus from './BTStatus';
import { ROUTE_PATH as PARENT_ROUTE_PATH } from '../..';

export const ROUTE_PATH = Object.freeze({
  BASE_ROUTE: '/',
  TEST: '/test',
  NEWS: '/news/:activeTab?',
  CONTAGIOS: '/contagios',
  FAQ: '/faq/:activeTab?',
  // MUNICIPALITIES: '/municipalities',
  CENTRES: '/centros-de-salud/:levelType?',
  PROFILE_HISTORY: '/profile/:profileID/:mode',
  PROFILE_REQUEST: '/profile/:profileID/request/:requestID',
  BTSTATUS: '/bt-status',
});

export const routes = [
  {
    id: 0,
    path: ROUTE_PATH.BASE_ROUTE,
    component: () => <Redirect to={PARENT_ROUTE_PATH.MAIN_PAGE + ROUTE_PATH.TEST} />,
    exact: true,
    footer: true,
    ignoreSession: false,
  },
  {
    id: 1,
    path: ROUTE_PATH.TEST,
    component: TestPage,
    exact: true,
    footer: true,
    ignoreSession: false,
    title: 'profile',
    title2: 'family',
    icon: Home,
  },
  {
    id: 6,
    path: ROUTE_PATH.BTSTATUS,
    component: BTStatus,
    exact: true,
    footer: true,
    ignoreSession: false,
    title: 'btstatus',
    icon: BTIcon,
  },
  /* {
    path: ROUTE_PATH.CONTAGIOS,
    component: ContagionMap,
    exact: true,
    footer: true,
    ignoreSession: false,
    title: 'contagious',
    icon: Location,
  }, */
  /* {
    id: 2,
    path: ROUTE_PATH.MUNICIPALITIES,
    component: Municipalities,
    exact: true,
    footer: true,
    ignoreSession: false,
  }, */
  {
    id: 2,
    path: ROUTE_PATH.FAQ,
    component: Faq,
    exact: true,
    footer: true,
    ignoreSession: false,
    title: 'faq',
    icon: FaqIcon,
  },
  {
    id: 5,
    path: ROUTE_PATH.NEWS,
    component: News,
    exact: true,
    footer: true,
    ignoreSession: false,
    title: 'news',
    icon: NewsIcon,
  },
  {
    path: ROUTE_PATH.CENTRES,
    component: TestingCenters,
    exact: true,
    footer: true,
    ignoreSession: false,
    title: 'centres',
    icon: Hospital,
  },
  {
    id: 3,
    path: ROUTE_PATH.PROFILE_REQUEST,
    component: Profile,
    exact: true,
    footer: false,
    ignoreSession: false,
  },
  {
    id: 4,
    path: ROUTE_PATH.PROFILE_HISTORY,
    component: Profile,
    exact: false,
    footer: false,
    ignoreSession: false,
  },
];
