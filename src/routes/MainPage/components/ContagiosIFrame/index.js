import React from 'react';
import { useSelector } from 'react-redux';

export const ContagiosIFrame = () => {
  const showMap = useSelector(state => state.showContagiosMap);
  return (
    <div className={`contagious-map-container${!showMap ? ' hidden' : ''}`}>
      {/* <iframe
        title='contagionMap'
        src='https://www.google.com/maps/d/embed?mid=1-XnTNpU7R4XiVewJh_nwcpUrtGgd4gwu&z=5'
        width='100%'
        frameBorder='0'
        style={{ border: 0 }}
        aria-hidden='false'
        allowFullScreen
      /> */}
    </div>
  );
};
