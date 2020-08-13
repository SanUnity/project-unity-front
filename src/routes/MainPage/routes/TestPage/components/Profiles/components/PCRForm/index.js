import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/es';
import Input from 'components/UI/Input';
import Checkbox from 'components/UI/Checkbox';
import SelectInput from 'components/SelectInput';
import { API_URLS } from 'constants/apiConf';
import apiFetch from 'utils/apiFetch';
import ModalConfirm from 'components/ModalConfirm';
import QRScanner from './QRScanner';

const questions = [
  'name',
  'lastname',
  'phone',
  'email',
  'gender',
  'birthday',
  'dateTest',
  // 'resultTest',
];

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
const yyyy = today.getFullYear();

dd = (dd < 10) ? `0${dd}` : dd;
mm = (mm < 10) ? `0${mm}` : mm;

today = `${yyyy}-${mm}-${dd}`;

class PCRForm extends Component {
  constructor(props) {
    super(props);

    const { test } = props;
    const answers = {};

    let verifiedEmail = false;
    let verifiedPhone = false;
    let isNew = true;

    questions.forEach((question) => {
      if (typeof test[question] !== 'undefined') {
        answers[question] = test[question];
      }
    });

    if (test.id) {
      answers.id = test.id;
      isNew = false;
      verifiedEmail = test.verifiedEmail;
      verifiedPhone = test.verifiedPhone;
    } else {
      // eslint-disable-next-line
      const date = new moment();
      answers.dateTest = date.format('YYYY-MM-DD');
      answers.resultTest = 3;
    }

    if (typeof test.resultTest !== 'undefined' && test.resultTest) {
      answers.resultTest = test.resultTest.toString();
    }

    let showQRScanner = false;

    if (typeof test.id === 'undefined' || !test.id) {
      if (!window.onMobileDevice()) {
        showQRScanner = true;
      }
    }

    this.interval = null;
    this.state = {
      answers,
      showQRScanner,
      isNew,
      verifiedEmail,
      verifiedPhone,
      inAppNotifications: !isNew,
      errors: [],
      isValid: false,
      showQRError: false,
      retryQRRead: 0,
    };
  }

  componentDidMount() {
    this.readQRFromLS();
    this.checkForm();
  }

