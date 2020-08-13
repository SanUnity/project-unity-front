import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API_URLS } from 'constants/apiConf';
import apiFetch from 'utils/apiFetch';
import Results from 'routes/Results/components';
import history from 'store/history';
import {
  TEST_RESUL_LOW,
  TEST_RESUL_MEDIUM_LOW,
  TEST_RESUL_MEDIUM,
  TEST_RESUL_MEDIUM_HIGH,
  TEST_RESUL_MEDIUM_VULNERABLE,
  TEST_RESUL_HIGH,
} from 'constants/tests';
import { formatDate } from 'utils';

import './styles.css';

class HealthHistoryTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      arrayTests: [],
      itemSelected: {},
      showModal: false,
    };
  }

  componentDidMount() {
    const { profile } = this.props;

    if (typeof profile.history !== 'undefined') {
      this.setState({
        arrayTests: profile.history,
        loaded: true,
      });
    } else {
      this.getUserHistory();
    }
  }

  getUserHistory = () => {
    const {
      match, showLoading,
    } = this.props;

    const profileID = match.params.profileID;

    showLoading(true);
    apiFetch({
      method: 'GET',
      url: `${API_URLS.saveUserTest(profileID)}`,
    }).then((arrayTests) => {
      this.setState({
        arrayTests,
        loaded: true,
      }, () => {
        const { onFetchHistory } = this.props;
        onFetchHistory(arrayTests);
        showLoading(false);
      });
    }).catch((error) => {
      console.error('error', error);
      showLoading(false);
    });
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

    return literals[state].title;
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

  render() {
    const { literals, profile, onShowForm } = this.props;
    const {
      loaded, arrayTests, itemSelected, showModal,
    } = this.state;
    return loaded ? (
      <React.Fragment>
        <div className='test-history-wrapper row'>
          {arrayTests
            .sort((a, b) => ((a.timestamp < b.timestamp) ? 1 : -1))
            .map((test, index) => (
              <div key={index} className='col-12 history-item' onClick={() => this.showDetails(test)}>
                <div className='data-row'>
                  <span className={`status-indicator ${test.level !== '-' ? `level-${test.level}` : ''}`} />
                  <span className='date-formatted'>{formatDate(test.timestamp)}</span>
                  <p>{this.getLiteralByLevel(test.level)}</p>
                </div>
                <img
                  className=''
                  src='/assets/images/chevron-right.svg'
                  alt=''
                />
              </div>
            ))}

          {profile.pcr.length === 0 && (
            <div className='qr-code-wrapper' onClick={() => onShowForm({ id: '', firstTest: true, profileID: profile.id })}>
              <img className='align-self-center qr-code-icon' src='/assets/images/qr_code.svg' alt='' />
            </div>
          )}
        </div>
        {showModal && (
          <div className='test-history-modal-wrapper'>
            <div className='overlay open' />
            <div className='search-sec-text'>
              <div className='hos-head-txt'>
                <h4>{literals.testDetails}</h4>
                <p
                  onClick={this.hideModal}
                >
                  {literals.close}
                </p>
              </div>
              <Results result={itemSelected} literals={literals} route={history} simple modal />
            </div>
          </div>
        )}
      </React.Fragment>
    ) : null;
  }
}
HealthHistoryTab.displayName = 'HealthHistoryTab';
HealthHistoryTab.propTypes = {
  literals: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  showLoading: PropTypes.func.isRequired,
  onFetchHistory: PropTypes.func.isRequired,
  onShowForm: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
export default HealthHistoryTab;
