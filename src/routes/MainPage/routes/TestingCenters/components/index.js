/* eslint-disable no-empty */
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sessionService } from 'redux-react-session';

import apiFetch from 'utils/apiFetch';
import { API_URLS } from 'constants/apiConf';
import SearchBar from 'components/UI/SearchBar';
import SelectInput from 'components/SelectInput';
import { /* parseDistance, */clearString } from 'utils';
import history from 'store/history';
// import Modal from 'components/UI/Modal';
import WideToggle from 'components/UI/WideToggle';
import Map from './Map';
import List from './List';

const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const MEXICO_LAT = 19.3467007;
const MEXICO_LNG = -99.1617432;

/**
 * @name TestingCenters
 *
 * @param {Object} literals
 *
 * @returns {JSX}
 */

class TestingCenters extends Component {
  static propTypes = {
    literals: PropTypes.object.isRequired,
    showLoading: PropTypes.func.isRequired,
    saveLocation: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  mapRef = null;

  constructor(props) {
    super(props);
    const { location: { testingCenters = {} } } = props;
    this.state = {
      term: '',
      currentActiveTabIndex: 1,
      itemIndexToRenderInModal: 0,
      listItems: [],
      modalActive: false,
      clientLat: '', // default to Mexico
      clientLng: '', // default to Mexico
      zoom: 13,
      stateSelected: '',
      municipalitySelected: '',
      levelSelected: props.match.params.levelType ? props.match.params.levelType : 0,
      pcDetected: '',
      hospitals: [],
      hospitalsSearch: [],
      states: [],
      municipalities: [],
      hospitalsFiltered: [],
      ...testingCenters,
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
      const { location: { testingCenters = {} } } = this.props;

      if (!Object.keys(testingCenters).length) {
        this.loadMap();
      } else {
        showLoading(false);
        this.initNearbySearch();
        this.drawMap();
        setTimeout(() => this.mapComponent.drawMarkers(true), 200);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      municipalitySelected,
      stateSelected,
      levelSelected,
      pcDetected,
      hospitals,
    } = this.state;

    if (stateSelected !== prevState.stateSelected) {
      this.fetchMunicipalities(stateSelected);
    }

    if (municipalitySelected !== prevState.municipalitySelected) {
      if (municipalitySelected) {
        this.fetchHospitals(stateSelected, municipalitySelected);
      } else {
        // eslint-disable-next-line
        this.setState({ hospitals: [] });
      }
    }

    if (pcDetected !== prevState.pcDetected) {
      this.fetchInfoWithPc(pcDetected);
    }

    if (hospitals !== prevState.hospitals) {
      this.createHospitalsSearch();
    }

    if (levelSelected !== prevState.levelSelected) {
      this.createHospitalsSearch();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.closeModalWrapper);

    const { saveLocation } = this.props;
    const {
      listItems, clientLat, clientLng,
      hospitals,
      hospitalsSearch,
      states,
      municipalities,
      hospitalsFiltered,
      stateSelected,
      municipalitySelected,
      pcDetected,
      levelSelected,
    } = this.state;
    const term = this.term || '';
    if (!this.term) {
      saveLocation({
        testingCenters: {
          listItems,
          clientLat,
          clientLng,
          term,
          stateSelected,
          municipalitySelected,
          pcDetected,
          levelSelected,
          hospitals,
          hospitalsSearch,
          states,
          municipalities,
          hospitalsFiltered,
        },
      });
    }
    history.goForward();
  }


  closeModalWrapper = () => {
    const { modalActive } = this.state;

    if (modalActive) {
      this.closeModal();
    } else {
      history.goBack();
    }
  };

  createHospitalsSearch = () => {
    const {
      term,
      hospitals,
      clientLat,
      clientLng,
      levelSelected,
    } = this.state;
    const google = window.google;
    const res = hospitals.filter(x => x.suburb && clearString(x.suburb.trim().toUpperCase()).search(clearString(term.toUpperCase())) !== -1);
    let hospitalsSearch = [];
    let hospitalsFiltered = [];
    res.map((hospital) => {
      hospital.distance = '';
      /** clientLat & clientLng are never defined, thus this condition is never true */
      /* istanbul ignore next */
      if (google && clientLat && clientLng && hospital.location.lat && hospital.location.lon) {
        const myLatLng1 = new google.maps.LatLng({ lat: Number(clientLat), lng: Number(clientLng) });
        const myLatLng2 = new google.maps.LatLng({ lat: Number(hospital.location.lat), lng: Number(hospital.location.lon) });
        const res2 = Math.round(google.maps.geometry.spherical.computeDistanceBetween(
          myLatLng1,
          myLatLng2,
        ));
        // eslint-disable-next-line
        if (!isNaN(res2)) {
          hospital.distance = res2;
        }
      }
      if (hospital.location && hospital.location.lat && hospital.location.lon) {
        hospital.url = `https://www.google.com/maps/place/${Number(hospital.location.lat)},${Number(hospital.location.lon)}`;
        hospital.geometry = google ? { location: new google.maps.LatLng(hospital.location.lat, hospital.location.lon) } : { location: { lng: parseFloat(hospital.location.lon), lat: parseFloat(hospital.location.lat) } };
      } else {
        hospital.url = '';
        hospital.geometry = { location: false };
      }

      hospitalsSearch.push({
        title: hospital.hospital,
        hospital,
      });
      hospitalsFiltered.push(hospital);
      return 0;
    });

    switch (levelSelected.toString()) {
      case '1':
        hospitalsSearch = hospitalsSearch.filter(h => h.hospital.level === 1);
        hospitalsFiltered = hospitalsFiltered.filter(h => h.level === 1);
        break;
      case '2':
        hospitalsSearch = hospitalsSearch.filter(h => (h.hospital.level === 2 || h.hospital.level === 3));
        hospitalsFiltered = hospitalsFiltered.filter(h => (h.level === 2 || h.level === 3));
        break;
      case '3':
        hospitalsSearch = hospitalsSearch.filter(h => h.hospital.covid);
        hospitalsFiltered = hospitalsFiltered.filter(h => h.covid);
        break;
        /* istanbul ignore next */
      default: break;
    }

    this.setState({ hospitalsSearch, hospitalsFiltered }, () => {
      this.mapComponent.drawMarkers(true);
    });
  }

  fetchStates = async () => {
    try {
      const data = await apiFetch({
        method: 'GET',
        url: `${API_URLS.states}`,
      });
      const states = [];
      data.map((state) => {
        state.value = state.id;
        states.push({
          id: state.id,
          title: state.name,
          value: state.id,
        });
        return state;
      });
      this.setState({ states });
    } catch (error) {}
  }

  fetchMunicipalities = async (stateID) => {
    try {
      const data = await apiFetch({
        method: 'GET',
        url: `${API_URLS.statesMunicipalities(stateID)}`,
      });

      const municipalities = [];
      data.map((municipality) => {
        municipalities.push({
          id: municipality.id,
          title: municipality.name,
          value: municipality.id,
        });
        this.setState({ municipalities });
        return municipality;
      });
    } catch (error) {}
  }

  fetchHospitals = async (stateID, municipalityID) => {
    const { showLoading } = this.props;
    showLoading(true);
    try {
      const data = await apiFetch({
        method: 'GET',
        url: `${API_URLS.statesMunicipalitiesHospitals(stateID, municipalityID)}`,
      });

      showLoading(false);
      this.setState({ hospitals: data, hospitalsSearch: data });
    } catch (error) {
    } finally {
      showLoading(false);
    }
  }

  fetchInfoWithPc = async (pc) => {
    try {
      const data = await apiFetch({
        method: 'GET',
        url: `${API_URLS.postalCodes(pc)}`,
      });

      if (data.length) {
        this.setState({
          municipalitySelected: data[0].municipalityID,
          stateSelected: data[0].stateID,
        });
      }
    } catch (error) { }
  }

  loadMap = async () => {
    const { showLoading } = this.props;
    showLoading(true);

    const {
      profiles,
    } = await sessionService.loadUser();

    let userCp = '';

    try {
      if (profiles.length > 0 && profiles[0].postalCode) {
        userCp = profiles[0].postalCode;
      }
    } catch (error) { }

    this.setState({ pcDetected: userCp }, () => {
      this.drawMap();
      showLoading(false);
    });
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

  closeModal = () => {
    this.setState({ modalActive: false });
  };

  renderLevelDetails = (level, isCovid) => {
    const {
      literals,
    } = this.props;

    switch (level) {
      case 1: return (
        <span className='level firstLevel'>
          {literals.levelDetail1}
          {isCovid && (<span className='is-covid'>COVID</span>)}
          <small>{literals.levelDetail1Desc}</small>
        </span>);
      case 2: return (
        <span className='level secondLevel'>
          {literals.levelDetail2}
          {isCovid && (<span className='is-covid'>COVID</span>)}
          <small>{literals.levelDetail2Desc}</small>
        </span>);
      case 3: return (
        <span className='level thirdLevel'>
          {literals.levelDetail3}
          {isCovid && (<span className='is-covid'>COVID</span>)}
          <small>{literals.levelDetail3Desc}</small>
        </span>);
      default: return <span />;
    }
  }

  renderModal = () => {
    const {
      itemIndexToRenderInModal,
      hospitalsFiltered: allHospitals,
    } = this.state;
    const { literals } = this.props;

    const hospitalsFiltered = allHospitals.find(h => h.hospitalID === itemIndexToRenderInModal);
    this.goToLocation(hospitalsFiltered.geometry.location);

    return (
      <React.Fragment>
        <div className='overlay open' />
        <div className='search-sec-text'>
          <div className='modal-hospital-details'>
            <div className='hos-head-txt'>
              <h4>{literals.hospital}</h4>
              <p
                onClick={() => {
                  this.closeModal();
                }}
              >
                {literals.close}
              </p>
            </div>
            <p className='hos-name'>
              {hospitalsFiltered.hospital}
            </p>
            <div className='hos-det_sec'>
              <div className='hos_det_l'>
                <p>{hospitalsFiltered.address}</p>
              </div>
              {/* hospitalsFiltered.url !== '' && (
                <div className='hun-h_s'>
                  <a
                    href={
                      hospitalsFiltered.url
                        ? hospitalsFiltered.url
                        : ''
                    }
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img src='/assets/images/Send.svg' alt='' />
                    {hospitalsFiltered.distance && parseDistance(hospitalsFiltered.distance)}
                  </a>
                </div>
              ) */}
            </div>
            <div className='hop-in-bdr-de'>
              <div className='hos-lo-s'>
                {(hospitalsFiltered.openTime.length > 0) && (
                  <div className='p-_hos'>
                    <img
                      className='img-fluid'
                      src='/assets/images/timeTableIcon.svg'
                      alt=''
                    />
                    <div className='ho_txt_d'>
                      <p>{literals.timetableAttention}</p>
                      {hospitalsFiltered.openTime.map((open, index) => (
                        <p key={index}>
                          <small>{open}</small>
                        </p>
                      ))}
                    </div>
                  </div>
                )}
                {hospitalsFiltered.level > 0 && (
                  <div className='p-_hos'>
                    <img
                      className='img-fluid'
                      src='/assets/images/healthIcon.svg'
                      alt=''
                    />
                    <div className='ho_txt_d'>
                      <p>
                        {this.renderLevelDetails(hospitalsFiltered.level, hospitalsFiltered.covid)}
                      </p>
                    </div>
                  </div>
                )}
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
    this.mapRef.setZoom(17);
  };

  render() {
    const {
      literals,
    } = this.props;
    const {
      currentActiveTabIndex,
      modalActive,
      zoom,
      hospitalsSearch,
      stateSelected,
      municipalitySelected,
      levelSelected,
      states,
      municipalities,
      hospitalsFiltered,
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

        <header className={`hospitalsHeader ${currentActiveTabIndex === 2 ? '' : 'map-visible'}`}>
          <div className='form-input-fields-container'>
            <form noValidate autoComplete='off'>
              <div className='selects-wrapper'>
                <div className='form-group'>
                  <SelectInput
                    name='state'
                    label={literals.state}
                    type='string'
                    placeholder={literals.select}
                    id='state'
                    value={stateSelected}
                    maxLength={10}
                    options={states}
                    onChange={e => this.setState({ stateSelected: e.target.value, municipalitySelected: '' })}
                    required
                    redOnEmpty
                  />
                </div>
                <div className='form-group'>
                  <SelectInput
                    name='municipality'
                    label={literals.municipality}
                    type='string'
                    placeholder={literals.select}
                    id='municipality'
                    value={municipalitySelected}
                    maxLength={10}
                    options={municipalities}
                    onChange={e => this.setState({ municipalitySelected: e.target.value })}
                    required
                    redOnEmpty
                  />
                </div>
              </div>
            </form>
          </div>
        </header>
        <div className={`${currentActiveTabIndex === 1 ? 'map-active' : ''}`}>
          <SearchBar
            initialValue=''
            placeholder={literals.search}
            onChange={(newTerm) => {
              this.setState({ term: newTerm }, () => {
                this.createHospitalsSearch();
              });
            }}
            filters={searchComponentFilters}
            itemSelected={this.itemSelected}
            listItems={hospitalsSearch}
          />
          <div className='selects-wrapper level-select-wrapper'>
            <div className='form-group'>
              <SelectInput
                name='level'
                label={literals.levelTitle}
                type='string'
                placeholder={literals.select}
                id='level'
                value={levelSelected}
                maxLength={10}
                options={literals.typeHospitalOptions}
                onChange={e => this.setState({ levelSelected: e.target.value })}
                required
              />
            </div>
          </div>
          <div
            className='map'
            style={{ display: currentActiveTabIndex === 1 ? 'block' : 'none' }}
          >
            <Map
              literals={literals}
              locationsToDisplay={hospitalsFiltered}
              zoom={zoom}
              ref={(mapComponent) => {
                this.mapComponent = mapComponent;
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
      </section>
    );
  }
}

export default TestingCenters;
