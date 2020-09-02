/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sessionService } from 'redux-react-session';

import apiFetch from 'utils/apiFetch';
import { API_URLS } from 'constants/apiConf';
import SearchBar from 'components/UI/SearchBar';
// import SelectInput from 'components/SelectInput';
import { /* parseDistance, */clearString } from 'utils';
import history from 'store/history';
// import Modal from 'components/UI/Modal';
import WideToggle from 'components/UI/WideToggle';
import Checkbox from 'components/UI/Checkbox';
import StatesPolygons from 'constants/ESTADOS-MX.json';


import FavoriteStar from 'routes/MainPage/icons/FavoriteStar';
import Map from './Map';
import List from './List';

import './styles.css';
import './List/styles.css';
import './Map/styles.css';

const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const MEXICO_LAT = 23.6345005;
const MEXICO_LNG = -102.5527878;

/**
 * @name TestingCenters
 *
 * @param {Object} literals
 *
 * @returns {JSX}
 */

class Municipalities extends Component {
  static propTypes = {
    literals: PropTypes.object.isRequired,
    showLoading: PropTypes.func.isRequired,
    saveLocation: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    favorites: PropTypes.array.isRequired,
  };

  mapRef = null;

  constructor(props) {
    super(props);
    const { location: { municipalities = {} } } = props;

    this.state = {
      term: '',
      currentActiveTabIndex: 2,
      itemIndexToRenderInModal: 0,
      modalActive: false,
      modalFiltersActive: false,
      clientLat: '', // default to Mexico
      clientLng: '', // default to Mexico
      zoom: 13,
      stateSelected: '',
      levelSelected: {
        high: true,
        low: true,
        medium: true,
        'very-high': true,
      },
      pcDetected: '',
      hospitals: [],
      states: [],
      hospitalsFiltered: [],
      savingFavorite: false,
      ...municipalities,
    };
    this.overlayMiddlewareRef = React.createRef();
  }

