/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { API_URLS } from 'constants/apiConf';
import apiFetch from 'utils/apiFetch';
import { formatDate } from 'utils';
import './styles.css';

class Notifications extends React.Component {
  state = {
    showModal: false,
    notificationSelected: {},
    arrayNotifications: [],
  }

  componentDidMount() {
    this.getNotifications();
  }

  getNotifications = () => {
    const {
      showLoading,
    } = this.props;

    showLoading(true);
    apiFetch({
      method: 'GET',
      url: `${API_URLS.userNotifications}`,
    }).then((arrayNotifications) => {
      this.setState({
        arrayNotifications,
      }, () => { showLoading(false); });
    }).catch((error) => {
      console.error('error', error);
      this.setState({
        arrayNotifications: [
          {
            id: 0,
            title: 'Lorem ipsum',
            timestamp: (new Date().getTime() / 1000),
            content: '<b>Lorem ipsum dolor sit amet</b><br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.<br/><br/><b>Incididunt ut labore et dolore magna aliqua:</b> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat:<br/><br/><ul><li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li><li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li><li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li></ul>',
          },
          {
            id: 1,
            title: 'Lorem ipsum',
            timestamp: (new Date().getTime() / 1000),
            content: '<b>Lorem ipsum dolor sit amet</b><br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.<br/><br/><b>Incididunt ut labore et dolore magna aliqua:</b> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat:<br/><br/><ul><li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li><li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li><li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li></ul>',
          },
          {
            id: 2,
            title: 'Lorem ipsum',
            timestamp: (new Date().getTime() / 1000),
            content: '<b>Lorem ipsum dolor sit amet</b><br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.<br/><br/><b>Incididunt ut labore et dolore magna aliqua:</b> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat:<br/><br/><ul><li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li><li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li><li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li></ul>',
          },
        ],
      });
      showLoading(false);
    });
  }

  hideModal = () => {
    this.setState({ showModal: false });
  }

  showNotificationDetails = (notification) => {
    this.setState({ showModal: true, notificationSelected: notification });
  }

  renderMessages = () => {
    const {
      arrayNotifications,
    } = this.state;
    return arrayNotifications.map((notification, index) => {
      return (
        <div key={index} className='col-12 history-item' onClick={() => this.showNotificationDetails(notification)}>
          <div className='data-row'>
            <img src='/assets/images/notification.svg' className='notificationIcon' alt='notification icon' />
            <div className='notification-info'>
              <span className='date-formatted'>{formatDate(notification.timestamp)}</span>
              <p>{notification.title}</p>
            </div>
          </div>
          <img
            className=''
            src='/assets/images/chevron-right.svg'
            alt=''
          />
        </div>
      );
    });
  }

  render() {
    const {
      showModal,
      arrayNotifications,
      notificationSelected,
    } = this.state;
    const {
      literals,
    } = this.props;
    return (
      <div className='notifications-view'>
        <header>
          <div className='subtitle'>
            <span className='hashtag'>{literals.hashtag}</span>
          </div>
        </header>
        <section className='notifications-container'>
          <div className='notifications-wrapper row'>
            {arrayNotifications.length === 0 ? (
              <p className='no-messages-txt col-12'>{literals.noNotifications}</p>
            ) : this.renderMessages()}
          </div>
        </section>
        {showModal && (
          <div className='email-modal-wrapper'>
            <div className='overlay open' />
            <div className='search-sec-text'>
              <div className='hos-head-txt'>
                <h4 className='crop-text lines-1'>{notificationSelected.title}</h4>
                <p
                  onClick={this.hideModal}
                >
                  {literals.close}
                </p>
              </div>
              <div className='emailContent'>
                <p className='notification-date'>{formatDate(notificationSelected.timestamp)}</p>
                <span className='notification-content' dangerouslySetInnerHTML={{ __html: notificationSelected.content }} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Notifications.displayName = 'Notifications';
Notifications.propTypes = {
  showLoading: PropTypes.func.isRequired,
  literals: PropTypes.object.isRequired,
};

export default Notifications;
