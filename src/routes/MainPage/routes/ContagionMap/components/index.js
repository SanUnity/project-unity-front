import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Map from './Map';

/**
 * @name ContagionMap
 *
 * @param {Object} literals
 *
 * @returns {JSX}
 */
class ContagionMap extends Component {
  static propTypes = {
    literals: PropTypes.object.isRequired,
  };

  render() {
    const { literals } = this.props;

    return (
      <section className='map-a map-contagios map-be '>
        <div className='sdf'>
          <h4 className='info-m'>{literals.title}</h4>
        </div>
        <div className='tab-content'>
          <Map />
        </div>
      </section>
    );
  }
}

export default ContagionMap;
