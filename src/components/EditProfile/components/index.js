import React from 'react';
import ComponentHeader from 'components/UI/ComponentHeader';
import PropTypes from 'prop-types';
import history from 'store/history';
import { sessionService } from 'redux-react-session';
import apiFetch from 'utils/apiFetch';
import { API_URLS } from 'constants/apiConf';
import Question from 'routes/FormTest/components/ToggleQuestion';
import SiNo from 'components/UI/SiNo';
import Input from 'components/UI/Input';
import SelectInput from 'components/SelectInput';
import Warning from 'routes/FormTest/icons/Warning';
import ModalConfirm from 'components/ModalConfirm';
import './styles.css';

const questions = [
  'name',
  'lastname1',
  'lastname2',
  'age',
  'gender',
];

const homeQuestions = [
  'postalCode',
  'street',
  'numberExternal',
  'numberInternal',
  'municipalityID',
  'suburbID',
];

const mandatoryInfo = [
  'name',
  'age',
  'postalCode',
  'gender',
  'municipalityID',
  'suburbID',
];

export default class EditProfile extends React.Component {
  static propTypes = {
    literals: PropTypes.object.isRequired,
    showLoading: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    mainProfile: PropTypes.string.isRequired,
  };

  state = {
    dataInfo: {},
    currentMunicipaly: '',
    suburbOptions: [],
    currentSuburb: '',
    currentState: '',
    changes: false,
    errors: [],
    snackError: false,
    showModal: false,
    showDefaultProfileQuestion: false,
    isDefault: 'no',
  }

  componentWillMount() {
    this.getUserInfo();
  }

  handleDeleteProfile = () => {
    const {
      id,
      showLoading,
    } = this.props;
    showLoading(true);
    apiFetch({
      method: 'DELETE',
      url: `${API_URLS.userProfile}/${id}`,
    }).then(async () => {
      const { profiles, ...user } = await sessionService.loadUser();
      const profileToDelete = profiles.find(x => x.id === id);
      const profileIndex = profiles.indexOf(profileToDelete);
      const profilesUpdated = [...profiles];
      profilesUpdated.splice(profileIndex, 1);
      sessionService.saveUser({
        ...user,
        profiles: profilesUpdated,
      }).then(() => {
        this.setState({ showModal: false });
        history.push('/main/test');
        showLoading(false);
      });
    }).catch((error) => {
      console.error('error', error);
      showLoading(false);
    });
  }

  handleEditProfile = () => {
    const {
      dataInfo,
      currentState,
      currentMunicipaly,
      currentSuburb,
      postalCodeData,
      isDefault,
    } = this.state;
    const {
      id,
      showLoading,
    } = this.props;
    const errors = [];

    mandatoryInfo.map((mandatoryField) => {
      if (!dataInfo[mandatoryField] || dataInfo[mandatoryField] === '') errors.push(mandatoryField);
      return 0;
    });
    if (currentMunicipaly === '') errors.push('municipalityID');
    if (currentSuburb === '') errors.push('suburbID');
    this.setState({ errors });
    // eslint-disable-next-line
    const postalCodeSelectedData = postalCodeData.find(p => p.suburbID == dataInfo.suburbID);
    if (!postalCodeSelectedData) errors.push('postalCode');
    if (errors.length === 0) {
      showLoading(true);
      dataInfo.stateID = currentState;

      if (postalCodeSelectedData) {
        dataInfo.state = postalCodeSelectedData.state;
        dataInfo.municipality = postalCodeSelectedData.municipality;
        dataInfo.suburb = postalCodeSelectedData.suburb;
      }

      apiFetch({
        method: 'PUT',
        url: `${API_URLS.userProfile}/${id}`,
        params: dataInfo,
      }).then(async () => {
        this.setState({ changes: false });
        const { profiles, ...user } = await sessionService.loadUser();

        if (isDefault === 'yes') {
          apiFetch({
            method: 'POST',
            url: API_URLS.setProfileAsMain(id),
          });

          user.mainProfile = id;

          profiles.forEach((profile) => {
            if (profile.id === id) {
              // eslint-disable-next-line
              profile.isDefault = true;
            } else {
              // eslint-disable-next-line
              profile.isDefault = false;
            }
          });
        }

        const profileRes = profiles.find(x => x.id === id);

        profileRes.name = dataInfo.name;
        profileRes.home = dataInfo.street;
        sessionService.saveUser({
          ...user,
          profiles,
        });
        history.goBack();
        showLoading(false);
      }).catch((error) => {
        console.error('error', error);
        showLoading(false);
      });
    }
    this.setState({
      snackError: true,
    }, () => {
      setTimeout(() => {
        this.setState({ snackError: false });
      }, 4000);
    });
  }

