import React, { Component } from 'react';
import { ROUTE_PATH } from 'routes';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import UserSession from 'routes/App/userSession';
import { ROUTE_PATH as NESTED_ROUTE_PATH } from '../../MainPage/routes';
// import SplashScreen from './SplashScreen';
import WelcomePage from './WelcomePage';

/**
 * @name Intro
 *
 * @param {Object} literals
 *
 * @returns {JSX}
 */

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
      sessionValid: false,
    };
  }

  componentDidMount = async () => {
    const { showLoading } = this.props;
    try {
      showLoading(true);
      await UserSession.checkSession();
      this.setState({
        checkingSession: false,
        sessionValid: true,
      }, () => {
        showLoading(false);
      });
    } catch (err) {
      this.setState({
        checkingSession: false,
        sessionValid: false,
      }, () => {
        showLoading(false);
      });
    }
  };

  render() {
    const { checkingSession, sessionValid } = this.state;
    const { literals, setMunicipalityConfiguration } = this.props;
    if (checkingSession) {
      return null;
    }
    if (sessionValid) {
      return (
        <Redirect to={`${ROUTE_PATH.MAIN_PAGE}${NESTED_ROUTE_PATH.TEST}`} />
      );
    }

    return <WelcomePage literals={literals} setMunicipalityConfiguration={setMunicipalityConfiguration} />;
  }
}

Intro.propTypes = {
  literals: PropTypes.object.isRequired,
  showLoading: PropTypes.func.isRequired,
  setMunicipalityConfiguration: PropTypes.func.isRequired,
};

export default Intro;
