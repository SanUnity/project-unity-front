import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @name Map
 *
 * @param {Object} literals
 * @param {number} clientLat
 * @param {number} clientLng
 * @param {number} zoom
 * @param {array} locationsToDisplay
 * @param {object} mapRef
 *
 * @param {func} drawMap
 *
 * @returns {JSX}
 */

class Map extends Component {
  markers = [];

  listeners = [];

  componentWillUnmount() {
    const google = window.google;

    this.listeners.forEach((listener) => {
      google.maps.event.removeListener(listener);
    });
  }

  createMarker = (place) => {
    const { mapRef } = this.props;
    const google = window.google;

    let icon = '';

    switch (place.level) {
      case 1: icon = `/assets/images/pin-green${place.covid ? '-covid' : ''}.svg`; break;
      case 2: icon = `/assets/images/pin-yellow${place.covid ? '-covid' : ''}.svg`; break;
      case 3: icon = `/assets/images/pin-red${place.covid ? '-covid' : ''}.svg`; break;
      default:
        icon = '/assets/images/pin.svg';
    }

    const marker = new google.maps.Marker({
      icon,
      map: mapRef,
      position: place.geometry.location,
    });

    this.markers.push(marker);

    this.listeners.push(google.maps.event.addListener(marker, 'click', () => {
      const { onMarkerClick } = this.props;
      onMarkerClick(place.hospitalID);
    }));
  };

  clearMarkers = () => {
    this.setMapOnAll(null);
  };

  setMapOnAll = (map) => {
    for (let i = 0; i < this.markers.length; i += 1) {
      this.markers[i].setMap(map);
    }
  };

  goToLocation = (location) => {
    const { mapRef } = this.params;
    mapRef.setCenter(location);
    mapRef.setZoom(17);
  };

  drawMarkers = (recenter) => {
    const { locationsToDisplay, mapRef } = this.props;
    const covidHospitals = locationsToDisplay; /* .filter(l => l.covid && l.geometry.location); */

    this.clearMarkers();
    if (!covidHospitals.length) return;
    if (!mapRef) return;

    mapRef.setZoom(13);

    covidHospitals.forEach((hospital) => {
      this.createMarker(hospital);
    });

    if (recenter && covidHospitals.length > 0) {
      mapRef.setCenter(covidHospitals[0].geometry.location);
    }
  };

  render() {
    return (
      <div
        id='map-sec'
        className='tab-pane active'
        style={{ position: 'relative' }}
      >
        <div id='map' />
      </div>
    );
  }
}

Map.propTypes = {
  onMarkerClick: PropTypes.func,
  locationsToDisplay: PropTypes.array,
  mapRef: PropTypes.object,
};

Map.defaultProps = {
  onMarkerClick: () => {},
  locationsToDisplay: [],
  mapRef: null,
};

export default Map;
