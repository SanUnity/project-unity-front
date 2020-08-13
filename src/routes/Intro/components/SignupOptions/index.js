/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/UI/Button';

class SignupOptions extends Component {
  render() {
    const { literals, onContinueAnonymous } = this.props;
    return (
      <section className='welcome add-bg signup-options'>
        <div className='back'>
          <img
            className='img'
            src='../../assets/images/wellcome-bg.png'
            alt=''
          />
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12 welcome-text'>
              <h4>{literals.welcome.title}</h4>
              <h2>{literals.welcome.help_big}</h2>
              <span>{literals.welcome.help_text}</span>
              <img
                src='/assets/images/undraw_data_xmfy.svg'
                alt=''
              />

              <div className='btn-my-sec text-center'>
                <Button label={literals.welcome.butonRegister} href='/signup' />

                <a className='link-anonymous' onClick={onContinueAnonymous}>{literals.welcome.enterAnonymously}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
SignupOptions.displayName = 'SignupOptions';
SignupOptions.propTypes = {
  literals: PropTypes.object.isRequired,
  onContinueAnonymous: PropTypes.func.isRequired,
};
export default SignupOptions;
