import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';
import { Swipeable } from 'react-swipeable';
import history from 'store/history';
import Nav from './Nav';
import { routes } from '../routes';
// import { ContagiosIFrame } from './ContagiosIFrame';
import SelectStateModal from './SelectStateModal';
import ShareResults from './ShareResults';

/**
 * @name MainPage
 *
 * @param {Object}   literals
 *
 * @returns {JSX}
 */
class MainPage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    literals: PropTypes.object.isRequired,
    literalsIntro: PropTypes.object.isRequired,
    showLoading: PropTypes.func.isRequired,
  };

  handleSwipeRight = () => {
    switch (history.location.pathname) {
      case '/main/centros-de-salud':
        history.push('/main/news');
        break;
      case '/main/news':
        history.push('/main/faq');
        break;
      case '/main/faq':
        history.push('/main/bt-status');
        break;
      case '/main/bt-status':
        history.push('/main/test');
        break;
      default:
        break;
    }
  }

  handleSwipeLeft = () => {
    switch (history.location.pathname) {
      case '/main/test':
        history.push('/main/bt-status');
        break;
      case '/main/bt-status':
        history.push('/main/faq');
        break;
      case '/main/faq':
        history.push('/main/news');
        break;
      case '/main/news':
        history.push('/main/centros-de-salud');
        break;
      default:
        break;
    }
  }

  render() {
    const {
      match, user, literals, literalsIntro, showLoading,
    } = this.props;

    return (
      <React.Fragment>

        <div id='overlay' className='overlay' />
        <div>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={`${match.url}${route.path}`}
                exact={route.exact}
                render={props => (
                  <React.Fragment>
                    <div className={`MainPage ${route.footer ? 'has-footer' : ''}`}>
                      <route.component route={history} {...props} />
                    </div>
                    {(route.footer) && (
                      <Swipeable onSwipedLeft={this.handleSwipeLeft} onSwipedRight={this.handleSwipeRight} preventDefaultTouchmoveEvent>
                        <Nav routes={routes} match={match} user={user} literals={literals.routes} />
                      </Swipeable>
                    )}
                  </React.Fragment>
                )}
              />
            ))}
          </Switch>
          <SelectStateModal
            user={user}
            literals={literalsIntro}
            showLoading={showLoading}
          />
          <ShareResults
            user={user}
            literals={literals}
            showLoading={showLoading}
          />
        </div>

      </React.Fragment>
    );
  }
}

export default MainPage;
