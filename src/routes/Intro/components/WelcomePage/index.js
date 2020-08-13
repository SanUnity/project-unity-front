import React, { Component } from 'react';
import PropTypes from 'prop-types';
import history from 'store/history';
import ListItem from 'components/UI/ListItem';
import Button from 'components/UI/Button';
import SelectInput from 'components/SelectInput';
import apiFetch from 'utils/apiFetch';

import { API_URLS } from 'constants/apiConf';
import Onboarding from './Onboarding';

const itemsProps = [
  {
    imagePath: 'assets/images/ManagementHealth.svg',
  },
  {
    imagePath: 'assets/images/EeceiptManagement.svg',
  },
  {
    imagePath: 'assets/images/Time.svg',
  },
  {
    imagePath: 'assets/images/HelpUsToImprove.svg',
  },
];

class WelcomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statesArray: [],
      stateSelected: '',
      showOnboarding: false,
    };
  }

  componentDidMount = async () => {
    const data = await apiFetch({
      method: 'GET',
      url: `${API_URLS.states}`,
    });

    const statesArray = [];
    data.map((state) => {
      statesArray.push({
        id: state.id,
        title: state.name,
        value: state.id,
      });
      return state;
    });
    this.setState({ statesArray });
  }

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  }

  handleStateSelected = () => {
    const { setMunicipalityConfiguration } = this.props;
    const { stateSelected } = this.state;

    setMunicipalityConfiguration(stateSelected);
    localStorage.setItem('CONF_MUNICIPALITY', stateSelected);

    this.setState({ showOnboarding: true });
  }

  handleFinish = () => {
    history.push('/signup-options');
  }

  render() {
    const { literals } = this.props;
    const { statesArray, stateSelected, showOnboarding } = this.state;

    return (
      <section className='welcome add-bg'>
        <div className='back'>
          <img
            className='img'
            src='../../assets/images/wellcome-bg.png'
            alt=''
          />
        </div>
        <div className={`container ${showOnboarding ? 'of-hidden' : ''}`}>
          <div className='row'>
            {showOnboarding ? (
              <div className='col-12 p-0'>
                <h4>{literals.welcome.title}</h4>
                <Onboarding
                  literals={literals.onboarding}
                  onFinish={this.handleFinish}
                />
              </div>
            ) : (
              <div className='col-12 welcome-text'>
                <h4>{literals.welcome.title}</h4>
                <span>{literals.welcome.subtitle}</span>
                <h2>{literals.welcome.subtitle_big}</h2>
                <div className='content'>
                  {itemsProps.map((item, index) => (
                    <ListItem
                      key={index}
                      imgSrc={item.imagePath}
                      content={literals.welcome[`item${index + 1}`]}
                    />
                  ))}
                </div>
                <div className='select-state-wrapper'>
                  <SelectInput
                    name='state'
                    type='string'
                    label={literals.welcome.selectState}
                    placeholder={literals.welcome.selectStatePlaceholder}
                    value={stateSelected}
                    options={statesArray}
                    onChange={e => this.handleChange(e.target.value, 'stateSelected')}
                  />
                </div>
                <div className='btn-my-sec text-center'>
                  <Button
                    label={literals.welcome.button}
                    onClick={this.handleStateSelected}
                    disabled={!stateSelected}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
}
WelcomePage.displayName = 'WelcomePage';
WelcomePage.propTypes = {
  literals: PropTypes.object.isRequired,
  setMunicipalityConfiguration: PropTypes.func.isRequired,
};

export default WelcomePage;
