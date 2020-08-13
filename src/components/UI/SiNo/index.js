/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const SiNo = ({
  name, onChange, required, value, onlyYes,
}) => {
  const literals = useSelector(state => state.i18n.literals.general);

  const final = value === null
    ? value
    : typeof value === 'string'
      ? value
      : value
        ? 'yes'
        : 'no';

  useEffect(() => {
    if (final !== value) {
      onChange(final);
    }
  }, [final, value, onChange]);

  const handleOnChange = (ev) => {
    const val = ev.target.value;
    onChange(val);
  };

  return (
    <div className='si-no'>
      <input
        id={`yes-${name}`}
        type='radio'
        onChange={handleOnChange}
        name={name}
        value='yes'
        checked={final === 'yes'}
        required={required}
      />
      <label className='positive' htmlFor={`yes-${name}`}>
        {literals.yes}
      </label>
      {!onlyYes && (
        <React.Fragment>
          <input
            id={`no-${name}`}
            onChange={handleOnChange}
            type='radio'
            name={name}
            checked={final === 'no'}
            value='no'
            required={required}
          />
          <label htmlFor={`no-${name}`}>{literals.no}</label>
        </React.Fragment>
      )}
    </div>
  );
};

SiNo.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  onlyYes: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

SiNo.defaultProps = {
  onChange: () => {},
  required: false,
  value: null,
  onlyYes: false,
};
export default SiNo;
