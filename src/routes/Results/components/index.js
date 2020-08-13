import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import ScrollToTopOnMount from 'components/UI/ScrollToTopOnMount';
import { ROUTE_PATH as PARENT_ROUTE_PATH } from 'routes';
import { ROUTE_PATH } from 'routes/MainPage/routes';
import {
  TEST_RESUL_LOW,
  TEST_RESUL_MEDIUM_LOW,
  TEST_RESUL_MEDIUM,
  TEST_RESUL_MEDIUM_HIGH,
  TEST_RESUL_MEDIUM_VULNERABLE,
  TEST_RESUL_HIGH,
} from 'constants/tests';
import ComponentHeader from '../../../components/UI/ComponentHeader/index';
import Content from './Content';

/**
 * @name Results
 * Results component has two variants: good and bad
 * param 'resultsOk' tells the component which variant to display
 *
 * @param {Object} literals
 * @param {bool} resultsOk
 * @param {object} route
 *
 * @returns {JSX}
 */

class Results extends Component {
  static propTypes = {
    literals: PropTypes.object.isRequired,
    result: PropTypes.object,
    route: PropTypes.object,
    simple: PropTypes.bool,
    modal: PropTypes.bool,
  };

  static defaultProps = {
    result: {},
    route: undefined,
    simple: false,
    modal: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      stateListItems: [], currentLevel: '', data: {}, redirectTests: false,
    };
  }

  componentWillMount() {
    const {
      literals,
      result,
    } = this.props;
    this.getStatus(result);
    if (!result || Object.keys(result).length === 0) this.setState({ redirectTests: true });
    this.setState({
      data: {
        GOOD: {
          img: '/assets/images/results/GoodImage.svg',
          title: literals.good.title,
          secondTitle: literals.good.secondTitle,
          subtitle: literals.good.subtitle,
          recomendations: literals.good.recomendations,
          showMoreButton: true,
          moreButtonClassName: 'primaryButton',
          showCall: true,
          showMessage: false,
          showHealthUnits: false,
          call911: false,
        },
        MEDIUM_LOW: {
          img: '/assets/images/results/MediumLow.svg',
          title: literals.medium_low.title,
          secondTitle: literals.medium_low.secondTitle,
          subtitle: literals.medium_low.subtitle,
          extraSubtitle: literals.medium_low.extraSubtitle,
          recomendations: literals.medium_low.recomendations,
          showMoreButton: true,
          moreButtonClassName: 'primaryButton',
          showCallEmergency: true,
          showMessage: false,
          showHealthUnits: false,
          call911: false,
        },
        MEDIUM: {
          img: '/assets/images/results/grupo4.svg',
          title: literals.medium.title,
          secondTitle: literals.medium.secondTitle,
          subtitle: literals.medium.subtitle,
          extraSubtitle: literals.medium.extraSubtitle,
          recomendations: literals.medium.recomendations,
          showMoreButton: true,
          moreButtonClassName: 'secondaryButton',
          showCallEmergency: false,
          showMessage: false,
          showHealthUnits: false,
          call911: false,
        },
        MEDIUM_HIGH: {
          img: '/assets/images/results/MediumHigh.svg',
          title: literals.medium_high.title,
          secondTitle: literals.medium_high.secondTitle,
          subtitle: literals.medium_high.subtitle,
          extraSubtitle: literals.medium_high.extraSubtitle,
          recomendations: literals.medium_high.recomendations,
          showMoreButton: true,
          moreButtonClassName: 'secondaryButton',
          showCallEmergency: true,
          showMessage: false,
          showHealthUnits: 1,
          healthUnitsClassName: 'primaryButton',
          call911: false,
        },
        MEDIUM_VULNERABLE: {
          img: '/assets/images/results/grupo5.svg',
          title: literals.medium_vulnerable.title,
          secondTitle: literals.medium_vulnerable.secondTitle,
          subtitle: literals.medium_vulnerable.subtitle,
          extraSubtitle: literals.medium_vulnerable.extraSubtitle,
          recomendations: literals.medium_vulnerable.recomendations,
          showMoreButton: true,
          moreButtonClassName: 'secondaryButton',
          showCallEmergency: false,
          showMessage: false,
          showHealthUnits: false,
          healthUnitsClassName: 'primaryButton',
          call911: false,
        },
        BAD: {
          img: '/assets/images/results/Results_two_doctors.svg',
          title: literals.bad.title,
          secondTitle: literals.bad.secondTitle,
          subtitle: literals.bad.subtitle,
          recomendations: literals.bad.recomendations,
          extraSubtitle: literals.bad.extraSubtitle,
          showMoreButton: false,
          showCall: false,
          showMessage: false,
          showHealthUnits: 2,
          healthUnitsClassName: 'secondaryButton',
          call911: true,
        },
      },
    });
  }

  componentDidMount() {
    const { literals } = this.props;
    const listItems = Object.values(literals.sectionCards).map(
      (literal, ind) => ({
        text: literal,
        img: `/assets/images/results/results_${ind + 1}.svg`,
      }),
    );
    this.setState({ stateListItems: listItems });
  }

  componentDidUpdate(prevProps) {
    const {
      result,
    } = this.props;
    if (JSON.stringify(result) !== JSON.stringify(prevProps.result)) {
      this.getStatus(result);
    }
  }

  getStatus = (result) => {
    if (result.level === TEST_RESUL_LOW) this.setState({ currentLevel: 'GOOD' });
    if (result.level === TEST_RESUL_MEDIUM_LOW) this.setState({ currentLevel: 'MEDIUM_LOW' });
    if (result.level === TEST_RESUL_MEDIUM) this.setState({ currentLevel: 'MEDIUM' });
    if (result.level === TEST_RESUL_MEDIUM_HIGH) this.setState({ currentLevel: 'MEDIUM_HIGH' });
    if (result.level === TEST_RESUL_MEDIUM_VULNERABLE) this.setState({ currentLevel: 'MEDIUM_VULNERABLE' });
    if (result.level === TEST_RESUL_HIGH) this.setState({ currentLevel: 'BAD' });
  }

  canShareApp = () => {
    // eslint-disable-next-line
    return onMobileDevice();
  }

  shareApp = () => {
    // eslint-disable-next-line
    nativeShareApp();
  }

  render() {
    const {
      literals, route, result, simple, modal,
    } = this.props;
    const {
      stateListItems, currentLevel, data, redirectTests,
    } = this.state;
    if (redirectTests) return <Redirect to={`${PARENT_ROUTE_PATH.MAIN_PAGE}${ROUTE_PATH.TEST}`} />;
    if (currentLevel !== '') {
      return (
        <React.Fragment>
          <ScrollToTopOnMount />
          <section className='test-abb'>
            {!simple && (
              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-12'>
                    <div className='fixed-header'>
                      <ComponentHeader
                        title={literals.componentTitle}
                        leftIconSrc='/assets/images/Close.svg'
                        leftIconClicked={() => route.push(
                          `${PARENT_ROUTE_PATH.MAIN_PAGE}${ROUTE_PATH.TEST}`,
                          null,
                        )}
                      />
                    </div>
                    <div className='text-center result-main-img mt-4'>
                      <img
                        src={data[currentLevel].img}
                        alt=''
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
          <Content
            route={route}
            literals={literals}
            result={result}
            listItems={stateListItems}
            data={data[currentLevel]}
            modal={modal}
          />
          {(!simple && this.canShareApp()) && (
            <React.Fragment>
              <img
                className='tria'
                src='/assets/images/results/Triangles.svg'
                alt=''
              />
              <section className='toda-last'>
                <div className='container-fluid'>
                  <div className='row'>
                    <div className='col-12'>
                      <div className='toda-last-txt'>
                        <h4>{literals.footerTitle}</h4>
                        <p>{literals.footerSubtitle}</p>
                        <div className='last-ho' onClick={this.shareApp}>
                          <div className='h-id'>
                            <img src='/assets/images/results/ho.svg' alt='' />
                          </div>
                          <p>{literals.footerOpenTitle}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </React.Fragment>
          )}
        </React.Fragment>
      );
    }
    return <React.Fragment />;
  }
}

export default Results;
