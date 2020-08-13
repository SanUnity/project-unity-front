import React, { Component } from 'react';
import PropTypes from 'prop-types';
import history from 'store/history';
import { Route, Redirect } from 'react-router';
import FormStep from '../FormStep';
import FormRouteStep from './FormRouteStep';

class FormRouter extends Component {
  constructor(props) {
    super(props);

    const routes = [
      {
        path: '/',
        component: () => <Redirect to='/form-test/1' />,
        exact: true,
      },
    ];

    const { formTestConf } = this.props;

    formTestConf.forEach((data, index) => {
      if (data.length > 1) {
        routes.push({
          path: `/${index}`,
          step: index,
          exact: false,
          header: false,
        });
      }
    });

    const steps = formTestConf.reduce((acc, subSteps) => {
      const arraySubRoutes = [];

      subSteps.forEach((step, i) => {
        if (Object.keys(step).length) {
          arraySubRoutes.push({
            path: `/${i}`,
            component: FormStep,
            exact: true,
            header: false,
          });
        }
      });

      acc.push(arraySubRoutes);

      return acc;
    }, []);

    this.state = {
      routes,
      steps,
    };
  }

  render() {
    const { match } = this.props;
    const { routes, steps } = this.state;

    return (
      routes.map((route, index) => (
        <Route
          key={index}
          path={`${match.url}${route.path}`}
          exact={route.exact}
          render={props => (
            <React.Fragment>
              {typeof route.component !== 'undefined' ? (
                <route.component {...props} route={history} />
              ) : (
                <FormRouteStep {...props} step={route.step} steps={steps} route={history} />
              )}
            </React.Fragment>
          )}
        />
      ))
    );
  }
}
FormRouter.displayName = 'FormRouter';
FormRouter.propTypes = {
  match: PropTypes.object.isRequired,
  formTestConf: PropTypes.array.isRequired,
};

export default FormRouter;
