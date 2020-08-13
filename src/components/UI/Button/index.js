import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
/**
 * @name Button
 *
 * @param {string}  label
 * @param {string}  href
 * @param {func} onClick
 * @param {bool} disabled
 *
 * @returns {JSX}
 */
const Button = ({
  label, href, onClick, disabled,
}) => {
  return (
    href
      ? (
        <Link to={href} className='btn btn-primary btn-clr-chng btn-clr-toda-d btn-clr-chng-d btn-test-bb-chng'>
          {label}
        </Link>
      ) : <button type='button' onClick={onClick} disabled={disabled} className='btn btn-primary btn-clr-chng btn-clr-toda-d btn-test-bb-chng'>{label}</button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  href: null,
  onClick: null,
  disabled: false,
};

export default Button;
