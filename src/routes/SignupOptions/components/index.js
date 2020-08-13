/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/UI/Button';
import { ROUTE_PATH } from 'routes';
import { Redirect } from 'react-router';
import UserSession from 'routes/App/userSession';
import history from 'store/history';
import Terms from 'routes/Signup/components/Terms';
import { ROUTE_PATH as NESTED_ROUTE_PATH } from '../../MainPage/routes';

class SignupOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
      sessionValid: false,
      showTerms: false,
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

  handleContinueAnonymous = async () => {
    const { onSignupAnonymous, showLoading } = this.props;
    const state = localStorage.getItem('CONF_MUNICIPALITY');

    try {
      showLoading(true);
      await onSignupAnonymous({
        state,
        phone: '',
      });
      setTimeout(() => {
        this.setState({
          sessionValid: true,
        }, () => {
          showLoading(false);
        });
      }, 1000);
    } catch (err) {
      showLoading(false);
    }
  }

  showTerms = () => {
    this.setState({
      showTerms: true,
    });
  }

  closeTerms = () => {
    this.setState({
      showTerms: false,
    });
  };

  render() {
    const { checkingSession, sessionValid, showTerms } = this.state;
    const { literals } = this.props;

    if (checkingSession) {
      return null;
    }

    if (sessionValid) {
      return (
        <Redirect to={`${ROUTE_PATH.MAIN_PAGE}${NESTED_ROUTE_PATH.TEST}`} />
      );
    }

    return (
      <React.Fragment>
        <section className='welcome add-bg signup-options'>
          <div className='back'>
            <img
              className='img'
              src='../../assets/images/wellcome-bg.png'
              alt=''
            />
          </div>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-12 welcome-text'>
                <div className='welcome-header'>
                  <img src='/assets/images/green-arrow.svg' onClick={() => history.goBack()} alt='' />
                  <h4>{literals.welcome.title}</h4>
                </div>
                <h2>{literals.welcome.help_big}</h2>
                <span>{literals.welcome.help_text}</span>
                <img
                  className='img-big'
                  src='/assets/images/undraw_data_xmfy.svg'
                  alt=''
                />

                <div className='btn-my-sec text-center'>
                  <Button label={literals.welcome.butonRegister} href='/signup' />

                  <a className='link-anonymous' onClick={this.showTerms}>{literals.welcome.enterAnonymously}</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {showTerms && (<Terms showAcceptTerms onClose={this.closeTerms} literals={literals.welcome} onContinue={this.handleContinueAnonymous} />)}
      </React.Fragment>
    );
  }
}
SignupOptions.displayName = 'SignupOptions';
SignupOptions.propTypes = {
  literals: PropTypes.object.isRequired,
  onSignupAnonymous: PropTypes.func.isRequired,
};
export default SignupOptions;
