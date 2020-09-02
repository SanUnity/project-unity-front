/* eslint-disable no-loop-func */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  levelLow,
  levelMedium,
  levelHigh,
  levelVeryHigh,
} from 'constants/colors';

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

  polygons = [];

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

  clearPolygons = () => {
    for (let i = 0; i < this.polygons.length; i += 1) {
      this.polygons[i].setMap(null);
    }

    this.polygons = [];
  };

  setMapOnAll = (map) => {
    for (let i = 0; i < this.markers.length; i += 1) {
      this.markers[i].setMap(map);
    }
  };

  goToLocation = (location) => {
    const { mapRef } = this.props;
    mapRef.setCenter(location);
    mapRef.setZoom(10);
  };

  getLatLonCenterFromGeom = (coords) => {
    const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

    const centerLat = arrAvg(coords.map(c => (typeof c[1] === 'number' ? c[1] : 0)).filter(c => c !== 0));
    const centerLon = arrAvg(coords.map(c => (typeof c[0] === 'number' ? c[0] : 0)).filter(c => c !== 0));

    // eslint-disable-next-line
    if (isNaN(centerLat) || isNaN(centerLon)) return null;
    return { latitude: centerLat, longitude: centerLon };
  }

  getColorByState = (color) => {
    switch (color) {
      case 'low': return levelLow;
      case 'medium': return levelMedium;
      case 'high': return levelHigh;
      case 'very-high': return levelVeryHigh;

      default: return '#000';
    }
  }

  addPolygonToMap = ({ array, color, itemId }) => {
    const google = window.google;
    const { mapRef } = this.props;

    const polygon = new google.maps.Polygon({
      paths: array,
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.35,
    });

    this.polygons.push(polygon);
    polygon.setMap(mapRef);

    this.listeners.push(google.maps.event.addListener(polygon, 'click', () => {
      const { onMarkerClick } = this.props;
      onMarkerClick(itemId);
    }));
  }

  drawMarkers = () => {
    const google = window.google;
    const { locationsToDisplay, mapRef } = this.props;

    if (!mapRef) return;

    const municipalitiesArray = locationsToDisplay; /* .filter(l => l.covid && l.geometry.location); */

    this.clearPolygons();
    if (!municipalitiesArray.length) return;

    // mapRef.setZoom(10);

    let arr = [];
    const arrGlobal = [];
    const bounds = new google.maps.LatLngBounds();

    municipalitiesArray.forEach((municipality) => {
      arr = [];

      if (municipality.geometry) {
        const coordinates = municipality.geometry.coordinates;
        const color = this.getColorByState(municipality.data.status);

        coordinates.forEach((coordinate) => {
          coordinate.forEach((coord) => {
            if (typeof coord[0] !== 'number') {
              const newArray = [];
              coord.forEach((co) => {
                const c = new google.maps.LatLng(
                  parseFloat(co[1]),
                  parseFloat(co[0]),
                );
                newArray.push(c);
                arrGlobal.push(co);
              });

              if (newArray.length) bounds.extend(newArray[newArray.length - 1]);
              this.addPolygonToMap({ array: newArray, color, itemId: municipality.data.id });
            } else {
              const c = new google.maps.LatLng(
                parseFloat(coord[1]),
                parseFloat(coord[0]),
              );
              arr.push(c);
              arrGlobal.push(coord);
            }
          });
          if (arr.length) bounds.extend(arr[arr.length - 1]);
        });

        this.addPolygonToMap({ array: arr, color, itemId: municipality.data.id });
      }
    });

    const center = this.getLatLonCenterFromGeom(arrGlobal);

    if (center) {
      const polygonsCenter = new google.maps.LatLng(
        parseFloat(center.latitude),
        parseFloat(center.longitude),
      );
      mapRef.setCenter(polygonsCenter);
      mapRef.setZoom(6);
    }

    /* console.info({ bounds });

    mapRef.fitBounds(bounds);

    const zoomChangeBoundsListener = google.maps.event.addListenerOnce(mapRef, 'bounds_changed', () => {
      if (recenter && municipalitiesArray.length > 0) {
        mapRef.setCenter(lastLocation);
      }
      mapRef.setZoom(8);
    });

    setTimeout(() => { google.maps.event.removeListener(zoomChangeBoundsListener); }, 2000); */
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
