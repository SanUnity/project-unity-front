import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Button from 'components/UI/Button';
import { BT_ACTIVE_FOR_ALL, BT_ACTIVE_STATES } from 'routes/App/userSession';

const sliderSettings = {
  dots: true,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

class Onboarding extends Component {
  constructor(props) {
    super(props);

    this.slider = React.createRef();

    const { literals: { steps: onboardingSteps } } = props;
    const state = localStorage.getItem('CONF_MUNICIPALITY');
    const activeBT = BT_ACTIVE_FOR_ALL || BT_ACTIVE_STATES.indexOf(state) >= 0;
    const steps = activeBT ? onboardingSteps : onboardingSteps.filter(s => s.id !== 2);

    this.state = {
      steps,
    };
  }

  handleClick = (action, index) => {
    const { onFinish } = this.props;
    const { steps } = this.state;

    switch (action) {
      case 'activateBT':
        if ((index + 1) === steps.length) {
          window.activateBT();
          onFinish();
        } else {
          window.activateBT();
          this.slider.current.slickNext();
        }
        break;
      case 'continue':
      case 'skip':
        if ((index + 1) === steps.length) {
          onFinish();
        } else {
          this.slider.current.slickNext();
        }
        break;

      default:
    }
  }

  render() {
    const { literals } = this.props;
    const { steps } = this.state;

    return (
      <div className='onboarding-main-wrapper'>
        <Slider ref={this.slider} {...sliderSettings}>
          {steps.map((step, index) => (
            <div className='onboarding-step-wrapper' key={index}>
              <img className='onboarding-icon' src={step.img} alt='' />
              <h2 className='onboarding-title'>{step.title}</h2>
              <p className='onboarding-description'>{step.description}</p>

              <Button
                label={step.actionTxt}
                onClick={() => this.handleClick(step.action, index)}
              />
              {step.skip && (
                <p className='onboarding-skip' onClick={() => this.handleClick('skip', index)}>{literals.skipBtn}</p>
              )}
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
Onboarding.displayName = 'Onboarding';
Onboarding.propTypes = {
  literals: PropTypes.object.isRequired,
  onFinish: PropTypes.func.isRequired,
};

export default Onboarding;
