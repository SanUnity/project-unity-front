import React, { Component } from 'react';
import { sessionService } from 'redux-react-session';
import PropTypes from 'prop-types';
import { ALLOWED_LANGUAGES } from 'utils/language';
import StartTest from './StartTest';
import Profiles from './Profiles/components';

/**
 * @name TestPage
 *
 * @param {Object} literals
 *
 * @returns {JSX}
 */
class TestPage extends Component {
  static propTypes = {
    literals: PropTypes.object.isRequired,
    profiles: PropTypes.array.isRequired,
    showLoading: PropTypes.func.isRequired,
    btActive: PropTypes.bool.isRequired,
    changeLang: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      // state: '',
      profiles: [],
      loaded: false,
      changeLang: false,
    };
  }

  componentDidMount = async () => {
    const {
      // state,
      phone = '',
      profiles,
    } = await sessionService.loadUser();

    this.setState({
      // state,
      phone,
      profiles,
      loaded: true,
    });
  }

  componentDidUpdate({ profiles: prevProfiles }) {
    const { profiles } = this.props;

    if (JSON.stringify(profiles) !== JSON.stringify(prevProfiles)) {
      this.updateProfiles();
    }
  }

  updateProfiles = () => {
    const { profiles } = this.props;

    this.setState({
      profiles,
    });
  }

  handleChangeLanguage = (lang) => {
    const { showLoading, changeLang } = this.props;

    showLoading(true);
    this.setState({
      changeLang: false,
    }, () => {
      changeLang(lang, false);

      setTimeout(() => {
        showLoading(false);
      }, 1000);
    });
  }

  openLangModal = () => {
    this.setState({
      changeLang: true,
    });
  }

  closeLangModal = () => {
    this.setState({
      changeLang: false,
    });
  }

  render() {
    const {
      profiles, loaded, phone, changeLang,
    } = this.state;
    const { literals, showLoading, btActive } = this.props;
    if (loaded) {
      return (
        <React.Fragment>
          {!profiles.length ? (
            <div className='TestPageWrapper is-empty'>
              <StartTest literals={literals} onShowModalLangs={this.openLangModal} />
            </div>
          ) : (
            <div className='TestPageWrapper'>
              <Profiles
                literals={literals}
                profiles={profiles}
                phone={phone}
                showLoading={showLoading}
                btActive={btActive}
                onShowModalLangs={this.openLangModal}
              />
            </div>
          )}
          {changeLang && (
            <div className='select-lang-modal-wrapper'>
              <div className='overlay open' />
              <div className='search-sec-text terms-and-conditions'>
                <img src='/assets/images/green-arrow.svg' onClick={this.closeLangModal} alt='' />
                <div className='select-lang-wrapper'>
                  <p>{literals.selectLang}</p>
                  <ul>
                    {ALLOWED_LANGUAGES.map((lang, index) => (
                      <li key={index} onClick={() => this.handleChangeLanguage(lang)}>
                        {literals.language[lang]}
                      </li>
                    ))}
                  </ul>

                  {/* <ul className='is-fixed'>
                    <li onClick={this.handleLogout}>
                      {literals.logout}
                    </li>
                  </ul> */}
                </div>
              </div>
            </div>
          )}
        </React.Fragment>
      );
    }
    return <React.Fragment />;
  }
}

export default TestPage;
