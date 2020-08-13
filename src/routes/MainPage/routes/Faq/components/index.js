/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import history from 'store/history';
import Municipalities from 'routes/MainPage/routes/Municipalities';
import apiFetch from 'utils/apiFetch';
import { API_URLS } from 'constants/apiConf';
import WideToggle from 'components/UI/WideToggle';
import Button from 'components/UI/Button';
import FirstTab from './FirstTab';
import SecondTab from './SecondTab';
// import ThirdTab from './ThirdTab';

/**
 * @name Faq
 *
 * @param {Object} literals
 *
 * @returns {JSX}
 */
class Faq extends Component {
  static propTypes = {
    literals: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    showLoading: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const activeTab = props.match.params.activeTab;

    this.state = {
      stateFirstTabListItems: [],
      stateSecondTabListItems: [],
      currentActiveTabIndex: this.getIndexByURL(activeTab),
      showExposedModal: activeTab === 'exposed',
      exposedData: null,
    };
  }

  componentDidMount() {
    const { literals } = this.props;
    const { showExposedModal } = this.state;

    if (showExposedModal) {
      window.stopExposedNotifications();
      this.setExposed();
    }

    const firstTabListItems = Object.values(literals.firstTab).map(
      (literal, ind) => {
        return {
          text: literal,
          img: `/assets/images/faq/faq_${ind + 1}.svg`,
        };
      },
    );

    const secondTabListItems = Object.values(literals.secondTab).map(
      literal => ({
        title: literal.title,
        text: literal.text,
        img: '/assets/images/HelpInACircle.svg',
      }),
    );

    this.setState({
      stateFirstTabListItems: firstTabListItems,
      stateSecondTabListItems: secondTabListItems,
    });
  }

  componentDidUpdate({ match: { params: { activeTab: prevTab } } }) {
    const { match: { params: { activeTab } } } = this.props;

    if (activeTab !== prevTab) {
      this.labelClicked(this.getIndexByURL(activeTab));
    }
  }

  getIndexByURL = (url) => {
    switch (url) {
      case 'advices': return 1;
      case 'faq': return 2;
      default: return 1;
    }
  }

  setExposed = () => {
    const { showLoading } = this.props;

    showLoading(true);
    apiFetch({
      method: 'POST',
      url: `${API_URLS.setExposed}`,
    }).then((exposedData) => {
      showLoading(false);
      this.setState({ exposedData });
    }).catch((error) => {
      console.error(error);
      showLoading(false);
    });
  }

  labelClicked = (index) => {
    this.setState({ currentActiveTabIndex: index });
  };

  renderTab = (index) => {
    const {
      stateFirstTabListItems,
      stateSecondTabListItems,
    } = this.state;
    switch (index) {
      case 2: return <FirstTab listItems={stateFirstTabListItems} />;
      case 3: return <SecondTab listItems={stateSecondTabListItems} />;
      case 1: return <div className='tab-municipalities-wrapper'><Municipalities /></div>;
      default: return <React.Fragment />;
    }
  }

  goToRoute = (route) => {
    this.setState({ showExposedModal: false }, () => {
      history.push(route);
    });
  }

  renderActions = (actions) => {
    return actions.map((action, index) => {
      switch (action.action) {
        case 'faq': return (
          <Button
            key={index}
            onClick={() => this.goToRoute('/main/faq/advices')}
            label={action.text}
          />
        );

        case 'external': return (
          <Button
            key={index}
            href={action.url}
            label={action.text}
          />
        );

        default: return null;
      }
    });
  }

  render() {
    const { literals } = this.props;
    const {
      currentActiveTabIndex, showExposedModal, exposedData,
    } = this.state;
    return (
      <React.Fragment>
        <div className='faq-view'>
          <WideToggle
            title={literals.title}
            firstLabel={literals.tabLabelThird}
            secondLabel={literals.tabLabelFirst}
            thirdLabel={literals.tabLabelSecond}
            activeLabelIndex={currentActiveTabIndex}
            labelClicked={this.labelClicked}
          />
          <section className='faq-a'>
            <div className='tab-content'>
              {this.renderTab(currentActiveTabIndex)}
            </div>
          </section>
        </div>
        {(showExposedModal && exposedData) && (
          <React.Fragment>
            <div className='overlay open' />
            <div className='search-sec-text exposed-modal-wrapper'>
              <div className='exposed-header'>
                <img src='/assets/images/green-arrow.svg' onClick={() => this.setState({ showExposedModal: false })} alt='' />
              </div>
              <div className='exposed-info-wrapper'>
                <img src='/assets/images/exposed_doctors.svg' alt='' />
                {exposedData.title && (<h3>{exposedData.title}</h3>)}
                {exposedData.body && (
                  <p
                    dangerouslySetInnerHTML={{ __html: exposedData.body }}
                  />
                )}
                {exposedData.actions && this.renderActions(exposedData.actions)}
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Faq;