  componentDidMount() {
    // client navigates back via browser to close modal
    window.addEventListener('popstate', this.closeModalWrapper);
    this.fetchStates();
    const { showLoading } = this.props;
    showLoading(true);

    // load google maps script
    if (!document.getElementById('googleScript')) {
      const googleScript = document.createElement('script');

      googleScript.setAttribute('id', 'googleScript');
      googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places,geometry`;
      document.body.appendChild(googleScript);

      googleScript.addEventListener('load', this.loadMap);
    } else {
      const { location: { municipalities = {} } } = this.props;

      if (!Object.keys(municipalities).length) {
        this.loadMap();
      } else {
        showLoading(false);
        this.initNearbySearch();
        this.drawMap();
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      // stateSelected,
      levelSelected,
      // pcDetected,
      hospitals,
    } = this.state;

    /* if (stateSelected !== prevState.stateSelected) {
      if (stateSelected) {
        this.fetchStateData(stateSelected);
      } else {
        // eslint-disable-next-line
        this.setState({ hospitals: [] });
      }
    }

    if (pcDetected !== prevState.pcDetected) {
      this.fetchInfoWithPc(pcDetected);
    } */

    if (hospitals !== prevState.hospitals) {
      this.createPolygonsData();
    }

    if (levelSelected !== prevState.levelSelected) {
      this.createPolygonsData();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.closeModalWrapper);
    // window.removeEventListener('keydown', this.closeModalWrapper);

    const { saveLocation } = this.props;
    const {
      states,
      pcDetected,
      clientLat,
      clientLng,
      hospitals,
      hospitalsFiltered,
      stateSelected,
      term,
    } = this.state;
    saveLocation({
      municipalities: {
        states,
        pcDetected,
        clientLat,
        clientLng,
        hospitals,
        hospitalsFiltered,
        stateSelected,
        term,
      },
    });
    history.goForward();
  }

  closeModalWrapper = () => {
    const { modalActive, modalFiltersActive } = this.state;

    if (modalActive || modalFiltersActive) {
      this.closeModal();
      this.closeModalFilters();
    } else {
      /* istanbul ignore next */
      history.goBack();
    }
  };

  createPolygonsData = () => {
    const { favorites } = this.props;
    const {
      term,
      hospitals,
      // stateSelected,
      // states,
      levelSelected,
    } = this.state;

    const filtersLevelActive = Object.keys(levelSelected).filter(level => levelSelected[level] === true);
    const hospitalsFilteredByTerm = hospitals.filter(({ properties: { entidad_nombre: name } }) => name && clearString(name.trim().toUpperCase()).search(clearString(term.toUpperCase())) !== -1);
    const hospitalsFilteredByLevel = hospitalsFilteredByTerm.filter(h => filtersLevelActive.indexOf(h.data.status) >= 0);
    // const currentState = states.find(state => parseInt(state.id, 10) === parseInt(stateSelected, 10)) || { title: '' };
    const hospitalsFiltered = [];

    hospitalsFilteredByLevel.map((hospital) => {
      hospital.data.favorite = (favorites.indexOf(hospital.data.id) >= 0);
      hospitalsFiltered.push(hospital);
      return 0;
    });

    this.setState({ hospitalsFiltered }, () => {
      this.mapComponent.drawMarkers(true);
    });
  }

  fetchStates = () => {
    try {
      apiFetch({
        method: 'GET',
        url: `${API_URLS.states}`,
      }).then((data) => {
        const states = [];
        data.map((state) => {
          state.value = state.id;
          states.push({
            id: state.cveID,
            title: state.name,
            value: state.cveID,
          });
          return state;
        });
        this.setState({ states });
      });
    // eslint-disable-next-line no-empty
    } catch (err) {}
  }

  fetchStatesData = async () => {
    const data = StatesPolygons.features;

    const { showLoading } = this.props;
    showLoading(true);

    try {
      const statesInfo = await apiFetch({
        method: 'GET',
        url: API_URLS.statesInfo,
      });
      showLoading(false);

      const hospitals = statesInfo.map((state) => {
        let statePolygon = data.find(d => d.properties.entidad_cvegeo === state.id);

        if (typeof statePolygon !== 'undefined') {
          statePolygon.data = state;
        } else {
          statePolygon = null;
        }

        return statePolygon;
      }).filter(m => m !== null);

      this.setState({ hospitals });
    // eslint-disable-next-line no-empty
    } catch (err) {} finally {
      showLoading(false);
    }
  }

  loadMap = async () => {
    this.drawMap();
    this.fetchStatesData();
  };

  openModal = (hospitalID) => {
    this.setState({
      currentActiveTabIndex: 1,
      modalActive: true,
      itemIndexToRenderInModal: hospitalID,
    },
    () => {
      window.history.pushState({}, 'Modal', '');
    });
  };

  showModalFilters = () => {
    this.setState({
      modalFiltersActive: true,
    },
    () => {
      window.history.pushState({}, 'Modal', '');
    });
  };

  closeModal = () => {
    this.setState({ modalActive: false });
  };

  closeModalFilters = () => {
    this.setState({ modalFiltersActive: false });
  };

  getLatLonCenterFromGeom = (coords) => {
    const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

    const centerLat = arrAvg(coords.map(c => (typeof c[1] === 'number' ? c[1] : 0)).filter(c => c !== 0));
    const centerLon = arrAvg(coords.map(c => (typeof c[0] === 'number' ? c[0] : 0)).filter(c => c !== 0));

    // eslint-disable-next-line
    if (isNaN(centerLat) || isNaN(centerLon)) return null;
    return { latitude: centerLat, longitude: centerLon };
  }

  handleFavorite = (itemId) => {
    const {
      hospitalsFiltered: allStates,
      savingFavorite,
    } = this.state;

    if (savingFavorite) return;

    this.setState({
      savingFavorite: true,
    }, () => {
      const state = allStates.find(s => s.data.id === itemId);
      const stateIndex = allStates.indexOf(state);

      allStates[stateIndex].data.favorite = !allStates[stateIndex].data.favorite;
      let fav = allStates.filter(it => it.data.favorite);
      fav = fav.map(f => f.data.id);

      apiFetch({
        method: 'POST',
        url: API_URLS.userFavoriteStates,
        params: { fav },
      }).then(async () => {
        const user = await sessionService.loadUser();
        user.semaphoreFav = fav;
        sessionService.saveUser(user);
        this.setState({
          hospitalsFiltered: allStates,
          savingFavorite: false,
        });
      });
    });
  }

  renderModal = () => {
    const {
      itemIndexToRenderInModal: itemId,
      hospitalsFiltered: allMunicipalities,
      savingFavorite,
    } = this.state;
    const { literals } = this.props;

    const municipalitySelected = allMunicipalities.find(s => s.data.id === itemId);

    if (municipalitySelected.geometry) {
      const coordinates = municipalitySelected.geometry.coordinates;
      const google = window.google;
      const array = [];
      coordinates.forEach((coordinate) => {
        coordinate.forEach((coord) => {
          if (typeof coord[0] !== 'number') {
            coord.forEach((co) => {
              array.push(co);
            });
          } else {
            array.push(coord);
          }
        });
      });

      const center = this.getLatLonCenterFromGeom(array);
      if (center) {
        const location = new google.maps.LatLng(
          parseFloat(center.latitude),
          parseFloat(center.longitude),
        );
        this.goToLocation(location);
      }
    }

    return (
      <React.Fragment>
        <div className='overlay open' />
        <div className='search-sec-text'>
          <div className='modal-hospital-details'>
            <div className='hos-head-txt'>
              <h4>{literals.state}</h4>
              <p
                onClick={() => {
                  this.closeModal();
                }}
              >
                {literals.close}
              </p>
            </div>
            <p className='hos-name'>
              {/* municipalitySelected.hospital */}
            </p>
            <div className='hos-det_sec'>
              <div className='hos_det_l'>
                <p>{municipalitySelected.properties.entidad_nombre}</p>
              </div>
              <span className={`favorite-wrapper ${savingFavorite ? 'saving-favorite' : ''} ${municipalitySelected.data.favorite ? 'is-favorite' : ''}`} onClick={() => this.handleFavorite(itemId)}>
                <FavoriteStar className='favorite-icon' />
                <span className='txt-favorite'>{literals.favorite}</span>
                <span className='txt-make-favorite'>{literals.markAsFavorite}</span>
                <span className='txt-saving-favorite'>{literals.savingFavorite}</span>
              </span>
            </div>
            <div className='hop-in-bdr-de municipality-details-data'>
              <div className='hos-lo-s'>
                <div className=''>
                  <div className='block-wrapper'>
                    <p className='status-title'>{literals.status}</p>
                    <p className='status-txt'>{literals.statusTxt[municipalitySelected.data.status]}</p>
                    <ul className={`status-bar-list status-color-${municipalitySelected.data.status}`}>
                      <li />
                      <li />
                      <li />
                      <li />
                    </ul>
                  </div>
                </div>
                <div className=''>
                  <div className='block-wrapper'>
                    <p className='cases-title'>{literals.cases}</p>
                    <ul className='cases-total-list'>
                      <li>
                        <span className='cases-type-title'>
                          <img src='/assets/images/check_small.svg' alt='' />
                          {literals.confirmed}
                        </span>
                        <span className='cases-type-number'>{municipalitySelected.data.cases.confirm}</span>
                      </li>
                      <li>
                        <span className='cases-type-title'>
                          <img src='/assets/images/eye.svg' alt='' />
                          {literals.suspicious}
                        </span>
                        <span className='cases-type-number'>{municipalitySelected.data.cases.suspicious}</span>
                      </li>
                      <li>
                        <span className='cases-type-title'>
                          <img src='/assets/images/eye.svg' alt='' />
                          {literals.negative}
                        </span>
                        <span className='cases-type-number'>{municipalitySelected.data.cases.negative}</span>
                      </li>
                      <li>
                        <span className='cases-type-title'>
                          <img src='/assets/images/skull.svg' alt='' />
                          {literals.death}
                        </span>
                        <span className='cases-type-number'>{municipalitySelected.data.cases.death}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  drawMap = async () => {
    const google = window.google;
    if (google && !this.mapRef) {
      this.initNearbySearch();
    }
  };

  initNearbySearch = () => {
    const google = window.google;
    const center = new google.maps.LatLng(MEXICO_LAT, MEXICO_LNG);
    const mapZoom = 6;

    const map = new google.maps.Map(document.getElementById('map'), {
      center,
      zoom: mapZoom,
      disableDefaultUI: true,
      styles: [
        {
          featureType: 'poi',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
      ],
    });

    this.mapRef = map;
  };

  goToLocation = (location) => {
    this.mapRef.setCenter(location);
    this.mapRef.setZoom(8);
  };

  handleCheckboxChange = ({ target: { name, checked } }) => {
    const { levelSelected } = this.state;

    this.setState({
      levelSelected: {
        ...levelSelected,
        [name]: checked,
      },
    });
  }

  render() {
    const {
      literals,
    } = this.props;
    const {
      currentActiveTabIndex,
      modalActive,
      modalFiltersActive,
      zoom,
      hospitalsFiltered,
      levelSelected,
    } = this.state;

    const searchComponentFilters = Object.values(literals.filters).map(
      (item) => {
        return item.title;
      },
    );
    return (
      <section className='map-a map-be map-hospitals'>
        <div id='overlayMiddleware' onClick={() => this.closeModal()} />

        <WideToggle
          title={literals.title}
          firstLabel={literals.tabLabelFirst}
          secondLabel={literals.tabLabelSecond}
          activeLabelIndex={currentActiveTabIndex}
          labelClicked={index => this.setState({ currentActiveTabIndex: index })
          }
        />

        <div className={`view-content-wrapper ${currentActiveTabIndex === 1 ? 'map-active' : ''}`}>
          <SearchBar
            initialValue=''
            placeholder={literals.search}
            onChange={(newTerm) => {
              this.setState({ term: newTerm }, () => {
                this.createPolygonsData();
              });
            }}
            onShowFilters={this.showModalFilters}
            searchInitiated={this.searchInitiated}
            filters={searchComponentFilters}
            filterSelected={this.filterSelected}
            itemSelected={this.itemSelected}
          />
          <div
            className='map'
            style={{ display: currentActiveTabIndex === 1 ? 'block' : 'none' }}
          >
            <Map
              literals={literals}
              locationsToDisplay={hospitalsFiltered}
              zoom={zoom}
              ref={(mapComponent) => {
                if (mapComponent) {
                  if (!this.mapComponent) {
                    mapComponent.drawMarkers();
                  }
                  this.mapComponent = mapComponent;
                }
              }}
              mapRef={this.mapRef}
              onMarkerClick={index => this.openModal(index, 1)}
            />
          </div>
          <div
            className='list'
            style={{
              display: currentActiveTabIndex === 2 ? 'block' : 'none',
              width: '100%',
            }}
          >
            <List
              literals={literals}
              listItems={hospitalsFiltered}
              itemSelected={index => this.openModal(index, 2)}
            />
          </div>
        </div>
        {modalActive && this.renderModal()}

        {modalFiltersActive && (
          <React.Fragment>
            <div className='overlay open' />
            <div className='search-sec-text'>
              <div className='modal-hospital-details'>
                <div className='hos-head-txt'>
                  <h4>{literals.filterBy}</h4>
                  <p
                    onClick={() => {
                      this.closeModalFilters();
                    }}
                  >
                    {literals.close}
                  </p>
                </div>
              </div>
              <div className='filters-wwrapper'>
                <div className='form-input-fields-container'>
                  <div className='filter-type-wrapper'>
                    <p>{literals.filterStates}</p>
                    <ul className='filter-type-list'>
                      <li>
                        <span className='filter-type-title'>
                          <span className='filter-type-color color-very-high' />
                          {literals.maximum}
                        </span>
                        <span className='filter-type-check'>
                          <Checkbox
                            className='form-group'
                            name='very-high'
                            value={levelSelected['very-high']}
                            onChange={this.handleCheckboxChange}
                          />
                        </span>
                      </li>
                      <li>
                        <span className='filter-type-title'>
                          <span className='filter-type-color color-high' />
                          {literals.high}
                        </span>
                        <span className='filter-type-check'>
                          <Checkbox
                            className='form-group'
                            name='high'
                            value={levelSelected.high}
                            onChange={this.handleCheckboxChange}
                          />
                        </span>
                      </li>
                      <li>
                        <span className='filter-type-title'>
                          <span className='filter-type-color color-medium' />
                          {literals.intermediate}
                        </span>
                        <span className='filter-type-check'>
                          <Checkbox
                            className='form-group'
                            name='medium'
                            value={levelSelected.medium}
                            onChange={this.handleCheckboxChange}
                          />
                        </span>
                      </li>
                      <li>
                        <span className='filter-type-title'>
                          <span className='filter-type-color color-low' />
                          {literals.low}
                        </span>
                        <span className='filter-type-check'>
                          <Checkbox
                            className='form-group'
                            name='low'
                            value={levelSelected.low}
                            onChange={this.handleCheckboxChange}
                          />
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}

      </section>
    );
  }
}

export default Municipalities;
