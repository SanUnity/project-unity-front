import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from 'store/history';
import Loading from 'components/Loading';
import ErrorBoundary from 'components/ErrorBoundary';
import { routes, ROUTE_PATH } from 'routes';

import 'components/Loading/styles.scss';
import 'components/SelectInput/styles.scss';
import 'components/Toggle/styles.scss';
import 'components/LanguageSelector/components/styles.scss';
import 'components/UI/Button/styles.scss';
import 'components/UI/ComponentHeader/styles.scss';
import 'components/UI/Footer/styles.scss';
import 'components/UI/ListItem/styles.scss';
import 'components/UI/Modal/styles.scss';
import 'components/UI/SearchBar/styles.scss';
import 'components/UI/WideToggle/styles.scss';
import 'components/UI/Input/styles.scss';
import 'components/UI/SiNo/styles.scss';
import 'routes/FormTest/components/FormStepper/styles.scss';
import 'routes/Confirmation/components/styles.scss';
import 'routes/FormTest/components/styles.scss';
import 'routes/FormTest/components/ToggleQuestion/styles.scss';
import 'routes/MainPage/components/styles.scss';
import 'routes/MainPage/components/Nav/styles.scss';
import 'routes/MainPage/routes/ContagionMap/components/styles.scss';
import 'routes/MainPage/routes/ContagionMap/components/Map/styles.scss';
import 'routes/MainPage/routes/Faq/components/styles.scss';
import 'routes/MainPage/routes/TestingCenters/components/styles.scss';
import 'routes/MainPage/routes/TestingCenters/components/List/styles.scss';
import 'routes/MainPage/routes/TestingCenters/components/Map/styles.scss';
import 'routes/MainPage/routes/TestPage/components/styles.scss';
import 'routes/NotFound/styles.scss';
import 'routes/Results/components/styles.scss';
import 'routes/Results/components/Content/styles.scss';
import 'routes/Signup/components/styles.scss';
import 'routes/Intro/components/styles.scss';

class App extends Component {
  static propTypes = {
    sessionChecked: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  /* componentDidMount() {
    window.addEventListener('storage', (e) => {
      console.log(' *** STORAGE CHANGED ***');
      console.log(e);
      console.log(localStorage.getItem('BTStatus'));
    });
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.closeModalWrapper);
  } */

  renderRoute(route) {
    const { isAuthenticated } = this.props;

    if (isAuthenticated && route.redirectIfAuth) {
      return (
        <Redirect
          to={{
            pathname: ROUTE_PATH.MAIN_PAGE,
            state: { from: window.location.pathname },
          }}
        />
      );
    }

    if (route.ignoreSession || isAuthenticated) {
      return <route.component route={history} />;
    }

    return (
      <Redirect
        to={{
          pathname: ROUTE_PATH.SIGNUP,
          state: { from: window.location.pathname },
        }}
      />
    );
  }

  render() {
    const { sessionChecked, loading } = this.props;

    return (
      <React.Fragment>
        <Loading hide={!loading} />

        <ConnectedRouter history={history}>
          <Switch>
            {sessionChecked
              && routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  render={() => (<ErrorBoundary>{this.renderRoute(route)}</ErrorBoundary>)}
                />
              ))}
          </Switch>
        </ConnectedRouter>
      </React.Fragment>
    );
  }
}

export default App;
