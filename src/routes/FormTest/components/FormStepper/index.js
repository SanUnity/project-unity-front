import React from 'react';
import PropTypes from 'prop-types';
/**
 * @name FormStepper
 *
 * @param {number} numberOfSteps
 * @param {number} currentStep
 * @param {func} stepClicked
 *
 * @returns {JSX}
 */

const FormStepper = ({ numberOfSteps, currentStep, stepClicked }) => {
  return (
    <div className='stepper-container'>
      {[...Array(numberOfSteps)].map((nothing, index) => {
        return (
          <React.Fragment key={`step${index}`}>
            <div
              className={`stepper-circle${
                currentStep >= index + 1 ? ' active' : ''
              }`}
              onClick={() => stepClicked && stepClicked(index)}
            >
              {index + 1}
            </div>
            <div
              className={`stepper-line${
                currentStep > index + 1 ? ' active' : ''
              }`}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

FormStepper.propTypes = {
  numberOfSteps: PropTypes.number.isRequired,
  currentStep: PropTypes.number,
  stepClicked: PropTypes.func,
};

FormStepper.defaultProps = {
  currentStep: 1,
  stepClicked: null,
};

export default FormStepper;
