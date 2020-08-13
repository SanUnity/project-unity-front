/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Question extends Component {
  static propTypes = {
    label: PropTypes.string,
    subLabel: PropTypes.string,
    component: PropTypes.any,
    onChange: PropTypes.func,
    error: PropTypes.string,
  };

  static defaultProps = {
    onChange: () => {},
  };

  render() {
    const {
      label,
      subLabel,
      component: Comp,
      onChange,
      error,
      ...rest
    } = this.props;

    return (
      <div className={`form-question${error ? ' form-question--error' : ''}`}>
        <div className='form-question__text'>
          <p>{label}</p>
          <p>
            <small>{subLabel}</small>
          </p>
        </div>
        <div className='form-question__control'>
          <Comp {...rest} onChange={onChange} />
        </div>
      </div>
    );
  }
}

export default Question;
