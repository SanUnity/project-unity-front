/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Button from 'components/UI/Button';
import history from 'store/history';
import Warning from 'routes/FormTest/icons/Warning';
import { sessionService } from 'redux-react-session';
import { API_URLS } from 'constants/apiConf';
import apiFetch from 'utils/apiFetch';
import Profile from './Profile';
// import Request from './Request';
import PCRTests from './PCRTests';
import PCRForm from './PCRForm';
import BTStatusCard from './BTStatusCard';


const sliderSettings = {
  dots: false,
  infinite: false,
  slidesToShow: 1.1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.1,
        slidesToScroll: 1,
      },
    },
  ],
};


class Profiles extends Component {
  constructor(props) {
    super(props);
    const { profiles } = props;

    this.state = {
      profiles: this.parseProfiles(profiles),
      showSnack: '',
      showPCRTestForm: false,
      test: {},
    };
  }

  componentDidUpdate({ profiles: prevProfiles }) {
    const { profiles } = this.props;

    if (JSON.stringify(profiles) !== JSON.stringify(prevProfiles)) {
      this.updateProfiles();
    }
  }

  parseProfiles = (profiles) => {
    profiles.forEach((p) => {
      if (typeof p.pcr === 'undefined') {
        p.pcr = [];
      }

      if (typeof p.exitRequests === 'undefined') {
        p.exitRequests = [];
      } else {
        p.exitRequests = p.exitRequests.sort((a, b) => (a.expiry < b.expiry ? 1 : -1));
      }
    });

    return profiles;
  }

  updateProfiles = () => {
    const { profiles } = this.props;

    this.setState({
      profiles: this.parseProfiles(profiles),
    });
  }

  showSnackBar = (message) => {
    this.setState({
      showSnack: message,
    }, () => {
      setTimeout(() => {
        this.setState({ showSnack: '' });
      }, 4000);
    });
  }

  goToTest = () => {
    localStorage.setItem('testDetails', JSON.stringify({}));
    history.push('/form-test');
  };

  handleShowPCRForm = (test) => {
    if (test.firstTest) {
      const { showLoading, phone } = this.props;
      const { profileID } = test;

      showLoading(true);

      apiFetch({
        method: 'GET',
        url: API_URLS.userProfileId(profileID),
      }).then((profile) => {
        test.name = profile.name;
        test.lastname = profile.lastname1;
        test.gender = profile.gender;
        test.phone = phone;

        this.setState({
          showPCRTestForm: true,
          test,
        }, () => {
          showLoading(false);
        });
      }).catch((error) => {
        console.error(error);
        this.setState({
          showPCRTestForm: true,
          test,
        }, () => {
          showLoading(false);
        });
      });
    } else {
      this.setState({
        showPCRTestForm: true,
        test,
      });
    }
  }