  componentDidUpdate({ test: prevTest }) {
    const { test } = this.props;

    if (JSON.stringify(test) !== JSON.stringify(prevTest)) {
      this.checkVerificationFields();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  readQRFromLS = () => {
    const { answers } = this.state;
    const { showLoading } = this.props;

    if (window.onMobileDevice() && (typeof answers.id === 'undefined' || !answers.id)) {
      window.readNativeQR();
      showLoading(true);
      this.interval = setInterval(this.getQRStringFromLocalStorage, 1000);
    }
  }

  checkVerificationFields = () => {
    const { test } = this.props;

    this.setState({
      isNew: test.id === '',
      onlyValidateFields: test.onlyValidateFields,
      verifiedEmail: test.verifiedEmail,
      verifiedPhone: test.verifiedPhone,
    });
  }

  getQRStringFromLocalStorage = () => {
    const { showLoading } = this.props;
    const localQRString = localStorage.getItem('QRString');

    if (localQRString !== null && localQRString) {
      showLoading(false);
      this.handleQRData(localQRString);
      clearInterval(this.interval);
      localStorage.removeItem('QRString');
    }

    const localQRCanceled = localStorage.getItem('QRCanceled');

    if (localQRCanceled !== null) {
      const { onCancel } = this.props;

      clearInterval(this.interval);
      localStorage.removeItem('QRCanceled');
      showLoading(false);
      onCancel();
    }
  }

  getValue = (name) => {
    const { answers } = this.state;

    if (answers && answers[name]) return answers[name];
    return '';
  }

  hasError = (name) => {
    const { errors } = this.state;
    const res = errors.find(x => x === name);
    if (res) return 'error';
    return '';
  }

  handleChange = (name, value) => {
    const { answers } = this.state;

    this.setState({
      answers: {
        ...answers,
        [name]: value,
      },
      errors: [],
    }, this.checkForm);
  }

  emailIsValid = (email) => {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  checkForm = () => {
    const { answers, inAppNotifications } = this.state;
    let isValid = true;

    questions.forEach((question) => {
      if (question === 'email') {
        if (typeof answers[question] !== 'undefined' && answers[question] && !this.emailIsValid(answers.email)) {
          isValid = false;
        }
      } else if (typeof answers[question] === 'undefined' || !answers[question]) {
        isValid = false;
      }
    });

    isValid = isValid && inAppNotifications;

    this.setState({ isValid });
  }

  showErrors = () => {
    const { answers } = this.state;
    const errors = [];

    questions.forEach((question) => {
      if (question === 'email') {
        if (typeof answers[question] !== 'undefined' && answers[question] && !this.emailIsValid(answers.email)) {
          errors.push(question);
        }
      } else if (typeof answers[question] === 'undefined' || !answers[question]) {
        errors.push(question);
      }
    });

    this.setState({ errors });
  }

  handleSendForm = () => {
    const { onSubmitForm } = this.props;
    const { answers, isValid } = this.state;

    if (!isValid) {
      this.showErrors();
      return;
    }

    onSubmitForm(answers);
  }

  handleQRData = (centerId) => {
    const { showLoading } = this.props;
    const { answers } = this.state;

    showLoading(true);

    apiFetch({
      method: 'GET',
      url: API_URLS.validateCenterId(centerId),
    }).then(({ valid }) => {
      showLoading(false);

      if (valid) {
        this.setState({
          answers: {
            ...answers,
            centerId,
          },
          showQRScanner: false,
        });
      } else {
        this.setState({
          showQRError: true,
        });
      }
    }).catch((error) => {
      showLoading(false);
      this.setState({
        showQRError: true,
      });
      console.error(error);
    });
  }

  isFieldValid = (field) => {
    const { [field]: validationField } = this.state;

    if (validationField && validationField.length === 6) {
      return true;
    }

    return false;
  }

  getValidationValue = (name) => {
    const { [name]: value } = this.state;

    if (value) return value;
    return '';
  }

  handleChangeValidationField = (name, value) => {
    this.setState({
      [name]: value,
    });
  }

  handleValidateField = (name) => {
    const { onValidateField } = this.props;
    const { [name]: value } = this.state;

    onValidateField({
      [name]: value,
    });
  }

  handleQRCancel = () => {
    const { onCancel } = this.props;

    this.setState({
      showQRError: false,
    }, () => {
      onCancel();
    });
  }

  handleQRRetry = () => {
    this.setState({
      showQRError: false,
      retryQRRead: Math.round(Math.random() * 1000000000000),
    }, () => {
      this.readQRFromLS();
    });
  }

  handleCheckboxChange = ({ target: { checked } }) => {
    this.setState({
      inAppNotifications: checked,
    }, this.checkForm);
  };

  render() {
    const { test, literals: { pcrTest: formQuestions }, onCancel } = this.props;
    const {
      isValid,
      showQRScanner,
      isNew,
      verifiedEmail,
      verifiedPhone,
      showQRError,
      retryQRRead,
      onlyValidateFields,
      inAppNotifications,
    } = this.state;

    const questionsList = onlyValidateFields ? ['phone', 'email'] : questions;

    return showQRScanner ? (
      <div className='pcr-form-wrapper qr-scanner-active'>
        <QRScanner
          literals={formQuestions}
          retry={retryQRRead}
          onQRReaded={this.handleQRData}
        />
        {showQRError && (
          <ModalConfirm
            title={formQuestions.qrCodeErrorTitle}
            cancelText={formQuestions.qrCodeErrorCancel}
            cancel={this.handleQRCancel}
            confirmText={formQuestions.qrCodeErrorRetry}
            confirm={this.handleQRRetry}
          />
        )}
      </div>
    ) : (
      <React.Fragment>
        <div className={`pcr-form-wrapper form-input-fields-container ${test.verified ? 'is-verified' : ''}`}>
          {onlyValidateFields ? (
            <h1 className='title-verify'>{formQuestions.mustValidateFields}</h1>
          ) : (
            <h1 className='title-verify text-center'>{formQuestions.formTitle}</h1>
          )}

          <form noValidate autoComplete='off'>
            {questionsList.map((question) => {
              if (formQuestions[question].type === 'select') {
                return (
                  <div className='form-group' key={question}>
                    <SelectInput
                      name={question}
                      type='string'
                      label={formQuestions[question].label}
                      placeholder={formQuestions[question].placeholder}
                      value={this.getValue(question)}
                      onChange={e => this.handleChange(question, e.target.value)}
                      error={this.hasError(question)}
                      options={formQuestions[question].options}
                      disabled={test.verified}
                      required
                    />
                    {formQuestions[question].subLabel && (
                      <span className='form-field-sub-label'>
                        {formQuestions[question].subLabel}
                      </span>
                    )}
                  </div>
                );
              }

              if (question === 'phone') {
                return (
                  <div className='form-group' key={question}>
                    <Input
                      name={question}
                      label={formQuestions[question].label}
                      type={formQuestions[question].type}
                      placeholder={formQuestions[question].placeholder}
                      value={this.getValue(question)}
                      onChange={e => this.handleChange(question, e.target.value)}
                      error={this.hasError(question)}
                      {...formQuestions[question].validations}
                    />
                    {(!isNew && !verifiedPhone && !test.verified) && (
                      <div className='validation-wrapper'>
                        <Input
                          name='phoneValidate'
                          label={formQuestions.phoneValidate.label}
                          type={formQuestions.phoneValidate.type}
                          placeholder={formQuestions.phoneValidate.placeholder}
                          value={this.getValidationValue('phoneValidate')}
                          onChange={e => this.handleChangeValidationField('phoneValidate', e.target.value)}
                          {...formQuestions.phoneValidate.validations}
                        />
                        <button type='button' className={!this.isFieldValid('phoneValidate') ? 'disabled' : ''} onClick={() => this.handleValidateField('phoneValidate')}>
                          {formQuestions.validate}
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              if (question === 'email') {
                return (
                  <div className='form-group' key={question}>
                    <Input
                      name={question}
                      label={formQuestions[question].label}
                      type={formQuestions[question].type}
                      placeholder={formQuestions[question].placeholder}
                      value={this.getValue(question)}
                      onChange={e => this.handleChange(question, e.target.value)}
                      error={this.hasError(question)}
                      {...formQuestions[question].validations}
                    />
                    {(!isNew && !verifiedEmail && !test.verified) && (
                      <div className='validation-wrapper'>
                        <Input
                          name='emailValidate'
                          label={formQuestions.emailValidate.label}
                          type={formQuestions.emailValidate.type}
                          placeholder={formQuestions.emailValidate.placeholder}
                          value={this.getValidationValue('emailValidate')}
                          onChange={e => this.handleChangeValidationField('emailValidate', e.target.value)}
                          {...formQuestions.emailValidate.validations}
                        />
                        <button type='button' className={!this.isFieldValid('emailValidate') ? 'disabled' : ''} onClick={() => this.handleValidateField('emailValidate')}>
                          {formQuestions.validate}
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <div className='form-group' key={question}>
                  <Input
                    name={question}
                    label={formQuestions[question].label}
                    type={formQuestions[question].type}
                    placeholder={formQuestions[question].placeholder}
                    value={this.getValue(question)}
                    onChange={e => this.handleChange(question, e.target.value)}
                    error={this.hasError(question)}
                    max={today}
                    {...formQuestions[question].validations}
                  />
                </div>
              );
            })}
            <div className='button-wrapper'>
              {(!test.verified) && (
                !onlyValidateFields ? (
                  <React.Fragment>
                    <Checkbox
                      className='form-group'
                      label={formQuestions.acceptResultsInApp}
                      value={inAppNotifications}
                      onChange={this.handleCheckboxChange}
                    />
                    <button type='button' className={!isValid ? 'disabled' : ''} onClick={this.handleSendForm}>
                      {formQuestions.send}
                    </button>
                  </React.Fragment>
                ) : (
                  <p className='btn-only-verify' onClick={onCancel}>{formQuestions.verifyLater}</p>
                )
              )}
            </div>
          </form>
        </div>
        {showQRError && (
          <ModalConfirm
            title={formQuestions.qrCodeErrorTitle}
            cancelText={formQuestions.qrCodeErrorCancel}
            cancel={this.handleQRCancel}
            confirmText={formQuestions.qrCodeErrorRetry}
            confirm={this.handleQRRetry}
          />
        )}
      </React.Fragment>
    );
  }
}
PCRForm.displayName = 'PCRForm';
PCRForm.propTypes = {
  test: PropTypes.object.isRequired,
  literals: PropTypes.object.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  onValidateField: PropTypes.func,
  onCancel: PropTypes.func,
};
PCRForm.defaultProps = {
  onCancel: () => {},
  onValidateField: () => {},
};
export default PCRForm;
