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

const rightSwipesMap = {
  '/main/centros-de-salud': '/main/news',
  '/main/news': '/main/faq',
  '/main/faq': '/main/bt-status',
  '/main/bt-status': '/main/test',
};


const leftSwipesMap = {
  '/main/test': '/main/bt-status',
  '/main/bt-status': '/main/faq',
  '/main/faq': '/main/news',
  '/main/news': '/main/centros-de-salud',
};
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

  /* istanbul ignore next */
  handleSwipeRight = () => {
    history.push(rightSwipesMap[history.location.pathname]);
  }

  /* istanbul ignore next */
  handleSwipeLeft = () => {
    history.push(leftSwipesMap[history.location.pathname]);
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