  getUserInfo = () => {
    const { id, showLoading, mainProfile } = this.props;

    showLoading(true);
    apiFetch({
      method: 'GET',
      url: `${API_URLS.userProfile}/${id}`,
    }).then((data) => {
      showLoading(false);
      this.setState({
        dataInfo: data,
        showDefaultProfileQuestion: id !== mainProfile,
      }, async () => {
        if (data && data.postalCode) {
          apiFetch({
            method: 'GET',
            url: `${API_URLS.postalCodes(data.postalCode)}`,
          }).then((postalCodeData) => {
            this.handlePCInfo(postalCodeData);
          }).catch((error) => {
            console.error('error', error);
          });
        }
      });
    }).catch((error) => {
      console.error('error', error);
      showLoading(false);
    });
  }

  handlePCInfo = (postalCodeData) => {
    const {
      dataInfo,
    } = this.state;
    if (postalCodeData.length > 0) {
      const suburbOptions = this.renderPCOptions(postalCodeData);
      this.setState({ suburbOptions });
      if (dataInfo.suburbID && dataInfo.suburbID !== '') {
        const res = postalCodeData.find(x => x.suburbID === dataInfo.suburbID);
        if (res) {
          // Coincide con lo que había guardado del usuario
          this.setState({
            currentSuburb: res.suburbID, currentState: res.stateID, currentMunicipaly: res.municipality, postalCodeData,
          });
        } else {
          // No coincide
          this.setState({
            currentSuburb: '', currentState: postalCodeData[0].stateID, currentMunicipaly: postalCodeData[0].municipality, postalCodeData,
          });
        }
      }
    } else {
      this.setState({
        currentSuburb: '', currentState: '', currentMunicipaly: '', postalCodeData, suburbOptions: [],
      });
    }
  }

  renderPCOptions = (postalCodeData) => {
    const resSuburb = [];
    postalCodeData.map((data) => {
      if (!resSuburb.find(x => x.id === data.suburbID)) {
        resSuburb.push({
          id: data.suburbID,
          title: data.suburb,
          value: data.suburbID,
        });
      }
      return 0;
    });
    return resSuburb;
  }

  renderValue = (propName) => {
    const {
      dataInfo,
    } = this.state;
    if (dataInfo && dataInfo[propName]) return dataInfo[propName];
    return '';
  }

  handleChangePC = (e) => {
    const {
      dataInfo,
    } = this.state;

    const dataInfoAux = dataInfo;
    dataInfoAux.postalCode = e.target.value;
    this.setState({
      dataInfo: dataInfoAux,
      changes: true,
    });
    if (this.validateCP(e.target.value)) {
      apiFetch({
        method: 'GET',
        url: `${API_URLS.postalCodes(e.target.value)}`,
      }).then((postalCodeData) => {
        this.handlePCInfo(postalCodeData);
      }).catch((error) => {
        console.error('error', error);
      });
    }
  }

  handleSelectSuburb = (e) => {
    const {
      postalCodeData,
      dataInfo,
    } = this.state;
    // eslint-disable-next-line eqeqeq
    const res = postalCodeData.find(x => x.suburbID == e.target.value);
    if (res) {
      const dataInfoAux = dataInfo;
      dataInfoAux.suburbID = Number(e.target.value);
      dataInfoAux.municipalityID = res.municipalityID;
      this.setState({
        dataInfo: dataInfoAux,
        currentSuburb: res.suburbID,
        changes: true,
      });
    }
  }

  handleChange = (value, name) => {
    const {
      dataInfo,
    } = this.state;
    const dataInfoAux = dataInfo;
    dataInfoAux[name] = value;
    this.setState({ dataInfo: dataInfoAux, changes: true });
  }

  handleChangeState = (value, name) => {
    this.setState({ [name]: value });
  }

  isError = (name) => {
    const {
      errors,
    } = this.state;
    const res = errors.find(x => x === name);
    if (res) return true;
    return false;
  }

  validateCP = (cp) => {
    const res = cp.split('');
    if (res.length === 5) return true;
    return false;
  }

