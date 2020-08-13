import React from 'react';
import PropTypes from 'prop-types';

/**
 * @name SplashScreen
 *
 * @param {object} literals
 *
 * @returns {JSX}
 */

const SplashScreen = ({ literals }) => {
  return (
    <section className='main-back'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 hero-text-image'>
            <img
              alt=''
              src='../../assets/images/mexico-government-splash.svg'
              className='mex-gob-img'
            />
          </div>
          <div className='col-12 hero-text-title'>
            <h1>{literals.splashScreen.mainTitle}</h1>
            <h4>{literals.splashScreen.mainSubtitle}</h4>
          </div>
          <div className='row hero-gob-footer'>
            <img
              alt=''
              src='../../assets/images/gob-mx.svg'
              className='mex-gob-img'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

SplashScreen.propTypes = {
  literals: PropTypes.object.isRequired,
};

export default SplashScreen;
