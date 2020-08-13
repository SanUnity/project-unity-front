/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * @name Input
 *
 * @param {string} label
 * @param {string} name
 * @param {string} type
 * @param {string} id
 * @param {string} placeholder
 * @param {func} onChange
 * @param {func} onKeyUp
 * @param {number} max
 * @param {number} maxLength
 * @param {number} minLength
 * @param {number, string, bool} value
 * @param {string} error
 * @param {boolean} required
 * @returns {JSX}
 */

const Input = ({
  label,
  name,
  type,
  id,
  placeholder,
  onChange,
  onKeyUp,
  max,
  value,
  maxLength,
  minLength,
  required,
  disabled,
  error,
  onlyLetters,
}) => {
  const [stateValue, setStateValue] = useState('');
  return (
    <div className={`border-d${error ? ' error' : ''}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type || 'text'}
        inputMode={type === 'number' ? 'numeric' : 'false'}
        pattern={type === 'number' ? '[0-9]*' : 'false'}
        onChange={(e) => {
          const val = e.target.value.charCodeAt(e.target.value.length - 1);

          if (onlyLetters && (!maxLength || e.target.value.length <= maxLength)
            && ((val >= 65 && val <= 90)
              || (val >= 97 && val <= 122)
              || (val >= 128 && val <= 154 && val !== 145 && val !== 146)
              || (val >= 160 && val <= 165)
              || ([32, 225, 233, 237, 243, 250, 241].indexOf(val) !== -1)
              || isNaN(val)
            )
          ) {
            onChange(e);
            setStateValue(e.target.value);
          } else if (!onlyLetters && (!maxLength || e.target.value.length <= maxLength)) {
            onChange(e);
            setStateValue(e.target.value);
          }
        }}
        onKeyUp={e => onKeyUp && onKeyUp(e)}
        id={id}
        className='form-control'
        placeholder={placeholder}
        {...(name && { name })}
        max={max}
        value={value || stateValue}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  max: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ]),
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  error: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  name: '',
  label: '',
  placeholder: '',
  onChange: () => {},
  onKeyUp: null,
  id: '',
  max: null,
  value: undefined,
  maxLength: null,
  minLength: null,
  type: 'text',
  required: false,
  disabled: false,
  error: '',
};

export default Input;