  handleSubmit = async (answers) => {
    const { showLoading } = this.props;
    const { test: { profileID } } = this.state;
    const user = await sessionService.loadUser();

    const {
      profiles,
    } = user;

    showLoading(true);

    // eslint-disable-next-line
    answers.resultTest = parseInt(answers.resultTest, 10);

    apiFetch({
      method: 'POST',
      url: API_URLS.saveUserPCRTest(profileID),
      params: answers,
    }).then((testResult) => {
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
        this.setState({
          test: {
            ...pcrTest,
            onlyValidateFields: true,
          },
        }, () => {
          showLoading(false);
        });

        return;
      }

      this.setState({
        showPCRTestForm: false,
      }, () => {
        showLoading(false);
      });
    }).catch((error) => {
      console.error(error);
      this.setState({
        showPCRTestForm: false,
      }, () => {
        showLoading(false);
      });
    });
  }

  handleValidateField = (values) => {
    const { showLoading } = this.props;
    const { test: { id: pcrID, profileID } } = this.state;
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
        this.setState({
          test: {
            ...test,
            onlyValidateFields: true,
            timestamp: Math.floor(new Date().getTime() / 1000),
          },
        }, () => {
          showLoading(false);
        });

        return;
      }

      this.setState({
        showPCRTestForm: false,
      }, () => {
        showLoading(false);
      });
    }).catch((error) => {
      console.error(error);
      showLoading(false);
    });
  }

  render() {
    const {
      literals, showLoading, btActive, onShowModalLangs,
    } = this.props;
    const {
      profiles, showSnack, showPCRTestForm, test,
    } = this.state;

    return (
      <React.Fragment>
        <section className='profiles-wrapper test-a sand-bg'>
          <div id='snackbar' className={`snackbar ${showSnack !== '' ? 'show' : ''}`}>
            <Warning />
            <div className='snackbar__text'>{showSnack}</div>
          </div>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-12 test-a-text my-text-m'>
                <h4>
                  {literals.title_profiles}
                  <img onClick={onShowModalLangs} src='/assets/images/cog.svg' alt='' />
                </h4>

                {btActive && (
                  <div>
                    <BTStatusCard literals={literals} />
                  </div>
                )}
                <p className='profiles-main-title'>{profiles.length === 1 ? literals.test1.yourProfile : literals.test1.yourFamily}</p>

                <div className='ProfileSlider'>
                  {profiles.length === 1 ? (
                    <div className='single-profile'>
                      <Profile key={profiles[0].id} profile={profiles[0]} literals={literals} onShowError={msg => this.showSnackBar(msg)} />
                      {/* ((typeof profiles[0].lastTest !== 'undefined') && profiles[0].lastTest !== 0) && (
                        profiles[0].exitRequests.length ? (
                          <Request activeProfileID={profiles[0].id} key={`R${profiles[0].id}`} request={profiles[0].exitRequests[0]} literals={literals} />
                        ) : (
                          <Request activeProfileID={profiles[0].id} key='empty' literals={literals} />
                        )
                      ) */}

                      {btActive && (
                        profiles[0].pcr.length ? (
                          <PCRTests activeProfileID={profiles[0].id} key={`R${profiles[0].id}`} test={profiles[0].pcr[0]} literals={literals} onShowForm={this.handleShowPCRForm} />
                        ) : (
                          <PCRTests activeProfileID={profiles[0].id} key='empty' literals={literals} onShowForm={this.handleShowPCRForm} />
                        )
                      )}
                    </div>
                  ) : (
                    <Slider {...sliderSettings}>
                      {profiles.map(profile => (
                        <React.Fragment key={profile.id}>
                          <Profile profile={profile} literals={literals} onShowError={msg => this.showSnackBar(msg)} />
                          { /* profile.exitRequests.length ? (
                            <Request activeProfileID={profile.id} request={profile.exitRequests[0]} literals={literals} />
                          ) : (
                            <Request activeProfileID={profile.id} literals={literals} />
                          ) */}

                          {btActive && (
                            profile.pcr.length > 0 ? (
                              <PCRTests activeProfileID={profile.id} test={profile.pcr[0]} literals={literals} onShowForm={this.handleShowPCRForm} />
                            ) : (
                              <PCRTests activeProfileID={profile.id} literals={literals} onShowForm={this.handleShowPCRForm} />
                            )
                          )}
                        </React.Fragment>
                      ))}
                    </Slider>
                  )}
                </div>
                <div className='row invite-wrapper'>
                  <div className='col-xs-12'>
                    <div className='subheader-content'>
                      <img
                        className='invite-img'
                        alt=''
                        src='/assets/images/family-green-round.svg'
                      />
                      <h3>{literals.test1.helpButtonTxt}</h3>
                      <p>{literals.test1.inviteFamily}</p>
                    </div>
                    <div className='btn-test-other'>
                      <Button
                        onClick={this.goToTest}
                        label={literals.test1.buttonTestOther}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {showPCRTestForm && (
          <React.Fragment>
            <div className='overlay open' />
            <div className='search-sec-text pcrtest-moda-wrapper'>
              <div className='pcrtest-modal-header'>
                <img src='/assets/images/green-arrow.svg' onClick={() => this.setState({ showPCRTestForm: false })} alt='' />
                <span>{literals.test2.newPCRTest}</span>
              </div>
              <div className='pcrtest-form-wrapper'>
                <PCRForm
                  test={test}
                  literals={literals}
                  onSubmitForm={this.handleSubmit}
                  onCancel={() => this.setState({ showPCRTestForm: false })}
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
}
Profiles.displayName = 'Profiles';
Profiles.propTypes = {
  literals: PropTypes.object.isRequired,
  profiles: PropTypes.array.isRequired,
  phone: PropTypes.string.isRequired,
  showLoading: PropTypes.func.isRequired,
  btActive: PropTypes.bool.isRequired,
  onShowModalLangs: PropTypes.func.isRequired,
};
export default Profiles;
