import React from 'react';
import PropTypes from 'prop-types';

/**
 * @name ComponentHeader
 *
 * @param {string}  title
 * @param {string}  leftIconSrc
 * @param {func}  leftIconClicked
 *
 * @returns {JSX}
 */

const ComponentHeader = ({ title, leftIconSrc, leftIconClicked }) => {
  return (
    <div className='crs-txt arw-txt'>
      <img
        className='tst-abb tst-a'
        src={leftIconSrc}
        alt=''
        onClick={() => leftIconClicked && leftIconClicked()}
      />
      <h4>{title}</h4>
    </div>
  );
};

ComponentHeader.propTypes = {
  title: PropTypes.any.isRequired,
  leftIconSrc: PropTypes.string.isRequired,
  leftIconClicked: PropTypes.func,
};

ComponentHeader.defaultProps = {
  leftIconClicked: null,
};

export default ComponentHeader;
