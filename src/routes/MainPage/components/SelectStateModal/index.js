import React, { Component } from 'react';
import PropTypes from 'prop-types';
import apiFetch from 'utils/apiFetch';
import { sessionService } from 'redux-react-session';
import { API_URLS } from 'constants/apiConf';
import Button from 'components/UI/Button';
import SelectInput from 'components/SelectInput';
import { BT_ACTIVE_FOR_ALL, BT_ACTIVE_STATES } from 'routes/App/userSession';

import './styles.css';

class SelectStateModal extends Component {
  state = {
    showModal: false,
    statesArray: [],
    stateSelected: '',
  };

  componentDidUpdate({ user: prevUser }) {
    const { user } = this.props;

    if (prevUser.id !== user.id && user.id) {
      if (user.state === null) {
        this.showModal();
      }
    }
  }

  showModal = async () => {
    const { showLoading } = this.props;

    showLoading(true);
    const data = await apiFetch({
      method: 'GET',
      url: API_URLS.states,
    });
    showLoading(false);

    const statesArray = [];
    data.map((state) => {
      statesArray.push({
        id: state.id,
        title: state.name,
        value: state.id,
      });
      return state;
    });
    this.setState({ statesArray, showModal: true });
  }

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  }

  handleStateSelected = () => {
    const { showLoading } = this.props;
    const { stateSelected } = this.state;

    showLoading(true);
    apiFetch({
      method: 'POST',
      url: API_URLS.userSetState,
      params: { state: stateSelected },
    }).then(async () => {
      const session = await sessionService.loadUser();
      /* istanbul ignore next */
      const BT_ACTIVE = BT_ACTIVE_FOR_ALL || BT_ACTIVE_STATES.indexOf(stateSelected) >= 0;

      session.state = stateSelected;
      session.bt_active = BT_ACTIVE;

      localStorage.setItem('CONF_MUNICIPALITY', stateSelected);

      sessionService
        .saveUser(session)
        .then(() => {
          this.setState({ showModal: false });
          showLoading(false);
        });
    }).catch((error) => {
      console.error(error);
      showLoading(false);
    });
  }

  render() {
    const { literals } = this.props;
    const { showModal, statesArray, stateSelected } = this.state;

    return showModal ? (
      <React.Fragment>
        <div className='overlay open' />
        <div className='search-sec-text terms-and-conditions'>
          <div className='select-state-modal'>
            <img src='/assets/images/changes.svg' alt='' />
            <h2>{literals.selectStateTitle}</h2>
            <p>{literals.selectStateDescription}</p>
            <div className='select-state-wrapper'>
              <SelectInput
                name='state'
                type='string'
                label={literals.selectState}
                placeholder={literals.selectStatePlaceholder}
                value={stateSelected}
                options={statesArray}
                onChange={e => this.handleChange(e.target.value, 'stateSelected')}
              />
            </div>
            <div className='btn-my-sec text-center'>
              <Button
                label={literals.btnContinue}
                onClick={this.handleStateSelected}
                disabled={!stateSelected}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    ) : null;
  }
}
SelectStateModal.displayName = 'SelectStateModal';
SelectStateModal.propTypes = {
  user: PropTypes.object.isRequired,
  literals: PropTypes.object.isRequired,
  showLoading: PropTypes.func.isRequired,
};
export default SelectStateModal;
