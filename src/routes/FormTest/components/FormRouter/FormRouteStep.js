import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';
import history from 'store/history';

class FormRouteStep extends Component {
  constructor(props) {
    super(props);

    const { step: STEP, steps } = props;

    const routes = [
      {
        path: '/',
        component: () => <Redirect to={`${STEP}/1`} />,
        exact: true,
      },
      ...steps[STEP],
    ];

    this.state = {
      routes,
    };
  }

  render() {
    const { match } = this.props;
    const { routes } = this.state;

    return (
      <React.Fragment>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={`${match.url}${route.path}`}
            exact={route.exact}
            render={props => (
              <React.Fragment>
                <route.component {...props} route={history} />
              </React.Fragment>
            )}
          />
        ))}
      </React.Fragment>
    );
  }
}
FormRouteStep.displayName = 'FormRouteStep';
FormRouteStep.propTypes = {
  match: PropTypes.object.isRequired,
};
export default FormRouteStep;
