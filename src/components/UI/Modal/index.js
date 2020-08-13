import React from 'react';
import PropTypes from 'prop-types';

/**
 * @name Modal
 *
 * @param {func} content
 *
 * @returns {JSX}
 */

const Modal = (
  {
    content: Content,
  },
) => {
  return (
    <div className='search-sec-text'>
      <Content />
    </div>
  );
};

Modal.propTypes = {
  content: PropTypes.func.isRequired,
};

export default Modal;
