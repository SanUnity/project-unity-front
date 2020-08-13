import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class ModalExitRequest extends Component {
    static propTypes = {
      cancel: PropTypes.func.isRequired,
      title: PropTypes.string.isRequired,
      cancelText: PropTypes.string.isRequired,
      confirmText: PropTypes.string.isRequired,
      confirm: PropTypes.func.isRequired,
    };

    render() {
      const {
        title, cancelText, confirmText, cancel, confirm,
      } = this.props;

      return (
        <React.Fragment>
          <div className='overlay open' />
          <div className='modal-confirm'>
            <div className='modal-confirm-wrapper'>
              <div className='hos-head-txt'>
                <h4>{title}</h4>
              </div>
              <div className='form-input-fields-container'>
                <form noValidate autoComplete='off'>
                  <button
                    type='button'
                    className='cancel'
                    onClick={cancel}
                  >
                    {cancelText}
                  </button>
                  <button
                    type='button'
                    className='confirm'
                    onClick={confirm}
                  >
                    {confirmText}
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
