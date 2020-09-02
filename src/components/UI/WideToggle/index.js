import React from 'react';
import PropTypes from 'prop-types';

/**
 * @name WideToggle
 *
 * @param {string}  title
 * @param {string}  firstLabel
 * @param {string}  secondLabel
 * @param {number}  activeLabelIndex
 * @param {func}  labelClicked
 *
 * @returns {JSX}
 */

const WideToggle = ({
  title,
  firstLabel,
  secondLabel,
  thirdLabel,
  activeLabelIndex,
  labelClicked,
  showArrowBack,
  showProfile,
  goBack,
  goProfile,
  showTabs,
}) => {
  return (
    <div className='sdf'>
      <div className='header-toggle'>
        {showArrowBack && (
          <img
            className='tst-abb tst-a'
            src='/assets/images/green-arrow.svg'
            style={{ marginBottom: '0.5rem' }}
            alt=''
            onClick={goBack}
          />
        )}
        <h4 className='info-m'>{title}</h4>
        {showProfile && (
          <img
            className='tst-abb tst-a'
            src='/assets/images/profile.svg'
            style={{ marginBottom: '0.5rem' }}
            alt=''
            onClick={goProfile}
          />
        )}
      </div>
      {showTabs && (
        <ul className='nav nav-pills' role='tablist'>
          <li className='nav-item'>
            <span
              className={`nav-link${activeLabelIndex === 1 ? ' active' : ''}`}
              data-toggle='pill'
              onClick={() => labelClicked(1)}
            >
              {firstLabel}
            </span>
          </li>
          <li className='nav-item'>
            <span
              className={`nav-link${activeLabelIndex === 2 ? ' active' : ''}`}
              data-toggle='pill'
              onClick={() => labelClicked(2)}
            >
              {secondLabel}
            </span>
          </li>
          {thirdLabel !== '' && (
            <li className='nav-item'>
              <span
                className={`nav-link${activeLabelIndex === 3 ? ' active' : ''}`}
                data-toggle='pill'
                onClick={() => labelClicked(3)}
              >
                {thirdLabel}
              </span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

WideToggle.propTypes = {
  title: PropTypes.string.isRequired,
  firstLabel: PropTypes.string.isRequired,
  secondLabel: PropTypes.string.isRequired,
  thirdLabel: PropTypes.string,
  activeLabelIndex: PropTypes.number.isRequired,
  labelClicked: PropTypes.func.isRequired,
  showArrowBack: PropTypes.bool,
  showProfile: PropTypes.bool,
  goBack: PropTypes.func,
  goProfile: PropTypes.func,
  showTabs: PropTypes.bool,
};
WideToggle.defaultProps = {
  thirdLabel: '',
  showArrowBack: false,
  showProfile: false,
  goBack: () => {},
  goProfile: () => {},
  showTabs: true,
};

export default WideToggle;
