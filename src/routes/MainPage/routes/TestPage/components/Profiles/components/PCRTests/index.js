import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/UI/Button';
import history from 'store/history';

class PCRTests extends Component {
  goToProfile = () => {
    const { test, activeProfileID } = this.props;
    if (test.profileID) {
      history.push(`profile/${test.profileID}/pcr`);
    } else {
      history.push(`profile/${activeProfileID}/pcr`);
    }
  };

  showForm = (event) => {
    const {
      test, onShowForm,
    } = this.props;

    event.stopPropagation();
    event.preventDefault();

    onShowForm({
      ...test,
      id: '',
      resultTest: '',
      dateTest: '',
      verified: false,
    });
  }

  render() {
    const {
      test, activeProfileID, literals, onShowForm,
    } = this.props;
    return (
      <div className={`request pcr-test row ${test.id === '' ? 'is-empty' : ''}`}>
        <div className='col-12 p-0'>
          {test.id !== '' ? (
            <div className='media' onClick={this.goToProfile}>
              <img className='test-icon align-self-center mr-3' src='/assets/images/test_icon.svg' alt='' />
              <div className='media-body'>
                <p className='p-motive'>
                  <span className='crop-text lines-1'>
                    {test.dateTest}
                    {test.verified && (
                      <img className='icon-verified' src='/assets/images/verified.svg' alt='' />
                    )}
                  </span>
                </p>
                <p className='p-destiny'>
                  <span className=''>{literals.test2.lastTestDate}</span>
                  <Button
                    onClick={event => this.showForm(event)}
                    label={literals.test2.newPCRTestBtn}
                  />
                </p>
              </div>
            </div>
          ) : (
            <div className='media'>
              <div className='media-body align-self-center align-center' onClick={() => onShowForm({ id: '', firstTest: true, profileID: activeProfileID })}>
                <img className='align-self-center qr-code-icon' src='/assets/images/qr_code.svg' alt='' />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
PCRTests.displayName = 'PCRTests';
PCRTests.propTypes = {
  activeProfileID: PropTypes.string.isRequired,
  literals: PropTypes.object.isRequired,
  onShowForm: PropTypes.func.isRequired,
  test: PropTypes.object,
};
PCRTests.defaultProps = {
  test: { id: '' },
};
export default PCRTests;
