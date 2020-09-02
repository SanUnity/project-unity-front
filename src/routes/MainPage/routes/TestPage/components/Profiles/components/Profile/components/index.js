import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/UI/Button';
import apiFetch from 'utils/apiFetch';
import { API_URLS } from 'constants/apiConf';
import {
  TEST_RESUL_LOW,
  TEST_RESUL_MEDIUM_LOW,
  TEST_RESUL_MEDIUM,
  TEST_RESUL_MEDIUM_HIGH,
  TEST_RESUL_MEDIUM_VULNERABLE,
  TEST_RESUL_HIGH,
} from 'constants/tests';
import history from 'store/history';
import FavoriteStar from 'routes/MainPage/icons/FavoriteStar';

const MAX_TEST_TIME = 1 / 60; // 1min
// const MAX_TEST_TIME = 6; // 6h

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayTimerPage: false,
      loaded: false,
    };
  }

  componentDidMount = () => {
    const {
      profile: { lastTest },
    } = this.props;

    this.lastTest = lastTest;
    this.max = MAX_TEST_TIME * 60 * 60; /** time in seconds */
    const now = Math.floor(new Date().getTime() / 1000);
    const distance = now - this.lastTest;
    if (distance < this.max && distance > 0) {
      this.refreshTime();
      this.setState({
        displayTimerPage: true,
      });

      this.interval = setInterval(this.refreshTime, 1000);
    }
    this.setState({ loaded: true });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  refreshTime = () => {
    const now = Math.floor(new Date().getTime() / 1000);
    const distance = (now - this.lastTest) * 1000;

    if (distance / 1000 >= this.max) {
      /** more than 12hrs passed */
      clearInterval(this.interval);
      this.setState({ displayTimerPage: false });
      return;
    }

    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // hours = Math.abs(hours - 11);
    hours = Math.abs(hours - 5);
    minutes = Math.abs(minutes - 59);
    seconds = Math.abs(seconds - 59);

    this.setState({
      hours: hours < 10 ? `0${hours}` : hours.toString(),
      minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
      seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
    });
  };

  loadUserAndRedirectToForm = async (event) => {
    event.stopPropagation();

    const {
      literals, profile, showLoading, onShowError,
    } = this.props;
    const { displayTimerPage } = this.state;

    if (displayTimerPage) {
      onShowError(literals.test2.waitTime);
      return;
    }

    showLoading(true);

    apiFetch({
      method: 'GET',
      url: `${API_URLS.userProfile}/${profile.id}`,
    }).then((data) => {
      showLoading(false);
      localStorage.setItem('testDetails', JSON.stringify(data));
      localStorage.setItem('profile', JSON.stringify(profile));
      history.push('/form-test/2/1');
    }).catch((error) => {
      showLoading(false);
      console.error(error);
    });
  };

  goToHistory = () => {
    const { profile } = this.props;

    if (profile.lastTest === 0) return;

    history.push(`profile/${profile.id}/history`);
  }

  getLiteralByLevel = (level) => {
    const { literals } = this.props;
    let state = 'good';

    switch (level) {
      case TEST_RESUL_LOW: state = 'good'; break;
      case TEST_RESUL_MEDIUM_LOW: state = 'medium_low'; break;
      case TEST_RESUL_MEDIUM: state = 'medium'; break;
      case TEST_RESUL_MEDIUM_HIGH: state = 'medium_high'; break;
      case TEST_RESUL_MEDIUM_VULNERABLE: state = 'medium_vulnerable'; break;
      case TEST_RESUL_HIGH: state = 'bad'; break;
      default: break;
    }

    return literals.results[state].title;
  }

  render() {
    const { profile, literals } = this.props;
    const {
      loaded, displayTimerPage, hours, minutes, seconds,
    } = this.state;

    return loaded ? (
      <div
        className={`profile row ${(profile.exitRequests && profile.exitRequests.length) ? 'has-exit-requests' : ''}`}
        onClick={this.goToHistory}
      >
        <div className='col-12 p-0'>
          {profile.isDefault ? (
            <FavoriteStar className='default-profile-icon' />
          ) : (
            <span className={`status-indicator ${profile.level !== '-' ? `level-${profile.level}` : ''}`} />
          )}
          <p className='p-name'>
            {profile.name || literals.test1.noName}
            {profile.lastTest !== 0 && (
              <img
                className=''
                src='/assets/images/chevron-right.svg'
                alt=''
              />
            )}
          </p>
        </div>
        <div className='col-12 p-0'>
          {profile.level !== '-' && (
            <p className='level-txt'>
              {this.getLiteralByLevel(profile.level)}
            </p>
          )}

          <div className={`action-wrapper ${displayTimerPage ? 'has-timer' : ''}`}>
            {displayTimerPage && (
              <div className='test-timer'>
                <img src='/assets/images/clock-small.svg' alt='' />
                {parseInt(hours, 10) > 0 && (
                  <span id='hour' className='timer'>
                    {`${hours}h `}
                  </span>
                )}
                <span id='min' className='timer'>
                  {`${minutes}m `}
                </span>
                <span id='sec' className='timer'>
                  {`${seconds}s `}
                </span>
              </div>
            )}

            <Button
              onClick={event => this.loadUserAndRedirectToForm(event)}
              label={profile.lastTest === 0 ? literals.test2.buttonCompleteTest : literals.test2.buttonNewTest}
            />
          </div>
        </div>
      </div>
    ) : null;
  }
}
Profile.displayName = 'Profile';
Profile.propTypes = {
  literals: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  showLoading: PropTypes.func.isRequired,
  onShowError: PropTypes.func.isRequired,
};
export default Profile;
