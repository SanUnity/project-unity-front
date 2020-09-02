/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import history from 'store/history';
import EditProfile from 'components/EditProfile';
import WideToggle from 'components/UI/WideToggle';
import { sessionService } from 'redux-react-session';
import { API_URLS } from 'constants/apiConf';
import apiFetch from 'utils/apiFetch';
import PCRForm from 'routes/MainPage/routes/TestPage/components/Profiles/components/PCRForm';
import ExitRequestTab from './ExitRequestTab';
import HealthHistoryTab from './HealtHistoryTab';
import PCRHistoryTab from './PCRHistoryTab';

import './styles.css';

class Profile extends Component {
  static propTypes = {
    literals: PropTypes.object.isRequired,
    literalsResults: PropTypes.object.isRequired,
    literalsPCR: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    showLoading: PropTypes.func.isRequired,
    profiles: PropTypes.array.isRequired,
    phone: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    let currentActiveTabIndex = 1;

    switch (props.match.params.mode) {
      case 'pcr':
        currentActiveTabIndex = 2;
        break;
      case 'request':
        currentActiveTabIndex = 3;
        break;
      default:
        break;
    }

    this.state = {
      currentActiveTabIndex,
      loaded: false,
      profile: null,
      showEditProfile: false,
      showPCRTestForm: false,
    };
  }

  componentDidMount() {
    this.setProfile();
  }

  componentDidUpdate(prevProps) {
    const { profiles } = this.props;
    if (JSON.stringify(prevProps.profiles) !== JSON.stringify(profiles)) {
      this.setProfile();
    }
  }

  componentWillUnmount() {
    history.goForward();
  }

  setProfile = () => {
    const { profiles, match } = this.props;

    this.setState({
      profile: profiles.find(p => p.id === match.params.profileID),
      loaded: true,
    });
  };

  labelClicked = (index) => {
    this.setState({ currentActiveTabIndex: index });
  };

  setProfileHistory = (arrayHistory) => {
    const { profile } = this.state;

    profile.history = arrayHistory;

    this.setState({ profile });
  };

  showTabContent = () => {
    const {
      literals,
      literalsResults,
      literalsPCR,
      match,
      showLoading,
    } = this.props;
    const { currentActiveTabIndex, profile } = this.state;

    switch (currentActiveTabIndex) {
      case 3: {
        let firstRequest;
        if (match.params.requestID && profile.exitRequests) {
          firstRequest = profile.exitRequests.find(
            e => e.id === match.params.requestID,
          );
        } else if (profile.exitRequests && profile.exitRequests.length) {
          firstRequest = profile.exitRequests[0];
        } else {
          firstRequest = null;
        }
        return (
          <ExitRequestTab
            profile={profile}
            firstRequest={firstRequest}
            showNewExitRequest={match.params.requestID === '-1'}
            literals={literals}
            showLoading={showLoading}
          />
        );
      }
      case 1:
        return (
          <HealthHistoryTab
            profile={profile}
            literals={literalsResults}
            showLoading={showLoading}
            onFetchHistory={/* istanbul ignore next */data => this.setProfileHistory(data)}
            onShowForm={this.handleShowPCRForm}
            match={match}
          />
        );

      case 2:
        return (
          <PCRHistoryTab
            profile={profile}
            literals={literalsPCR}
            showLoading={showLoading}
            onShowForm={this.handleShowPCRForm}
          />
        );

      default:
        return null;
    }
  };

  handleShowPCRForm = (test) => {
    if (test.firstTest) {
      const { showLoading, phone } = this.props;
      const { profileID } = test;

      showLoading(true);

      apiFetch({
        method: 'GET',
        url: API_URLS.userProfileId(profileID),
      })
        .then((profile) => {
          test.name = profile.name;
          test.lastname = profile.lastname1;
          test.gender = profile.gender;
          test.phone = phone;

          this.setState(
            {
              showPCRTestForm: true,
              test,
            },
            () => {
              showLoading(false);
            },
          );
        })
        .catch((error) => {
          console.error(error);
          this.setState(
            {
              showPCRTestForm: true,
              test,
            },
            () => {
              showLoading(false);
            },
          );
        });
    } else {
      this.setState({
        showPCRTestForm: true,
        test,
      });
    }
  };

