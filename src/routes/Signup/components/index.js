import React, { Component } from 'react';
import Input from 'components/UI/Input';
import PropTypes from 'prop-types';
import history from 'store/history';
import Checkbox from 'components/UI/Checkbox';
import Button from 'components/UI/Button';
import { Redirect } from 'react-router';
import { ROUTE_PATH } from 'routes';
import Warning from 'routes/FormTest/icons/Warning';
import { getTimeLeft } from 'utils';
import Terms from './Terms';

/**
 * @name Signup
 *
 * @param {Object}    literals
 * @param {Object}    signupData
 * @param {func} onSignup
 *
 * @returns {JSX}
 */
class Signup extends Component {
  static propTypes = {
    literals: PropTypes.object.isRequired,
    signupData: PropTypes.object.isRequired,
    municipality: PropTypes.string.isRequired,
    onSignup: PropTypes.func.isRequired,
    showLoading: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      formValid: false,
      cbAgree: false,
      snackError: '',
      showTerms: false,
    };
  }

  componentDidUpdate({ signupData: { error: prevError } }) {
    const { signupData: { error } } = this.props;

    if (error && error !== prevError) {
      this.showSnackError(error);
    }
  }

  showSnackError = (error) => {
    const { literals } = this.props;
    let showError = '';

    if (error) {
      if (error.next) {
        showError = `${literals.maxRetriesExceeded} ${getTimeLeft(error.next)}`;
      } else {
        showError = literals.signupError;
      }

      this.setState({
        snackError: showError,
      }, () => {
        setTimeout(() => {
          this.setState({ snackError: '' });
        }, 5500);
      });
    }
  };

  /**
   * @name handleChange
   * Function to control inputs changes
   */
  handleChange = ({ target: { name, value } }) => {
    this.setState(
      {
        [name]: value,
      },
      this.validateForm,
    );
  };

  /**
   * @name handleCheckboxChange
   * Function to control inputs changes
   */
  handleCheckboxChange = ({ target: { checked } }) => {
    this.setState(
      {
        cbAgree: checked,
      },
      this.validateForm,
    );
  };

  /**
   * @name validateForm
   * Function to activate/deactivate signup button
   */
  validateForm = () => {
    const { phone, cbAgree } = this.state;
    return this.setState({
      formValid: phone.length === 10 && cbAgree,
    });
  };


  handleSubmit = async () => {
    const { phone, formValid } = this.state;
    const {
      municipality, onSignup, showLoading, literals,
    } = this.props;
    if (!formValid) {
      this.setState({
        snackError: literals.snackbar,
      }, () => {
        setTimeout(() => {
          this.setState({ snackError: '' });
        }, 4000);
      });
    } else {
      try {
        showLoading(true);
        await onSignup({ phone, municipality });
        showLoading(false);
      } catch (err) {
        showLoading(false);
      }
    }
  };

  showTerms = (event) => {
    event.preventDefault();
    event.stopPropagation();

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
    const { phone, snackError, showTerms } = this.state;
    const {
      literals,
      signupData: { phone: userPhone },
    } = this.props;
    if (userPhone && userPhone !== '') {
      return <Redirect to={ROUTE_PATH.CONFIRMATION} />;
    }
    return (
      <React.Fragment>
        {snackError !== '' && (
          <div id='snackbar' className='snackbar show'>
            <Warning />
            <div className='snackbar__text'>{snackError}</div>
          </div>
        )}
        <section className='login'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-12 wellcome'>
                <img src='/assets/images/green-arrow.svg' onClick={() => history.goBack()} alt='' />
                <h4>{literals.welcome}</h4>
              </div>
              <div className='col-12 login-text-image'>
                <div className='text-login'>
                  <h1>{literals.mainTitle}</h1>
                  <h4>{literals.mainSubtitle}</h4>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='login-head-inn'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-12'>
                <div className='pag-login'>
                  <h4>{literals.description}</h4>
                  <form noValidate autoComplete='off'>
                    <div className='form-group'>
                      <Input
                        name='phone'
                        label={literals.label}
                        type='number'
                        placeholder={literals.placeholder}
                        id='phone'
                        value={phone}
                        maxLength={10}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className='form-group form-check'>
                      <Checkbox
                        className='form-group'
                        LabelComponent={() => (
                          <label>
                            {`${literals.label2} `}
                            <span
                              className='terms-link'
                              onClick={this.showTerms}
                            >
                              {literals.label3}
                            </span>
                            {` ${literals.label4}`}
                          </label>
                        )}
                        name='remember'
                        onChange={this.handleCheckboxChange}
                      />
                    </div>
                    <div className='btn-mar-log text-center'>
                      <Button
                        label={literals.button}
                        onClick={this.handleSubmit}
                        disabled={false}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {showTerms && (<Terms onClose={this.closeTerms} />)}
      </React.Fragment>
    );
  }
}

export default Signup;
