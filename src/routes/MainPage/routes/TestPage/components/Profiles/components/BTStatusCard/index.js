import React, { Component } from 'react';
import PropTypes from 'prop-types';
import history from 'store/history';
import BTIcon from 'routes/MainPage/icons/BT';


class BTStatusCard extends Component {
  constructor(props) {
    super(props);
    let localStatus = localStorage.getItem('BTStatus');
    localStatus = localStatus !== null ? parseInt(localStatus, 10) : 0;

    const onCompatibleDevice = window.onMobileDevice();

    this.interval = null;
    this.state = {
      onCompatibleDevice: localStatus !== 5 && onCompatibleDevice,
      status: localStatus,
      isActive: localStatus === 1,
    };
  }

  componentDidMount() {
    const { onCompatibleDevice } = this.state;

    if (onCompatibleDevice) {
      this.interval = setInterval(this.getStatusFromLocalStorage, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getStatusFromLocalStorage = () => {
    let localStatus = localStorage.getItem('BTStatus');
    localStatus = localStatus !== null ? parseInt(localStatus, 10) : 0;
    const { status } = this.state;

    // console.log('Current Status: ', localStatus);

    if (localStatus !== null && localStatus !== status) {
      // console.log('Status Changed: ', localStatus);
      this.setState({
        status: localStatus,
        isActive: localStatus === 1,
      });
    }
  }

  goToBTStatus = () => {
    history.push('/main/bt-status');
  }

  render() {
    const { literals } = this.props;
    const { onCompatibleDevice, isActive } = this.state;
    return onCompatibleDevice ? (
      <div className={`request bt-status-card row ${isActive ? 'is-active' : ''}`} onClick={this.goToBTStatus}>
        <div className='col-12 p-0'>
          <div className='media'>
            <BTIcon />
            <div className='media-body align-self-center'>
              <p className='p-status'>
                {isActive ? literals.test2.btStatusActive : literals.test2.btStatusInctive}
              </p>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

BTStatusCard.displayName = 'BTStatusCard';
BTStatusCard.propTypes = {
  literals: PropTypes.object.isRequired,
};
export default BTStatusCard;