  render() {
    const {
      literals,
    } = this.props;
    const {
      currentSuburb,
      changes,
      currentMunicipaly,
      suburbOptions,
      snackError,
      showModal,
      isDefault,
      showDefaultProfileQuestion,
    } = this.state;

    return (
      <div className='ProfileInfo__Container'>
        {snackError && (
          <div id='snackbar' className='snackbar show'>
            <Warning />
            <div className='snackbar__text'>{literals.snackbar}</div>
          </div>
        )}
        <header>
          <ComponentHeader
            title={literals.title}
            leftIconSrc='/assets/images/green-arrow.svg'
            leftIconClicked={history.goBack}
          />
        </header>
        <div className='subtitle'>
          <span className='hashtag'>{literals.hashtag}</span>
          <br />
          <span className='info'>
            {literals.subTitle}
          </span>
        </div>
        <div className='form-input-fields-container'>
          <form noValidate autoComplete='off'>
            {showDefaultProfileQuestion && (
              <div className='form-group default-profile-question'>
                <Question
                  onlyYes
                  component={SiNo}
                  label={literals.defaultProfileTitle}
                  subLabel={literals.defaultProfileDescription}
                  onChange={value => this.handleChangeState(value, 'isDefault')}
                  value={isDefault}
                />
              </div>
            )}
            <div className='form-group'>
              <Input
                name={questions[0]}
                label={literals[questions[0]].label}
                type='string'
                placeholder={literals[questions[0]].placeholder}
                id={questions[0]}
                value={this.renderValue(questions[0])}
                onChange={e => this.handleChange(e.target.value, questions[0])}
                required
                error={this.isError(questions[0])}
                onlyLetters
                maxLength={20}
              />
              {/* literals[questions[0]].subLabel && (
                <span className='form-field-sub-label'>
                  {literals[questions[0]].subLabel}
                </span>
              ) */}
            </div>
            <div className='form-group'>
              <Input
                name={questions[1]}
                label={literals[questions[1]].label}
                type='string'
                placeholder={literals[questions[1]].placeholder}
                id={questions[1]}
                value={this.renderValue(questions[1])}
                onChange={e => this.handleChange(e.target.value, questions[1])}
                error={this.isError(questions[1])}
                onlyLetters
                maxLength={20}
              />
              {literals[questions[1]].subLabel && (
                <span className='form-field-sub-label'>
                  {literals[questions[1]].subLabel}
                </span>
              )}
            </div>
            <div className='form-group'>
              <Input
                name={questions[2]}
                label={literals[questions[2]].label}
                type='string'
                placeholder={literals[questions[2]].placeholder}
                id={questions[2]}
                value={this.renderValue(questions[2])}
                onChange={e => this.handleChange(e.target.value, questions[2])}
                error={this.isError(questions[2])}
                onlyLetters
                maxLength={20}
              />
              {literals[questions[2]].subLabel && (
                <span className='form-field-sub-label'>
                  {literals[questions[2]].subLabel}
                </span>
              )}
            </div>
            <div className='two-in-row'>
              <div className='form-group'>
                <Input
                  name={questions[3]}
                  label={literals[questions[3]].label}
                  type='number'
                  placeholder={literals[questions[3]].placeholder}
                  id={questions[3]}
                  value={this.renderValue(questions[3])}
                  maxLength={10}
                  onChange={e => this.handleChange(e.target.value, questions[3])}
                  required
                  error={this.isError(questions[3])}
                />
                {literals[questions[3]].subLabel && (
                  <span className='form-field-sub-label'>
                    {literals[questions[3]].subLabel}
                  </span>
                )}
              </div>
              <div className='form-group'>
                <SelectInput
                  name={questions[4]}
                  label={literals[questions[4]].label}
                  type='string'
                  placeholder={literals[questions[4]].placeholder}
                  id={questions[4]}
                  value={this.renderValue(questions[4])}
                  maxLength={10}
                  options={literals.genderOptions}
                  onChange={e => this.handleChange(e.target.value, questions[4])}
                  required
                  error={this.isError(questions[4])}
                />
                {literals[questions[4]].subLabel && (
                  <span className='form-field-sub-label'>
                    {literals[questions[4]].subLabel}
                  </span>
                )}
              </div>
            </div>
            <h3 className='InfoSubtitle'>{literals.home}</h3>
            <div className='form-group'>
              <Input
                name={homeQuestions[0]}
                label={literals[homeQuestions[0]].label}
                type='number'
                placeholder={literals[homeQuestions[0]].placeholder}
                id={homeQuestions[0]}
                value={this.renderValue(homeQuestions[0])}
                maxLength={5}
                onChange={this.handleChangePC}
                error={this.isError(homeQuestions[0]) || !this.validateCP(this.renderValue(homeQuestions[0]))}
              />
              {literals[homeQuestions[0]].subLabel && (
                <span className='form-field-sub-label postal-code-label'>
                  <a
                    href='https://www.correosdemexico.gob.mx/SSLServicios/ConsultaCP/Descarga.aspx'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {literals[homeQuestions[0]].subLabel}
                  </a>
                </span>
              )}
            </div>
            <div className='form-group'>
              <Input
                name={homeQuestions[1]}
                label={literals[homeQuestions[1]].label}
                type='string'
                placeholder={literals[homeQuestions[1]].placeholder}
                id={homeQuestions[1]}
                value={this.renderValue(homeQuestions[1])}
                maxLength={30}
                onChange={e => this.handleChange(e.target.value, homeQuestions[1])}
                error={this.isError(homeQuestions[1])}
              />
              {literals[homeQuestions[1]].subLabel && (
                <span className='form-field-sub-label'>
                  {literals[homeQuestions[1]].subLabel}
                </span>
              )}
            </div>
            <div className='two-in-row'>
              <div className='form-group'>
                <Input
                  name={homeQuestions[2]}
                  label={literals[homeQuestions[2]].label}
                  type='string'
                  placeholder={literals[homeQuestions[2]].placeholder}
                  id={homeQuestions[2]}
                  value={this.renderValue(homeQuestions[2])}
                  maxLength={10}
                  onChange={e => this.handleChange(e.target.value, homeQuestions[2])}
                  error={this.isError(homeQuestions[2])}
                />
                {literals[homeQuestions[2]].subLabel && (
                  <span className='form-field-sub-label'>
                    {literals[homeQuestions[2]].subLabel}
                  </span>
                )}
              </div>
              <div className='form-group'>
                <Input
                  name={homeQuestions[3]}
                  label={literals[homeQuestions[3]].label}
                  type='string'
                  placeholder={literals[homeQuestions[3]].placeholder}
                  id={homeQuestions[3]}
                  value={this.renderValue(homeQuestions[3])}
                  maxLength={10}
                  onChange={e => this.handleChange(e.target.value, homeQuestions[3])}
                  error={this.isError(homeQuestions[3])}
                />
                {literals[homeQuestions[3]].subLabel && (
                  <span className='form-field-sub-label'>
                    {literals[homeQuestions[3]].subLabel}
                  </span>
                )}
              </div>
            </div>
            <div className='form-group'>
              <Input
                name={homeQuestions[4]}
                label={literals[homeQuestions[4]].label}
                type='string'
                placeholder={literals[homeQuestions[4]].placeholder}
                id={homeQuestions[4]}
                value={currentMunicipaly}
                maxLength={10}
                onChange={e => this.handleChange(e.target.value, homeQuestions[4])}
                error={this.isError(homeQuestions[4])}
              />
              {literals[homeQuestions[4]].subLabel && (
                <span className='form-field-sub-label'>
                  {literals[homeQuestions[4]].subLabel}
                </span>
              )}
            </div>
            <div className='form-group'>
              <SelectInput
                name={homeQuestions[5]}
                label={literals[homeQuestions[5]].label}
                type='string'
                placeholder={literals[homeQuestions[5]].placeholder}
                id={homeQuestions[5]}
                value={currentSuburb}
                maxLength={10}
                onChange={this.handleSelectSuburb}
                options={suburbOptions}
                error={this.isError(homeQuestions[5])}
              />
              {literals[homeQuestions[5]].subLabel && (
                <span className='form-field-sub-label'>
                  {literals[homeQuestions[5]].subLabel}
                </span>
              )}
            </div>
            <div className='button-wrapper'>
              <button type='button' className='delete' onClick={() => this.setState({ showModal: true })}>
                {literals.delete}
              </button>
              <button type='button' className={!changes ? 'disabled' : ''} onClick={() => this.handleEditProfile()}>
                {literals.save}
              </button>
            </div>
          </form>
        </div>
        {showModal && (
          <ModalConfirm cancel={() => this.setState({ showModal: false })} title={literals.modalTitle} cancelText={literals.cancel} confirmText={literals.confirm} confirm={this.handleDeleteProfile} />
        )}
      </div>
    );
  }
}
