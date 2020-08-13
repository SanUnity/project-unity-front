import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/**
 * @name Nav
 * Navigation component that containts available route tabs.
 * @param {Array} routes
 * @param {Object} match
 */

class Nav extends Component {
  static propTypes = {
    routes: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
    literals: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  render() {
    const {
      routes, match, user: { profiles, bt_active: btActive }, literals,
    } = this.props;

    let routesWithTite = routes.filter(route => Boolean(route.title));

    routesWithTite = routesWithTite.map(r => ({
      ...r,
      path: r.path.split('/:')[0],
    }));

    if (!btActive) {
      routesWithTite = routesWithTite.filter(r => r.id !== 6);
    }

    const flagMultiProfile = (profiles && profiles.length > 1);
    return (
      <nav className='main-navigation'>
        <ul>
          {routesWithTite.map(route => (
            <li key={route.title}>
              <NavLink
                to={`${match.path}${route.path}`}
                className='route'
                activeClassName='route--active'
              >
                <div className='route__icon--wrapper'>
                  <span className='route--icon'>
                    <route.icon />
                  </span>
                </div>
                <span className='route__title'>{(flagMultiProfile && typeof route.title2 !== 'undefined') ? literals[route.title2] : literals[route.title]}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Nav;
