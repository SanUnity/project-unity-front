import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';

const history = createBrowserHistory({
  basename: '/',
});

if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_GA !== '') {
  ReactGA.initialize(process.env.REACT_APP_GA);

  history.listen((location) => {
    try {
      // console.log('GA_PAGE_VIEW', location.pathname);
      ReactGA.pageview(location.pathname);
    } catch (err) {
      console.error('GA_ERROR', err);
    }
  });

  // workaround for initial visit
  if (window.performance && (performance.navigation.type === performance.navigation.TYPE_NAVIGATE)) {
    ReactGA.pageview('/');
  }
}


export default history;
