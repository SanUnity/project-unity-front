import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Toggle extends Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired,
  };


  render() {
    const { checked, callback } = this.props;
    return (
      <div className='sw-th'>
        <label className='switch'>
          <input
            checked={checked}
            onChange={() => callback && callback()}
            type='checkbox'
            className='default'
          />
          <span className='slider round' />
        </label>
      </div>
    );
  }
}

export default Toggle;
