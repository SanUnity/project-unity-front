import React from 'react';
import { shallow, mount } from 'enzyme';
import EN from 'i18n/EN';
import { Router } from 'react-router-dom';
import history from 'store/history';
import { Swipeable } from 'react-swipeable';
import MainPage from '../components';
import Nav from '../components/Nav';

let wrapper;

function createClientXY(x, y) {
  return { clientX: x, clientY: y };
}

function cte({ x = 0, y = 0, ...rest }) {
  return { touches: [createClientXY(x, y)], preventDefault: jest.fn(), ...rest };
}

function simulateSwipe(el) {
  el.simulate('touchStart',
    cte({ x: 100, y: 100, timeStamp: 8077.299999946263 }));
  el.simulate('touchMove', cte({ x: 125, y: 100, timeStamp: 8100.999999966007 }));
  el.simulate('touchMove', cte({ x: 150, y: 100, timeStamp: 8116.899999964517 }));
  el.simulate('touchMove', cte({ x: 175, y: 100, timeStamp: 8122.799999953713 }));
  el.simulate('touchMove', cte({ x: 200, y: 100, timeStamp: 8130.199999955433 }));
  el.simulate('touchEnd', cte({}));
}

jest.mock('..', () => <></>);
jest.mock('routes/Results', () => <></>);
jest.mock('../routes/TestPage', () => () => <div>test</div>);

const props = {
  user: {},
  match: {
    url: '/main',
    path: '/main',
  },
  literals: { ...EN.en.pcrResults, routes: EN.en.routes },
  literalsIntro: EN.en.welcome,
  showLoading: jest.fn(),
};

describe('MainPage', () => {
  beforeAll(() => {
    wrapper = shallow(<MainPage {...props} />);
  });

  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('handles swipe routing', () => {
    const wrappedInRouter = mount(<Router history={history}><MainPage {...props} /></Router>);

    history.push(`${props.match.url}/test`);

    wrappedInRouter.update();

    simulateSwipe(wrappedInRouter.find(Swipeable).find(Nav));

    wrappedInRouter.unmount();
  });
});
