/* eslint-disable no-restricted-syntax */
import React from 'react';
import ComponentHeader from 'components/UI/ComponentHeader';
import PropTypes from 'prop-types';
import history from 'store/history';
import apiFetch from 'utils/apiFetch';
import { API_URLS } from 'constants/apiConf';
import { sessionService } from 'redux-react-session';
// import EditProfile from 'components/EditProfile';

import FormStepper from './FormStepper';
import FormRouter from './FormRouter';

import StepProvider from '../providers/stepProvider';
import Warning from '../icons/Warning';
import { transformYesAndNo } from '../../../utils';

export const TYPE_NONE = 'none';
export const TYPE_LIGHT = 'light';
export const TYPE_SERIOUS = 'serious';

class FormTest extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    literals: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    result: PropTypes.object.isRequired,
    showLoading: PropTypes.func.isRequired,
    formTestConf: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    const testDetails = JSON.parse(localStorage.getItem('testDetails')) || {};
    let type = TYPE_NONE;
    if (Object.keys(testDetails).length) {
      type = this.checkType(testDetails);
    } else {
      localStorage.removeItem('profile');
    }

    const { formTestConf } = props;

    this.steps = formTestConf.reduce((acc, subSteps) => {
      const arraySubRoutes = [];

      subSteps.forEach((step, i) => {
        if (Object.keys(step).length) {
          arraySubRoutes.push({
            path: `/${i}`,
          });
        }
      });

      acc.push(arraySubRoutes);

      return acc;
    }, []);

    let substepsAcc = 0;

    this.substepsMap = this.steps.reduce((acc, substeps, ind) => {
      if (!substeps.length) return acc;

      substeps.forEach((_, i) => {
        acc[i + substepsAcc + 1] = ind;
      });

      substepsAcc += substeps.length;

      return acc;
    }, {});

    this.state = {
      type,
      data: testDetails,
      pcError: '',
    };
  }

  componentDidMount() {
    this.determineStepFromRoute();
  }

  componentDidUpdate(prevProps) {
    const {
      result,
      showLoading,
    } = this.props;
    if (JSON.stringify(result) !== JSON.stringify(prevProps.result) && result.id && result.id !== '') {
      showLoading(false);
      localStorage.removeItem('testDetails');
      history.push('/results', null);
    }
    this.determineStepFromRoute();
  }

  createProfile = (data) => {
    return apiFetch({
      method: 'POST',
      url: `${API_URLS.userProfile}`,
      params: data,
    });
  };

  getProfile = (id) => {
    return apiFetch({
      method: 'GET',
      url: `${API_URLS.userProfile}/${id}`,
    });
  }

  handleSubmit = async () => {
    const { data } = this.state;
    const { showLoading, submitTest, formTestConf } = this.props;
    try {
      showLoading(true);
      await submitTest(transformYesAndNo(data), formTestConf);
    } catch (err) {
      console.error('error', err);
      showLoading(false);
      console.error(err);
      localStorage.removeItem('testDetails');
      if (err && err.response && err.response.status === 402) {
        history.push('/main/test', null);
      }
    }
  };

  createHome = ({ municipality, state }) => {
    let res = '';
    if (municipality !== '') res = `${municipality}`;
    if (state !== '') res += `${res !== '' ? ', ' : ''}${state}`;
    return res;
  }

  handlePageChange = async () => {
    const {
      currentStep, currentSubstep, data, stepsCounter,
    } = this.state;

    const { showLoading, literals } = this.props;

    if (currentStep === 2) {
      const existingProfile = Boolean(localStorage.getItem('profile'));
      if (!existingProfile) {
        showLoading(true);

        let postalCodeData = [{}];

        try {
          postalCodeData = await apiFetch({
            method: 'GET',
            url: `${API_URLS.postalCodes(data.postalCode)}`,
          });

          if (!postalCodeData.length) {
            showLoading(false);
            this.setState({
              currentStep: currentStep - 1,
              stepsCounter: stepsCounter - 1,
              pcError: literals.postalCodeError,
            }, () => {
              setTimeout(() => {
                this.setState({ pcError: '' });
              }, 4000);
            });
            return;
          }
        } catch (err) {
          showLoading(false);
          this.setState({
            currentStep: currentStep - 1,
            stepsCounter: stepsCounter - 1,
            pcError: literals.postalCodeError,
          }, () => {
            setTimeout(() => {
              this.setState({ pcError: '' });
            }, 4000);
          });
          return;
        }

        try {
          const profile = await this.createProfile({ ...data, ...postalCodeData[0] });
          data.home = this.createHome(postalCodeData[0]);
          showLoading(false);
          localStorage.setItem('profile', JSON.stringify(profile));
          const { profiles, ...user } = await sessionService.loadUser();
          const isDefault = profiles.length === 0;

          sessionService.saveUser({
            ...user,
            profiles: [{
              ...profile, ...data, ...postalCodeData[0], isDefault, pcr: [],
            }, ...profiles],
          });
        } catch (err) {
          showLoading(false);
          this.setState({
            currentStep: currentStep - 1,
            pcError: literals.createProfileError,
          }, () => {
            setTimeout(() => {
              this.setState({ pcError: '' });
            }, 4000);
          });
          return;
        }
      }
    }
    // if (currentStep > 1 && currentSubstep > 2) {
    //   await this.handleSubmit();
    //   return;
    // }
    // if (currentStep === 3) {
    //   const atLeastOneYes = Object.keys(data)
    //     .filter(key => [
    //       'symptoms',
    //       // 'cough',
    //       // 'throatPain',
    //       // 'headache',
    //       // 'symptomWeek',
    //     ].includes(key))
    //     .some(key => data[key] === 'yes');
    //   if (!atLeastOneYes) {
    //     await this.handleSubmit();
    //     return;
    //   }
    // }

    // if (currentStep === 3) {
    //   const atLeastOneYes = Object.keys(data)
    //     .filter(key => [
    //       'symptoms',
    //     ].includes(key))
    //     .some(key => data[key] === 'yes');
    //   if (!atLeastOneYes) {
    //     await this.handleSubmit();
    //     return;
    //   }
    // }

    localStorage.setItem('testDetails', JSON.stringify(data));

    history.push(`../${currentStep}/${currentSubstep}`);

    if (this.formtest) {
      this.formtest.scrollTo(0, 0);
    }
  };

  nextPage = (obj) => {
    const {
      data: oldData,
      numberOfSteps,
      currentStep,
      currentSubstep,
      stepsCounter,
    } = this.state;

    if (stepsCounter < numberOfSteps) {
      const newStep = this.substepsMap[stepsCounter + 1];
      const newSubstep = newStep !== currentStep ? 1 : currentSubstep + 1;

      this.setState(
        {
          data: {
            ...oldData,
            ...obj,
            newStep,
            newSubstep,
          },
          currentSubstep: newSubstep,
          stepsCounter: stepsCounter + 1,
          currentStep: newStep,
          type: this.checkType(),
        },
        this.handlePageChange,
      );
    } else {
      this.setState(
        {
          data: { ...oldData, ...obj },
        },
        this.handleSubmit,
      );
    }
  };

  previousPage = () => {
    const {
      data: oldData,
      currentSubstep,
      currentStep,
      stepsCounter,
    } = this.state;

    if (currentStep > 1) {
      const newStep = this.substepsMap[stepsCounter - 1];
      const newSubstep = newStep !== currentStep ? this.steps[newStep].length : currentSubstep - 1;

      if (newStep > 1) {
        this.setState(
          {
            data: {
              ...oldData,
              newStep,
              newSubstep,
            },
            currentSubstep: newSubstep,
            currentStep: newStep,
            stepsCounter: stepsCounter - 1,
            type: this.checkType(),
          },
          this.handlePageChange,
        );
      } else {
        this.deleteLocalTestData();
        history.push('/');
      }
    } else {
      this.deleteLocalTestData();
      history.push('/');
    }
  };

  deleteLocalTestData = () => {
    localStorage.removeItem('profile');
    localStorage.removeItem('postalCodeData');
    localStorage.removeItem('testDetails');
  }

  checkType = (primaryData) => {
    const { data: stateData } = this.state || {};
    const data = primaryData || stateData;

    let type = '';
    let evaluation1 = 0;
    let evaluation2 = 0;

    Object.keys(data).forEach((q) => {
      switch (q) {
        case 'fever':
        case 'headache':
        case 'cough':
          if (data[q] === 'yes') {
            evaluation1 += 1;
          }
          break;

        case 'chestPain':
        case 'throatPain':
        case 'snot':
        case 'pain':
        case 'conjunctivitis':
        case 'breathing':
          if (data[q] === 'yes') {
            evaluation2 += 1;
          }
          break;
        default:
          break;
      }
    });

    if (evaluation1 >= 2 && evaluation2 >= 1) {
      type = TYPE_LIGHT;

      if (data.breathing) {
        type = TYPE_SERIOUS;
      }
    } else {
      type = TYPE_NONE;
    }
    return type;
  };

  getTitleByCurrentStep = () => {
    const { formTestConf, literals } = this.props;
    const {
      currentStep, currentSubstep,
    } = this.state;

    return literals.stepsTitles[formTestConf[currentStep][currentSubstep].title];
  };

  determineStepFromRoute() {
    const {
      location: { pathname },
    } = this.props;
    if (pathname === this.lastPathname) return;

    this.lastPathname = pathname;
    const currentStep = Number((pathname.match(/\d+/gim) || [])[0]) || 1;
    const currentSubstep = Number((pathname.match(/\d+/gim) || [])[1]) || 1;

    const numberOfSubstepsBeforeCurrentStep = Object.values(
      this.substepsMap,
    ).findIndex(key => Number(key) === currentStep);
    const stepsCounter = currentStep === 1
      ? currentSubstep
      : numberOfSubstepsBeforeCurrentStep + currentSubstep;

    const numberOfSteps = this.steps.reduce((acc, { length }) => {
      // eslint-disable-next-line no-param-reassign
      acc += length;
      return acc;
    }, 0);

    const type = this.checkType();
    this.setState({
      currentStep,
      currentSubstep,
      stepsCounter,
      numberOfSteps,
      type,
    });
  }

  render() {
    const { match, formTestConf, literals } = this.props;
    const {
      currentStep, currentSubstep, data, type, pcError,
    } = this.state;

    if (!currentStep) {
      return 'loading';
    }

    return (
      <div
        ref={(ft) => {
          this.formtest = ft;
        }}
        className='form-test'
      >
        <div id='snackbar' className={`snackbar ${pcError !== '' ? 'show' : ''}`}>
          <Warning />
          <div className='snackbar__text'>{pcError !== '' ? pcError : literals.snackbar}</div>
        </div>
        <header>
          <ComponentHeader
            title={literals.title}
            leftIconSrc='/assets/images/green-arrow.svg'
            leftIconClicked={this.previousPage}
          />

          <FormStepper
            numberOfSteps={this.steps.length - 1}
            currentStep={currentStep}
          />

          <div className='subtitle'>
            <span className='hashtag'>{literals.general.hashtag}</span>
            <h5>{this.getTitleByCurrentStep()}</h5>
          </div>
        </header>
        <main>
          <StepProvider
            data={data}
            stepsQuestions={formTestConf[currentStep][currentSubstep].questions}
            onNextPage={this.nextPage}
            onPreviousPage={this.previousPage}
            onGoToPage={this.goToPage}
            diagnosisType={type || TYPE_NONE}
            updateData={(obj, cb) => {
              this.setState(({ data: oldData }) => {
                const newData = { ...oldData, ...obj };
                localStorage.setItem('testDetails', JSON.stringify(newData));
                return { data: newData };
              }, cb);
            }}
          >
            <FormRouter match={match} formTestConf={formTestConf} />
          </StepProvider>
        </main>
      </div>
    );
  }
}

export default FormTest;
