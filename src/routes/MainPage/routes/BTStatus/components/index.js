/* eslint-disable react/no-danger, jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/UI/Button';
import FullTerms from 'routes/Signup/components/FullTerms';

import './styles.css';

class BTStatus extends Component {
  constructor(props) {
    super(props);
    let localStatus = localStorage.getItem('BTStatus');
    localStatus = localStatus !== null ? parseInt(localStatus, 10) : 0;

    const { literals } = props;
    const onCompatibleDevice = window.onMobileDevice();

    this.interval = null;
    this.state = {
      onCompatibleDevice: localStatus !== 5 && onCompatibleDevice,
      status: localStatus,
      showIOSSteps: false,
      modalTitle: literals.modaleTitleInactive,
      showInformationModal: false,
      handleShowFullTerms: false,
    };
  }

  componentDidMount() {
    const { onCompatibleDevice } = this.state;

    if (onCompatibleDevice) {
      this.setViewFromStatus();

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
      }, () => {
        this.setViewFromStatus();
      });
    }
  }

  setViewFromStatus = () => {
    const { status, onCompatibleDevice, showIOSSteps } = this.state;
    const { literals } = this.props;

    let title = literals.titleInactive;
    let description = literals.descriptionInactive;
    let image = '/assets/images/bt_off.svg';
    let modalTitle = literals.modaleTitleInactive;
    let isCompatible = onCompatibleDevice;
    let modalStatus = showIOSSteps;

    switch (status) {
      case 1:
        title = literals.titleActive;
        description = literals.descriptionActive;
        image = '/assets/images/bt_on.svg';
        modalStatus = false;
        break;
      case 2:
        modalTitle = literals.modaleTitleBTInactive;
        break;
      case 3:
        break;
      case 4:
        modalTitle = literals.modaleTitleNotificationsInactive;
        break;
      case 5:
        isCompatible = false;
        break;
      default:
        break;
    }

    this.setState({
      title,
      description,
      image,
      modalTitle,
      onCompatibleDevice: isCompatible,
      showIOSSteps: modalStatus,
    });
  }

  activateService = () => {
    const { status } = this.state;

    if (window.onIPhone() || status === 4) {
      this.setState({
        showIOSSteps: true,
      });
    } else if (window.onAndroid()) {
      if (status === 2) {
        window.requestBT();
      } else {
        window.activateBT();
      }
    }
  }

  getImageByStatus = () => {
    const { status } = this.state;
    switch (status) {
      case 0: return (<img src='/assets/images/en_steps/en_off_ios.png' alt='' />);
      case 2: return (<img src='/assets/images/en_steps/bt_off_ios.png' alt='' />);
      case 3: return (<img src='/assets/images/en_steps/exposition_notifications_off_ios.png' alt='' />);
      case 4: return window.onAndroid() ? (<img src='/assets/images/en_steps/notifications_off_android.png' alt='' />) : (<img src='/assets/images/en_steps/notifications_off_ios.png' alt='' />);
      default: return null;
    }
  }

  getActionByStatus = () => {
    const { literals } = this.props;
    const { status } = this.state;

    switch (status) {
      case 3: return window.onIPhone() ? (
        <Button
          onClick={window.goToNotificationsSettings}
          label={literals.actionSettings}
        />
      ) : null;
      case 4: return (
        <Button
          onClick={window.goToNotificationsSettings}
          label={literals.actionSettings}
        />
      );
      default: return null;
    }
  }

  getInformationModalContent = () => {
    const { literals } = this.props;
    const { infoActive } = this.state;

    switch (infoActive) {
      case 'bt':
        return (
          <div className='information-modal bt-information'>
            <div className='inactive-info'>
              <h2>{literals.withoutNotificationsTitle}</h2>
              <img src='/assets/images/without_bt.svg' alt='' />
              <p>{literals.withoutNotificationsDescription}</p>
            </div>
            <div className='active-info'>
              <h2>{literals.withNotificationsTitle}</h2>
              <img src='/assets/images/with_bt.svg' alt='' />
              <p>{literals.withNotificationsDescription}</p>
            </div>
          </div>
        );
      case 'protocols':
        return (
          <div className='information-modal protocols-information'>
            {literals.protocols.map((protocol, index) => (
              <div className='media protocol-block' key={index}>
                {index % 2 !== 0 && (<img className='align-self-center mr-3' src={protocol.img} alt='' />)}
                <div className='media-body align-self-center'>
                  <p
                    className='p-description'
                    dangerouslySetInnerHTML={{ __html: protocol.description }}
                  />
                </div>
                {index % 2 === 0 && (<img className='align-self-center ml-3' src={protocol.img} alt='' />)}
              </div>
            ))}

            <a onClick={() => this.setState({ handleShowFullTerms: true })}>{literals.privacy}</a>
          </div>
        );
      default: return null;
    }
  }

  showInformationModal = (infoActive) => {
    this.setState({
      infoActive,
      showInformationModal: true,
    });
  }

  render() {
    const { literals } = this.props;
    const {
      onCompatibleDevice,
      status,
      title,
      description,
      image,
      modalTitle,
      showIOSSteps,
      showInformationModal,
      handleShowFullTerms,
    } = this.state;
    return (
      <React.Fragment>
        {onCompatibleDevice ? (
          <div className={`bt-status-wrapper ${status === 1 ? 'is-active' : 'is-inactive'}`}>
            <img className='bt-status-img' src={image} alt='' />
            <h3 dangerouslySetInnerHTML={{ __html: title }} />
            <p>{description}</p>

            {status !== 1 && (
              <div className='action-wrapper'>
                <Button
                  onClick={this.activateService}
                  label={literals.actionInactive}
                />
              </div>
            )}

            <div className='bt-status-info'>
              <p className='info-title'>{literals.information}</p>
              <div className='info-card-wrapper'>
                <div className='media'>
                  <img className='align-self-center mr-3' src='/assets/images/bt_icon.svg' alt='' />
                  <div className='media-body'>
                    <p className='p-info-title'>
                      {literals.btInfo}
                    </p>
                    <p className='p-info-description' onClick={() => this.showInformationModal('bt')}>
                      {literals.nowMore}
                    </p>
                  </div>
                </div>
              </div>

              <div className='info-card-wrapper'>
                <div className='media'>
                  <img className='align-self-center mr-3' src='/assets/images/protocol_icon.svg' alt='' />
                  <div className='media-body'>
                    <p className='p-info-title'>
                      {literals.protocolInfo}
                    </p>
                    <p className='p-info-description' onClick={() => this.showInformationModal('protocols')}>
                      {literals.nowMore}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='bt-status-wrapper is-incompatible'>
            <img className='bt-status-img' src='/assets/images/undraw_notify_88a4.svg' alt='' />
            <h3 dangerouslySetInnerHTML={{ __html: literals.incompatibleTitle }} />
            <p>{literals.incompatibleDescription}</p>
            {window.onAndroid() && (<p>{literals.incompatibleDescriptionAndroid}</p>)}
            {window.onIOS() && (<p>{literals.incompatibleDescriptionIOS}</p>)}
          </div>
        )}
        {showIOSSteps && (
          <React.Fragment>
            <div className='overlay open' />
            <div className='search-sec-text steps-moda-wrapper'>
              <div className='steps-modal-header'>
                <img src='/assets/images/green-arrow.svg' onClick={() => this.setState({ showIOSSteps: false })} alt='' />
                <span>{modalTitle}</span>
              </div>
              <div className='ios-steps-wrapper'>
                {this.getImageByStatus()}

                <div className='modal-actions-wrapper'>
                  {this.getActionByStatus()}
                </div>
              </div>
            </div>
          </React.Fragment>
        )}

        {showInformationModal && (
          <React.Fragment>
            <div className='overlay open' />
            <div className='search-sec-text steps-moda-wrapper'>
              <div className='steps-modal-header'>
                <img src='/assets/images/green-arrow.svg' onClick={() => this.setState({ showInformationModal: false })} alt='' />
                <span>{literals.information}</span>
              </div>
              <div className='ios-steps-wrapper'>
                {this.getInformationModalContent()}
              </div>
            </div>
          </React.Fragment>
        )}

        {handleShowFullTerms ? (<FullTerms onClose={() => this.setState({ handleShowFullTerms: false })} />) : null}
      </React.Fragment>
    );
  }
}
BTStatus.displayName = 'BTStatus';
BTStatus.propTypes = {
  literals: PropTypes.object.isRequired,
};
export default BTStatus;
