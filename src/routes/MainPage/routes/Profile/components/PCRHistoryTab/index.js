import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sessionService } from 'redux-react-session';
import { API_URLS } from 'constants/apiConf';
import apiFetch from 'utils/apiFetch';
import PCRForm from 'routes/MainPage/routes/TestPage/components/Profiles/components/PCRForm';

import './styles.css';

class PCRHistoryTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemSelected: {},
      showModal: false,
    };
  }

  componentDidMount() {
    const { profile } = this.props;

    this.setState({
      arrayTests: profile.pcr || [],
      loaded: true,
    });
  }

  componentDidUpdate({ profile: prevProfile }) {
    const { profile } = this.props;

    if (JSON.stringify(profile) !== JSON.stringify(prevProfile)) {
      this.updateArrayTests();
    }
  }

  updateArrayTests = () => {
    const { profile } = this.props;

    this.setState({
      arrayTests: profile.pcr || [],
    });
  }

  getLiteralByResult = (result) => {
    const { literals: { pcrTest: literals } } = this.props;
    const option = literals.resultTest.options.find(o => parseInt(o.value, 10) === parseInt(result !== null ? result : 3, 10));

    return option ? option.title : '-';
  }

  showDetails = (itemSelected) => {
    this.setState({
      itemSelected,
      showModal: true,
    });
  }

  hideModal = () => {
    this.setState({
      itemSelected: {},
      showModal: false,
    });
  }

  handleSubmit = async (answers) => {
    const { showLoading, profile: { id: profileID } } = this.props;
    const user = await sessionService.loadUser();

    const {
      profiles,
    } = user;

    showLoading(true);

    // eslint-disable-next-line
    answers.resultTest = parseInt(answers.resultTest, 10);

    apiFetch({
      method: 'PUT',
      url: API_URLS.saveUserPCRTest(profileID),
      params: answers,
    }).then((testResult) => {
      sessionService.saveUser({
        ...user,
        profiles: profiles.map((profile) => {
          if (profile.id === profileID) {
            const pcr = profile.pcr.find(p => p.id === answers.id);

            if (pcr) {
              const index = profile.pcr.indexOf(pcr);
              const validations = {};

              validations.verifiedEmail = !testResult.haveVerifyEmail;
              validations.verifiedPhone = !testResult.haveVerifyPhone;

              const newPCR = {
                ...pcr,
                ...answers,
                ...testResult,
                timestamp: Math.floor(new Date().getTime() / 1000),
              };

              // eslint-disable-next-line
              profile.pcr[index] = newPCR;
            }
            return profile;
          }
          return profile;
        }),
      });

      this.setState({
        showModal: false,
      }, () => {
        showLoading(false);
      });
    }).catch((error) => {
      console.error(error);
      this.setState({
        showModal: false,
      }, () => {
        showLoading(false);
      });
    });
  }

  handleValidateField = (values) => {
    const { showLoading } = this.props;
    const { itemSelected: { id: pcrID, profileID } } = this.state;
    const params = {};

    if (values.emailValidate) {
      params.otpEmail = values.emailValidate;
    }

    if (values.phoneValidate) {
      params.otpPhone = values.phoneValidate;
    }

    showLoading(true);
    apiFetch({
      method: 'POST',
      url: API_URLS.validatePCRField(profileID, pcrID),
      params,
    }).then(async (validationResult) => {
      const user = await sessionService.loadUser();

      const {
        profiles,
      } = user;

      const { itemSelected } = this.state;

      let newItemSelected = itemSelected;

      sessionService.saveUser({
        ...user,
        profiles: profiles.map((profile) => {
          if (profile.id === profileID) {
            const pcr = profile.pcr.find(p => p.id === pcrID);

            if (pcr) {
              const validations = {};

              if (typeof validationResult.email !== 'undefined') {
                validations.verifiedEmail = validationResult.email;
              }

              if (typeof validationResult.phone !== 'undefined') {
                validations.verifiedPhone = validationResult.phone;
              }

              const index = profile.pcr.indexOf(pcr);
              const newPCR = {
                ...pcr,
                ...validations,
                timestamp: Math.floor(new Date().getTime() / 1000),
              };

              // eslint-disable-next-line
              profile.pcr[index] = newPCR;
              newItemSelected = newPCR;
            }
            return profile;
          }
          return profile;
        }),
      }).then(() => {
        this.setState({ itemSelected: newItemSelected });
      });

      showLoading(false);
    }).catch((error) => {
      console.error(error);
      showLoading(false);
    });
  }

  render() {
    const { literals, profile, onShowForm } = this.props;
    const {
      loaded, arrayTests, itemSelected, showModal,
    } = this.state;
    return loaded ? (
      <React.Fragment>
        <div className='pcr-test-history-wrapper row'>
          {arrayTests
            .sort((a, b) => ((a.dateTest < b.dateTest) ? 1 : -1))
            .map((test, index) => (
              <div key={index} className='col-12 history-item' onClick={() => this.showDetails(test)}>
                <div className='data-row'>
                  <span className={`status-indicator ${test.resultTest !== '-' ? `level-${test.resultTest}` : ''}`} />
                  <span className='date-formatted'>{test.dateTest}</span>
                  <p>{this.getLiteralByResult(test.resultTest)}</p>
                </div>
                <img
                  className=''
                  src='/assets/images/chevron-right.svg'
                  alt=''
                />
              </div>
            ))}
          {profile.pcr.length ? (
            <div
              className='qr-code-wrapper'
              onClick={() => onShowForm({
                ...profile.pcr[0],
                id: '',
                resultTest: '',
                dateTest: '',
                verified: false,
              })}
            >
              <img className='align-self-center qr-code-icon' src='/assets/images/qr_code.svg' alt='' />
            </div>
          ) : (
            <div className='qr-code-wrapper' onClick={() => onShowForm({ id: '', firstTest: true, profileID: profile.id })}>
              <img className='align-self-center qr-code-icon' src='/assets/images/qr_code.svg' alt='' />
            </div>
          )}
        </div>
        {showModal && (
          <div className='pcr-test-history-modal-wrapper'>
            <div className='overlay open' />
            <div className='search-sec-text'>
              <div className='hos-head-txt'>
                <h4>{literals.test2.newPCRTest}</h4>
                <p
                  onClick={this.hideModal}
                >
                  {literals.test2.close}
                </p>
              </div>
              <PCRForm
                fromHistory
                test={itemSelected}
                literals={literals}
                onSubmitForm={this.handleSubmit}
                onValidateField={this.handleValidateField}
              />
            </div>
          </div>
        )}
      </React.Fragment>
    ) : null;
  }
}
PCRHistoryTab.displayName = 'PCRHistoryTab';
PCRHistoryTab.propTypes = {
  literals: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  onShowForm: PropTypes.func.isRequired,
  showLoading: PropTypes.func.isRequired,
};
export default PCRHistoryTab;
