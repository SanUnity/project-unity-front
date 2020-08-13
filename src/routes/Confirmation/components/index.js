import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { ROUTE_PATH } from 'routes';
import Button from 'components/UI/Button';
import { getTimeLeft } from 'utils';
import { ROUTE_PATH as NESTED_ROUTE_PATH } from '../../MainPage/routes';

const inputNumberNames = [
  'codeBox1',
  'codeBox2',
  'codeBox3',
  'codeBox4',
  'codeBox5',
  'codeBox6',
];

/**
 * @name Confirmation
 * Main component to log in a user on the platform
 *
 * @returns {JSX}
 */
class Confirmation extends Component {
  static propTypes = {
    signupData: PropTypes.object.isRequired,
    validationData: PropTypes.object.isRequired,
    literals: PropTypes.object.isRequired,
    showLoading: PropTypes.func.isRequired,
    initSignup: PropTypes.func.isRequired,
    onValidate: PropTypes.func.isRequired,
    onSignupAnonymous: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      numbers: Array.from({ length: 6 }).map(() => ''),
      validating: true,
      start: new Date().getTime(),
      again: false,
      formValid: false,
    };

    this.interval = setInterval(this.checkTime, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.focusTimeout);
    clearInterval(this.interval);
  }

  checkTime = () => {
    const { start } = this.state;
    const now = new Date().getTime();
    const compare = start + (1000 * 60 * 5); // 5min

    if (now > compare) {
      this.setState({
        again: true,
      });
      clearInterval(this.interval);
    }
  }

  prefillOTP = () => {
    const {
      signupData: { otp },
    } = this.props;
    if (otp) {
      const numbers = `${otp}`.split('');
      this.setState(
        {
          numbers,
        },
        () => {
          this.validateForm();
        },
      );
    }
  };

  focusInput = (index) => {
    const inputs = document.querySelectorAll('.pa_g-login input');
    const inputToFocus = inputs[index];
    if (inputToFocus) {
      inputToFocus.focus();
    }
  };

  handleKeyDown = (event, index) => {
    if (event.key === 'Backspace') {
      this.focusTimeout = setTimeout(() => this.focusInput(index - 1), 0);
    }
  };

  handleOnPaste = (event, index) => {
    // Stop data actually being pasted into div
    event.stopPropagation();
    event.preventDefault();

    if (index > 0) return;

    // Get pasted data via clipboard API
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('Text');

    if (pastedData && parseInt(pastedData, 10)) {
      const numbers = pastedData.split('').slice(0, 6);

      if (numbers.length < 6) {
        for (let i = numbers.length; i < 6; i += 1) {
          numbers[i] = '';
        }
      }

      this.setState(
        {
          numbers,
        },
        () => {
          this.validateForm();
        },
      );
    }
  };

  handleOnChange = (event, index) => {
    const {
      target: {
        value,
        value: { length },
      },
    } = event;

    if (length === 6) {
      const numbers = value.split('');
      this.setState(
        {
          numbers,
          error: false,
        },
        () => {
          this.validateForm();
        },
      );
    } else {
      this.setState(
        ({ numbers }) => {
          if (value) this.focusInput(index + 1);
          return {
            numbers: numbers.map((num, ind) => (ind === index ? value.slice(length - 1, length) : num)),
            error: false,
          };
        },
        () => {
          this.validateForm();
        },
      );
    }
  };

  validateForm = () => {
    const { numbers } = this.state;
    let formValid = true;
    numbers.forEach((num) => {
      if (num.length !== 1) {
        formValid = false;
      }
    });
    return this.setState({
      formValid: formValid && numbers.length <= 6,
    });
  };

  handleSubmit = async () => {
    const { onValidate, signupData, showLoading } = this.props;
    const { numbers } = this.state;
    const otp = numbers.join('');
    if (otp.length < 6) {
      return;
    }

    const state = localStorage.getItem('CONF_MUNICIPALITY');

    try {
      showLoading(true);
      await onValidate({
        phone: signupData.phone,
        otp,
        state,
      });
      showLoading(false);
      this.setState({
        validating: false,
      });
    } catch (err) {
      this.setState({ error: true });
      showLoading(false);
    }
  };

  handleSubmitAnonymous = async () => {
    const { onSignupAnonymous, signupData, showLoading } = this.props;

    try {
      showLoading(true);
      await onSignupAnonymous({
        phone: signupData.phone,
      });
      showLoading(false);
      this.setState({
        validating: false,
      });
    } catch (err) {
      this.setState({ error: true });
      showLoading(false);
    }
  }

  render() {
    const {
      formValid, validating, numbers, error, again,
    } = this.state;
    const {
      validationData: { success, error: backError },
      signupData: { phone },
      literals,
      initSignup,
    } = this.props;

    if (!phone) {
      return <Redirect to={`${ROUTE_PATH.SIGNUP}`} />;
    }

    if (!validating && success !== '') {
      return (
        <Redirect to={`${ROUTE_PATH.MAIN_PAGE}${NESTED_ROUTE_PATH.TEST}`} />
      );
    }

    let showError = '';

    if (backError) {
      if (backError.next) {
        showError = `${literals.maxRetriesExceeded} ${getTimeLeft(backError.next)}`;
      } else {
        showError = literals.codeError;
      }
    }

    return (
      <React.Fragment>
        <section className={`login-img ${error ? 'error' : ''}`}>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-12 welcome img-te_xt-login'>
                <img src='/assets/images/green-arrow.svg' onClick={initSignup} alt='' />
                <h4>{literals.welcome}</h4>
              </div>
              {/* <div className='col-12'>
                <div className='img-te_xt-login'>
                  <h1>{literals.mainTitle}</h1>
                  <h4>{literals.mainSubtitle}</h4>
                </div>
              </div> */}
            </div>
          </div>
          <span className='error'>
            <img src='/assets/images/alert.svg' alt='' />
            {showError}
          </span>
        </section>

        <section className='login-head-inn confirmation'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-12'>
                <div className='pa_g-login'>
                  <p className='lo-de'>{literals.description}</p>
                  <form className={`pas-in ${error ? 'error' : ''}`}>
                    {inputNumberNames.map((name, index) => (
                      <input
                        key={index}
                        autoComplete={index === 0 ? 'one-time-code' : ''}
                        id={name}
                        name={name}
                        type='number'
                        value={numbers[index]}
                        onChange={event => this.handleOnChange(event, index)}
                        onPaste={event => this.handleOnPaste(event, index)}
                        min={0}
                        max={9}
                        onKeyDown={event => this.handleKeyDown(event, index)}
                      />
                    ))}
                  </form>
                  <p className='l_l'>{literals.hint}</p>
                  {again && (
                    <div className='ask-again-wrapper'>
                      <p onClick={initSignup} className='ask-again'>{literals.askAgain}</p>
                      <Button
                        onClick={this.handleSubmitAnonymous}
                        label={literals.enterAsAnonymous}
                      />
                    </div>
                  )}
                  <div className='btn-mar-log text-center'>
                    <Button
                      onClick={this.handleSubmit}
                      label={literals.button}
                      disabled={!formValid}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Confirmation;
