import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/UI/Button';
import history from 'store/history';
import BTStatusCard from '../Profiles/components/BTStatusCard';

/**
 * @name StartTest
 *
 * @param {object} literals
 *
 * @returns {JSX}
 */

const StartTest = ({ literals, onShowModalLangs }) => {
  const goToTest = () => {
    localStorage.setItem('testDetails', JSON.stringify({}));
    history.push('/form-test');
  };

  return (
    <section className='test-a no-profiles'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 test-a-text'>
            <h4>
              {literals.title}
              <img onClick={onShowModalLangs} src='/assets/images/cog.svg' alt='' />
            </h4>
            <img
              alt=''
              className='tst-a'
              src='/assets/images/undraw_doctor_kw5l2.svg'
            />
            <div className='profiles-wrapper no-profiles'>
              <BTStatusCard literals={literals} />
            </div>
            <h3>{literals.mainTitle}</h3>
            <h5>{literals.test1.description}</h5>
            <div className='btn-start-test'>
              <Button
                // href='/form-test'
                onClick={goToTest}
                label={literals.test1.buttonStartTest}
              />
            </div>
            {/* <p>{literals.test1.hint}</p> */}
          </div>
        </div>
      </div>
    </section>
  );
};

StartTest.propTypes = {
  literals: PropTypes.object.isRequired,
  onShowModalLangs: PropTypes.func.isRequired,
};

export default StartTest;
