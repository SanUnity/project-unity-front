import React from 'react';
import PropTypes from 'prop-types';

const Loading = (props) => {
  const { hide } = props;
  return (
    <div className={hide ? 'container--loading hidden' : 'container--loading'}>
      <div className='loader' />
    </div>
  );
};

Loading.propTypes = {
  hide: PropTypes.bool,
};

Loading.defaultProps = {
  hide: true,
};

export default Loading;