  handleSubmit = async (answers) => {
    const { showLoading } = this.props;
    const {
      test: { profileID },
    } = this.state;
    const user = await sessionService.loadUser();

    const { profiles } = user;

    showLoading(true);

    // eslint-disable-next-line
    answers.resultTest = parseInt(answers.resultTest, 10);

    apiFetch({
      method: 'POST',
      url: API_URLS.saveUserPCRTest(profileID),
      params: answers,
    })
      .then((testResult) => {
        const pcrTest = answers;
        pcrTest.id = testResult.id;
        pcrTest.profileID = profileID;
        pcrTest.verifiedEmail = !testResult.haveVerifyEmail;
        pcrTest.verifiedPhone = !testResult.haveVerifyPhone;
        pcrTest.verified = false;
        pcrTest.timestamp = Math.floor(new Date().getTime() / 1000);

        sessionService.saveUser({
          ...user,
          profiles: profiles.map((profile) => {
            if (profile.id === profileID) {
              return {
                ...profile,
                pcr: [
                  {
                    ...pcrTest,
                  },
                  ...profile.pcr,
                ],
              };
            }
            return profile;
          }),
        });

        if (!pcrTest.verifiedEmail || !pcrTest.verifiedPhone) {
          this.setState(
            {
              test: {
                ...pcrTest,
                onlyValidateFields: true,
              },
            },
            () => {
              showLoading(false);
            },
          );

          return;
        }

        this.setState(
          {
            showPCRTestForm: false,
            currentActiveTabIndex: 2,
          },
          () => {
            showLoading(false);
          },
        );
      })
      .catch((error) => {
        console.error(error);
        this.setState(
          {
            showPCRTestForm: false,
          },
          () => {
            showLoading(false);
          },
        );
      });
  };

  handleValidateField = (values) => {
    const { showLoading } = this.props;
    const {
      test: { id: pcrID, profileID },
    } = this.state;
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
    })
      .then(async (validationResult) => {
        const { test } = this.state;

        if (typeof validationResult.email !== 'undefined') {
          test.verifiedEmail = validationResult.email;
        }

        if (typeof validationResult.phone !== 'undefined') {
          test.verifiedPhone = validationResult.phone;
        }

        const user = await sessionService.loadUser();
        const { profiles } = user;

        sessionService.saveUser({
          ...user,
          profiles: profiles.map((profile) => {
            if (profile.id === profileID) {
              return {
                ...profile,
                pcr: profile.pcr.map((p) => {
                  if (p.id === test.id) {
                    return test;
                  }

                  return p;
                }),
              };
            }
            return profile;
          }),
        });

        if (!test.verifiedEmail || !test.verifiedPhone) {
          this.setState(
            {
              test: {
                ...test,
                onlyValidateFields: true,
                timestamp: Math.floor(new Date().getTime() / 1000),
              },
            },
            () => {
              showLoading(false);
            },
          );

          return;
        }

        this.setState(
          {
            showPCRTestForm: false,
          },
          () => {
            showLoading(false);
          },
        );
      })
      .catch((error) => {
        console.error(error);
        showLoading(false);
      });
  };

  render() {
    const {
      literals, literalsPCR, match, showLoading,
    } = this.props;
    const {
      currentActiveTabIndex,
      loaded,
      profile,
      showEditProfile,
      test,
      showPCRTestForm,
    } = this.state;
    if (showEditProfile) {
      return <EditProfile id={match.params.profileID} />;
    }
    if (loaded && profile) {
      return (
        <React.Fragment>
          <div className='profile-view'>
            <WideToggle
              title={profile.name}
              firstLabel={literals.tabLabelSecond}
              secondLabel={literals.tabLabelThird}
              thirdLabel={literals.tabLabelFirst}
              activeLabelIndex={currentActiveTabIndex}
              labelClicked={this.labelClicked}
              showArrowBack
              showProfile
              showTabs
              goBack={/* istanbul ignore next */() => history.push('/main/test')}
              goProfile={/* istanbul ignore next */() => this.setState({ showEditProfile: true })}
            />
            <section className='profile-a'>
              <div className='tab-content'>{this.showTabContent()}</div>
            </section>
          </div>
          {showPCRTestForm && (
            <React.Fragment>
              <div className='overlay open' />
              <div className='search-sec-text pcrtest-moda-wrapper'>
                <div className='pcrtest-modal-header'>
                  <img
                    src='/assets/images/green-arrow.svg'
                    onClick={() => this.setState({ showPCRTestForm: false })}
                    alt=''
                  />
                  <span>{literalsPCR.test2.newPCRTest}</span>
                </div>
                <div className='pcrtest-form-wrapper'>
                  <PCRForm
                    test={test}
                    literals={literalsPCR}
                    onSubmitForm={this.handleSubmit}
                    onCancel={/* istanbul ignore next */() => this.setState({ showPCRTestForm: false })}
                    onValidateField={this.handleValidateField}
                    showLoading={showLoading}
                  />
                </div>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      );
    }
    return <React.Fragment />;
  }
}
export default Profile;
