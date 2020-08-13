import React from 'react';
import PropTypes from 'prop-types';

/**
 * @name CooldownTimer
 *
 * @param {object} literals
 *
 * @returns {JSX}
 */

const CooldownTimer = ({
  literals, hours, minutes, seconds,
}) => {
  return (
    <section className='test-a sand-bg'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 test-a-text my-text-m'>
            <h4>{literals.title}</h4>
            <img
              className='tst-a all-ok'
              alt=''
              src='/assets/images/undraw_doctorlast.svg'
            />
            <h3>{literals.test2.hint}</h3>

            <div className='card-block'>
              <div id='countdown'>
                <div className='well'>
                  <span id='hour' className='timer'>
                    {hours}
                  </span>
                  <span className='dot'>:</span>
                  <span id='min' className='timer'>
                    {minutes}
                  </span>
                  <span className='dot'>:</span>
                  <span id='sec' className='timer'>
                    {seconds}
                  </span>
                </div>
                <div className='well'>
                  <div className='timer-a'>{literals.test2.hours}</div>
                  <div className='timer-a'>{literals.test2.minutes}</div>
                  <div className='timer-a'>{literals.test2.seconds}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

CooldownTimer.propTypes = {
  literals: PropTypes.object.isRequired,
  hours: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
};

export default CooldownTimer;
