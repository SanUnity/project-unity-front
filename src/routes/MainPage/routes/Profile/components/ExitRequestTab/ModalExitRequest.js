import React, { Component } from 'react';
import Input from 'components/UI/Input';
import PropTypes from 'prop-types';
import { sessionService } from 'redux-react-session';
import './styles.css';
import apiFetch from 'utils/apiFetch';
import { API_URLS } from 'constants/apiConf';

class ModalExitRequest extends Component {
  static propTypes = {
    literals: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
    showLoading: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
  };

  state = {
    motive: '',
    destiny: '',
  }

  isValid = () => {
    const { motive, destiny } = this.state;

    return (motive !== '' && destiny !== '');
  }

  handleNewExitRequest = () => {
    const { destiny, motive } = this.state;
    const { profile, showLoading, close } = this.props;
    showLoading(true);
    apiFetch({
      method: 'POST',
      url: `${API_URLS.userProfile}/${profile.id}/exitRequests`,
      params: { destiny, motive },
    }).then(async (response) => {
      const session = await sessionService.loadUser();
      const { profiles } = session;
      const profilesToEdit = [...profiles];
      const position = profilesToEdit.findIndex(p => p.id === profile.id);

      if (typeof profilesToEdit[position].exitRequests === 'undefined') {
        profilesToEdit[position].exitRequests = [];
      }

      profilesToEdit[position].exitRequests.push(response);
      sessionService.saveUser({
        ...session,
        profiles: profilesToEdit,
      });
      close();
      showLoading(false);
    }).catch((error) => {
      console.error('error', error);
      showLoading(false);
    });
  }

  render() {
    const { literals, close } = this.props;
    const { motive, destiny } = this.state;

    return (
      <React.Fragment>
        <div className='overlay open' />
        <div className='search-sec-text'>
          <div className='exit-request-form-wrapper'>
            <div className='hos-head-txt'>
              <h4>{literals.notifyExit}</h4>
              <p
                onClick={close}
              >
                {literals.cancel}
              </p>
            </div>
            <div className='subtitle'>
              <img src='/assets/images/dummy-dark-green-small.svg' alt='dummy-green' />
              <span className='hashtag'>{literals.modalTitle}</span>
              <span className='info'>
                {literals.modalSubtitle}
              </span>
            </div>
            <div className='form-input-fields-container'>
              <form noValidate autoComplete='off'>
                <div className='form-group'>
                  <Input
                    name='motive'
                    label={literals.whatIsTheMotive}
                    type='string'
                    placeholder={literals.reasonToGoOut}
                    id='motive'
                    value={motive}
                    onChange={e => this.setState({ motive: e.target.value })}
                  />
                </div>
                <div className='form-group'>
                  <Input
                    name='destiny'
                    label={literals.destiny}
                    type='string'
                    placeholder={literals.direction}
                    id='destiny'
                    value={destiny}
                    onChange={(e) => {
                      e.preventDefault();
                      this.setState({ destiny: e.target.value });
                    }}
                  />
                </div>
                <button
                  type='button'
                  disabled={!this.isValid()}
                  onClick={this.handleNewExitRequest}
                >
                  {literals.notifyTheExit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default ModalExitRequest;
