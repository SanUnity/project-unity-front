import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * @name Checkbox
 *
 * @param {string} name
 * @param {string} label
 * @param {bool} value
 * @param {func} onChange
 *
 * @returns {JSX}
 */
const Checkbox = ({
  label,
  name,
  value,
  LabelComponent,
  onChange,
}) => {
  const [stateValue, setStateValue] = useState(false);
  return (
    <label className='form-check-label' onClick={onChange}>
      {label}
      {LabelComponent && <LabelComponent />}
      <input
        className='form-check-input'
        type='checkbox'
        name={name}
        checked={value || stateValue}
        onChange={(ev) => {
          onChange(ev);
          setStateValue(ev.target.checked);
        }}
      />
      <span className='checkmark' />
    </label>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.bool,
  LabelComponent: PropTypes.func,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  name: null,
  label: null,
  value: false,
  onChange: () => {},
  LabelComponent: null,
};

export default Checkbox;
