/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import apiFetch from 'utils/apiFetch';
import { sessionService } from 'redux-react-session';
import { API_URLS } from 'constants/apiConf';
import history from 'store/history';
import Button from 'components/UI/Button';
import Slider from 'react-slick';
import base64 from 'base-64';
import utf8 from 'utf8';
import { BT_ACTIVE_FOR_ALL, BT_ACTIVE_STATES } from 'routes/App/userSession';

import './styles.css';

const sliderSettings = {
  dots: true,
  infinite: false,
  slidesToShow: 1.1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.1,
        slidesToScroll: 1,
      },
    },
  ],
};

class ShareResults extends Component {
  interval = null;

  state = {
    showModal: false,
    results: [],
    showModalContacts: false,
    showSuccessSent: false,
    contactsList: [],
    contactsSelected: [],
    test: {},
    shareType: '',
    search: '',
    positiveSteps: 1,
    errorLog: '',
    contacts: false,
    flagInfographic: false,
  };

  async componentDidMount() {
    // eslint-disable-next-line
    const user = await sessionService.loadUser();
    this.checkPCRTests();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  checkPCRTests = () => {
    const { user } = this.props;
    const results = [];

    user.profiles.forEach((profile) => {
      if (profile.pcr && profile.pcr.length) {
        profile.pcr.forEach((pcr) => {
          if (pcr.verified && !pcr.readed && pcr.resultTest <= 2) {
            // eslint-disable-next-line
            pcr.name = profile.name;
            results.push(pcr);

            // if (pcr.resultTest !== 1) {
            //   this.setAsReaded(pcr);
            // }
          }
        });
      }
    });

    this.setState({
      results,
      showModal: results.length > 0,
    });
  }

  setAsReaded = (test) => {
    apiFetch({
      method: 'POST',
      url: API_URLS.setPCRReaded(test.profileID, test.id),
    });
  }

  getContacts = (test, shareType) => {
    const { showLoading } = this.props;
    showLoading(true);
    window.getContacts();
    this.interval = setInterval(this.checkContactsFromLocal, 500);

    this.setState({ test, shareType });
  }

  checkContactsFromLocal = () => {
    const { showLoading } = this.props;

    const contacts = localStorage.getItem('USRContacts');
    const contactsError = localStorage.getItem('USRContactsError');

    if (contactsError !== null) {
      clearInterval(this.interval);
      localStorage.removeItem('USRContactsError');

      const finalList = {
        '-': [
          {
            phone: '',
            name: 'Error importando contactos',
          },
        ],
      };

      this.setState({
        test: {},
        shareType: '',
        contactsList: finalList,
        showModalContacts: true,
      });

      showLoading(false);
    }

    if (contacts !== null) {
      clearInterval(this.interval);
      localStorage.removeItem('USRContacts');

      this.setState({ contacts });

      let contactsList = [];
      let finalList = {};

      try {
        const bytesContacts = base64.decode(contacts);
        const decodedContacts = utf8.decode(bytesContacts);
        const contactsObject = JSON.parse(decodedContacts);
        contactsList = Object.keys(contactsObject).map((phone) => {
          return {
            phone,
            name: contactsObject[phone],
          };
        });
      } catch (error) {
        console.error(error);
        this.setState({ errorLog: error.toString() });
        finalList = {
          '-': [
            {
              phone: '',
              name: 'Error importando contactos',
            },
          ],
        };
      }

      const arrayLetters = ['A', 'Á', 'B', 'C', 'D', 'E', 'É', 'F', 'G', 'H', 'I', 'Í', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'T', 'U', 'Ú', 'V', 'W', 'X', 'Y', 'Z'];

      arrayLetters.forEach((letter) => {
        const contactsByLeter = contactsList.filter(c => c.name[0].toUpperCase() === letter);
        if (contactsByLeter.length) {
          finalList[letter] = contactsByLeter.sort((a, b) => (a.name > b.name ? 1 : -1));
        }
      });

      const otherNames = contactsList.filter(c => arrayLetters.indexOf(c.name[0].toUpperCase()) < 0);

      if (otherNames.length) {
        finalList.ZZ = otherNames.sort((a, b) => (a.name > b.name ? 1 : -1));
      }

      showLoading(false);
      this.setState({
        contactsList: finalList,
        showModalContacts: true,
      });
    }
  }

  showResult = (result) => {
    const { literals } = this.props;
    const { positiveSteps } = this.state;

    switch (result.resultTest) {
      case 2:
        return (
          <React.Fragment>
            <p>
              {`${literals.profile}: `}
              <strong>{result.name}</strong>
            </p>
            <p>
              {` ${literals.dateTest}: `}
              <strong>{result.dateTest}</strong>
            </p>
            <img src='/assets/images/result_repeat.svg' alt='' />
            <h3>{literals.reapeatTestTitle}</h3>
            <p className='align-center' dangerouslySetInnerHTML={{ __html: literals.reapeatTestDescription }} />
            <Button
              label={literals.received}
              onClick={() => this.goTo(result, false)}
            />
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <p>
              {`${literals.profile}: `}
              <strong>{result.name}</strong>
            </p>
            <p>
              {` ${literals.dateTest}: `}
              <strong>{result.dateTest}</strong>
            </p>
            <img src='/assets/images/result_not_ok.svg' alt='' />
            <h3>{literals.positiveTitle}</h3>
            <p className='align-center' dangerouslySetInnerHTML={{ __html: literals.positiveDescription }} />
            <div className='positive-steps-wrapper'>
              {positiveSteps === 1 && (
                <React.Fragment>
                  <p className='align-left' dangerouslySetInnerHTML={{ __html: literals.positiveStep1 }} />
                  <Button
                    label={literals.btnNext}
                    onClick={this.goToStep2}
                  />
                </React.Fragment>
              )}

              {positiveSteps === 2 && (
                <div className='local-share-wrapper'>
                  <p className='align-left' dangerouslySetInnerHTML={{ __html: literals.positiveStep2 }} />
                  <p>
                    {`(${literals.shareMessage}`}
                  </p>
                  <p className='mt-2'>
                    {/* eslint-disable-next-line */}
                    <a onClick={() => this.showInfographic(true)}>{literals.shareURL}</a>
                    {')'}
                  </p>
                  <p className='align-left' dangerouslySetInnerHTML={{ __html: literals.positiveStep21 }} />
                  {/* <Button
                    label={literals.btnSendMessage}
                    onClick={() => this.getContacts(result, 'local')}
                  /> */}
                  <Button
                    label={literals.btnShareMessage}
                    onClick={() => this.nativeShare(result)}
                  />
                  <Button
                    label={literals.btnNext}
                    onClick={() => this.setState({ positiveSteps: 3 })}
                  />
                  {/* <p className='no-contact align-center' onClick={() => this.setState({ positiveSteps: 3 })}>{literals.noContact}</p> */}
                  <p className='no-contact align-center' onClick={() => this.sendNoContactNotification(result)}>{literals.noContact}</p>
                </div>
              )}

              {positiveSteps === 3 && (
                <React.Fragment>
                  <p className='align-left' dangerouslySetInnerHTML={{ __html: literals.positiveStep3 }} />
                  <Button
                    label={literals.btnUploadContacts}
                    onClick={() => this.getContacts(result, 'anonymous')}
                  />
                  {/* <p className='no-contact align-center' onClick={() => this.setState({ positiveSteps: 4 })}>{literals.noContact}</p> */}
                  <p className='no-contact align-center' onClick={() => this.sendNoContactNotification(result)}>{literals.noContact}</p>
                </React.Fragment>
              )}

              {positiveSteps === 4 && (
                <p className='mt-3'>
                  <span className='align-left' dangerouslySetInnerHTML={{ __html: literals.positiveStep4 }} />
                  <span onClick={() => this.goTo(result, '/main/faq')} className='plr-5'>
                    {literals.information}
                  </span>
                  <span className='align-left' dangerouslySetInnerHTML={{ __html: literals.positiveStep41 }} />
                  <span onClick={() => this.goTo(result, '/main/news')} className='plr-5'>
                    {literals.news}
                  </span>
                  <span className='align-left' dangerouslySetInnerHTML={{ __html: literals.positiveStep42 }} />
                  <Button
                    label={literals.btnFinish}
                    onClick={() => this.goTo(result, false)}
                  />
                </p>
              )}
            </div>
          </React.Fragment>
        );
      case 0:
        return (
          <React.Fragment>
            <p>
              {`${literals.profile}: `}
              <strong>{result.name}</strong>
            </p>
            <p>
              {` ${literals.dateTest}: `}
              <strong>{result.dateTest}</strong>
            </p>
            <img src='/assets/images/result_ok.svg' alt='' />
            <h3>{literals.negativeTitle}</h3>
            <p className='align-center' dangerouslySetInnerHTML={{ __html: literals.negativeDescription }} />
            <Button
              label={literals.received}
              onClick={() => this.goTo(result, false)}
            />
          </React.Fragment>
        );
      default: return null;
    }
  }

  goToStep2 = () => {
    this.setState({ positiveSteps: 2 }, () => {
      const state = localStorage.getItem('CONF_MUNICIPALITY');
      const activeBT = BT_ACTIVE_FOR_ALL || BT_ACTIVE_STATES.indexOf(state) >= 0;

      if (activeBT) {
        window.sendTraceData();
      }
    });
  }

  showInfographic = (flag) => {
    this.setState({ flagInfographic: flag });
  }

  goTo = (test, route) => {
    const { showLoading } = this.props;

    showLoading(true);
    apiFetch({
      method: 'POST',
      url: API_URLS.setPCRReaded(test.profileID, test.id),
    }).then(() => {
      showLoading(false);
      this.setState({
        showModal: false,
      }, () => {
        if (route) history.push(route);
      });
    }).catch(() => {
      showLoading(false);
      this.setState({
        showModal: false,
      }, () => {
        if (route) history.push(route);
      });
    });
  }

  nativeShare = () => {
    const { literals } = this.props;
    const params = {
      message: literals.shareMessage,
      image: null,
      url: literals.shareURL,
    };

    window.nativeShareMessage(params);
    this.interval = setInterval(this.getResultFromLocalStorage, 500);

    // this.setState({ sharing: result });
  }

  getResultFromLocalStorage = () => {
    let localResult = localStorage.getItem('ShareResult');

    if (localResult !== null) {
      localResult = parseInt(localResult, 10);

      if (localResult) {
        // const { sharing } = this.state;
        // this.sendSharedNativeNotification(sharing);
        clearInterval(this.interval);
        localStorage.removeItem('ShareResult');
      } else {
        clearInterval(this.interval);
        localStorage.removeItem('ShareResult');
      }
    }
  }

  handleSelectContact = (contact) => {
    const { contactsSelected } = this.state;

    if (!contact.phone) return;

    const index = contactsSelected.indexOf(contact);

    if (index < 0) {
      this.setState({
        contactsSelected: [
          ...contactsSelected,
          contact,
        ],
      });
    } else {
      this.setState({
        contactsSelected: contactsSelected.filter(c => c.phone !== contact.phone),
      });
    }
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
    });
  }

  selectContacts = () => {
    const { literals } = this.props;
    const {
      contactsList,
      contactsSelected,
      showSuccessSent,
      search,
      shareType,
      contacts,
      errorLog,
    } = this.state;

    return (
      <React.Fragment>
        <div className='overlay open' />
        <div className='search-sec-text share-results-modal-wrapper'>
          <div className='share-results-modal-header'>
            <img src='/assets/images/green-arrow.svg' onClick={() => this.setState({ showModalContacts: false })} alt='' />
            <span>{literals.yourContacts}</span>
          </div>
          <div className='share-results-modal'>
            {!showSuccessSent ? (
              <React.Fragment>
                <div className='search-wrapper'>
                  <div className='search-img'>
                    <img src='/assets/images/Search.svg' alt='' />
                  </div>
                  <input
                    type='search'
                    value={search}
                    placeholder='Buscar...'
                    className='search-contact'
                    onChange={this.handleSearch}
                  />
                </div>

                {search === 'Muestra contactos 123' && (
                  <React.Fragment>
                    <p className='error-log'>{errorLog}</p>
                    <p className='error-log'>{contacts}</p>
                  </React.Fragment>
                )}

                {Object.keys(contactsList).map((letter) => {
                  const contactsByLetter = contactsList[letter].filter(contact => (search === '' || contact.name.toUpperCase().indexOf(search.toUpperCase()) >= 0));

                  if (contactsByLetter.length === 0) return null;

                  return (
                    <div key={letter}>
                      <h1>{letter}</h1>
                      <ul className='list-group'>
                        {contactsByLetter
                          .map((contact, index) => {
                            const isSelected = contactsSelected.indexOf(contact) >= 0;
                            return shareType === 'anonymous' ? (
                              <li
                                key={index}
                                className={`list-group-item ${isSelected ? 'active' : ''}`}
                                onClick={() => this.handleSelectContact(contact)}
                              >
                                {contact.name}
                                <small>{contact.phone}</small>
                              </li>
                            ) : (
                              <li
                                key={index}
                                className='list-group-item local-share'
                              >
                                <span>
                                  {contact.name}
                                  <small>{contact.phone}</small>
                                </span>
                                <img
                                  alt=''
                                  src='/assets/images/share_sms.svg'
                                  onClick={() => {}}
                                />
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  );
                })}
                {shareType === 'anonymous' ? (
                  <React.Fragment>
                    <div className='list-separator' />
                    <div className='btn-fixed-bottom'>
                      <Button
                        label={literals.share}
                        onClick={this.sendNotificationToContacts}
                        disabled={contactsSelected.length === 0}
                      />
                    </div>
                  </React.Fragment>
                ) : (
                  <Button
                    label={literals.btnNext}
                    onClick={() => this.setState({ showModalContacts: false, positiveSteps: 4 })}
                  />
                )}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h2>{literals.notificationSent}</h2>
                <Button
                  label={literals.close}
                  onClick={() => this.setState({ showModalContacts: false, positiveSteps: 4 })}
                />
              </React.Fragment>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }

  sendNotificationToContacts = () => {
    const { showLoading } = this.props;
    const { test, contactsSelected } = this.state;

    showLoading(true);
    apiFetch({
      method: 'POST',
      url: API_URLS.sendPCRNotification(test.profileID, test.id),
      params: {
        phones: contactsSelected,
      },
    }).then(() => {
      showLoading(false);
      this.setState({ showSuccessSent: true });
    });
  }

  sendSharedNativeNotification = (test) => {
    const { showLoading } = this.props;

    showLoading(true);
    apiFetch({
      method: 'POST',
      url: API_URLS.setPCRReaded(test.profileID, test.id),
    }).then(() => {
      showLoading(false);
      this.setState({ positiveSteps: 2 });
    });
  }

  sendNoContactNotification = (test) => {
    const { showLoading } = this.props;

    showLoading(true);
    apiFetch({
      method: 'POST',
      url: API_URLS.setPCRReaded(test.profileID, test.id),
    }).then(() => {
      showLoading(false);
      this.setState({ positiveSteps: 4 });
    });
  }

  render() {
    const { literals } = this.props;
    const {
      showModal, showModalContacts, results, flagInfographic,
    } = this.state;

    return showModal ? (
      <React.Fragment>
        <div className='overlay open' />
        <div className='search-sec-text share-results-modal-wrapper'>
          <div className='share-results-modal-header'>
            <img src='/assets/images/green-arrow.svg' onClick={() => this.setState({ showModal: false })} alt='' />
            <span>{literals.title}</span>
          </div>
          <div className={`share-results-modal ${results.length === 1 ? 'one-result' : ''}`}>
            <Slider {...sliderSettings}>
              {results.map(result => (
                <div className='card-test-wrapper' key={result.id}>
                  <div className='card card-test-result'>
                    {this.showResult(result)}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        {showModalContacts && this.selectContacts()}
        {flagInfographic && (
          <div className='infographic-wrapper'>
            <div className='overlay open '>
              <img className='close-video' src='/assets/images/Close-white.svg' alt='' onClick={() => this.showInfographic(false)} />
            </div>
            <div className='search-sec-text conference-video'>
              <img className='infographic-img' src='/assets/images/sampple_infographic.png' alt='' />
            </div>
          </div>
        )}
      </React.Fragment>
    ) : null;
  }
}
ShareResults.displayName = 'ShareResults';
ShareResults.propTypes = {
  user: PropTypes.object.isRequired,
  literals: PropTypes.object.isRequired,
  showLoading: PropTypes.func.isRequired,
};
export default ShareResults;
