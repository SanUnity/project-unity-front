import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectInput extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    error: PropTypes.string,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    error: '',
    value: '',
    placeholder: '',
    disabled: false,
  };

  render() {
    const {
      label,
      options,
      disabled,
      onChange,
      name,
      error,
      value,
      placeholder,
    } = this.props;
    return (
      <div className={`a-select border-d${error ? ' error' : ''}`}>
        <label htmlFor='sel1'>{label}</label>
        <select
          id={`select-${name}`}
          name={name}
          value={value}
          disabled={disabled}
          onChange={event => onChange(event)}
          className={value !== '' ? 'not-empty' : 'is-empty'}
          style={{ color: value !== '' ? 'black' : '#495057' }}
        >
          <option value='' disabled hidden>
            {placeholder}
          </option>
          {options.map((option) => {
            return (
              <option key={option.id} value={option.value}>
                {option.title}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default SelectInput;
