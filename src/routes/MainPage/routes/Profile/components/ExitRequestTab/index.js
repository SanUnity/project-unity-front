import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import Slider from 'react-slick';
import Timer from 'components/Timer';
import './styles.css';
import { API_URLS } from 'constants/apiConf';
import apiFetch from 'utils/apiFetch';
import { sessionService } from 'redux-react-session';
import ModalConfirm from 'components/ModalConfirm';
import ModalExitRequest from './ModalExitRequest';

const SliderSettings = {
  dots: true,
  infinite: false,
  slidesToShow: 2,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2.1,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.1,
        slidesToScroll: 1,
      },
    },
  ],
};

class ExitRequestTab extends Component {
  static propTypes = {
    literals: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
  };

  state = {
    modalActive: false,
    modalDeleteId: '',
  }

  componentDidMount() {
    const { showNewExitRequest } = this.props;
    if (showNewExitRequest) {
      this.setState({ modalActive: true });
    }
  }

  deleteExitRequest(id) {
    const { profile, showLoading } = this.props;
    showLoading(true);
    apiFetch({
      method: 'DELETE',
      url: `${API_URLS.userProfile}/${profile.id}/exitRequests/${id}`,
    }).then(async () => {
      const session = await sessionService.loadUser();
      const { profiles } = session;
      const profilesToEdit = [...profiles];
      const position = profilesToEdit.findIndex(p => p.id === profile.id);
      const exitRequestPosition = profilesToEdit[position].exitRequests.findIndex(e => e.id === id);
      profilesToEdit[position].exitRequests.splice(exitRequestPosition, 1);
      sessionService.saveUser({
        ...session,
        profiles: profilesToEdit,
      });
      showLoading(false);
      this.setState({ modalDeleteId: '' });
    }).catch((error) => {
      console.error('error', error);
      showLoading(false);
    });
  }

  renderExitRequests() {
    const { profile, literals, firstRequest } = this.props;
    let exitRequests = [];
    if (firstRequest) {
      exitRequests.push(firstRequest);
      profile.exitRequests.forEach((request) => {
        if (request.id !== firstRequest.id) {
          exitRequests.push(request);
        }
      });
    } else {
      exitRequests = [...profile.exitRequests];
    }
    return exitRequests.map((exitRequest) => {
      return (
        <div key={exitRequest.id} className='exit-request-card-wrapper'>
          <div className='exit-request-card'>
            <div className='exit-request-card-section'>
              <h3>{profile.name}</h3>
              <p>{profile.home !== '' ? profile.home : 'No home value'}</p>
            </div>
            <div className='exit-request-card-section'>
              <h4>{literals.motive}</h4>
              <p>{exitRequest.motive}</p>
            </div>
            <div className='exit-request-card-section'>
              <h4>{literals.destination}</h4>
              <p>{exitRequest.destiny}</p>
            </div>
            <div className='qr-code'>
              <QRCode value={exitRequest.url} />
            </div>
            <div className='exit-request-card-footer'>
              <Timer
                timestamp={exitRequest.timestamp}
                maxTime={24}
                DoneContent={/* istanbul ignore next */() => (
                  <p>{literals.expired}</p>
                )}
              />
              <p className='exit-request-delete' onClick={() => this.setState({ modalDeleteId: exitRequest.id })}>
                {literals.delete}
                <img src='/assets/images/trash.svg' alt='trash' />
              </p>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const { profile, literals, showLoading } = this.props;
    const { modalActive, modalDeleteId } = this.state;
    if (!profile.exitRequests || !profile.exitRequests.length) {
      return (
        <div className='exit-request-wrapper'>
          <div className='row exit-request-header'>
            <img className='' src='/assets/images/dummy-dark-green-small.svg' alt='' />
            <p className='empty-title'>{literals.emptyTitle}</p>
            <p className='empty-description'>{literals.emptyDescription}</p>
          </div>
          <div className='request row is-empty' onClick={() => this.setState({ modalActive: true })}>
            <div className='col-12 p-0'>
              <div className='media'>
                <img className='align-self-center mr-3' src='/assets/images/dummy-gray-small.svg' alt='' />
                <div className='media-body align-self-center'>
                  <p className='p-generate'>
                    {literals.generateNewExitRequest}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {modalActive ? <ModalExitRequest profile={profile} showLoading={showLoading} literals={literals} close={/* istanbul ignore next */() => this.setState({ modalActive: false })} /> : ''}
        </div>
      );
    }
    return (
      <div className='exit-request-wrapper'>
        <p className='green-text' onClick={() => this.setState({ modalActive: true })}>{literals.notifyNewExitRequest}</p>
        <Slider {...SliderSettings}>
          {this.renderExitRequests()}
        </Slider>
        <p className='footer-text'>{literals.showQR}</p>
        {modalActive ? (
          <ModalExitRequest literals={literals} profile={profile} showLoading={showLoading} close={/* istanbul ignore next */() => this.setState({ modalActive: false })} />
        ) : ''}
        {modalDeleteId !== '' ? (
          <ModalConfirm title={literals.modalDeleteTitle} cancelText={literals.modalDeleteCancel} confirmText={literals.modalDeleteConfirm} cancel={/* istanbul ignore next */() => this.setState({ modalDeleteId: '' })} confirm={/* istanbul ignore next */() => this.deleteExitRequest(modalDeleteId)} />
        ) : ''}
      </div>
    );
  }
}
export default ExitRequestTab;
