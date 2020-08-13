import React from 'react';
import PropTypes from 'prop-types';

export const StepContext = React.createContext();

const StepProvider = ({
  onNextPage,
  onPreviousPage,
  data,
  diagnosisType,
  children,
  updateData,
  stepsQuestions,
}) => {
  const previousStep = onPreviousPage;
  const nextStep = onNextPage;
  return (
    <StepContext.Provider
      value={{
        previousStep,
        nextStep,
        data,
        diagnosisType,
        updateData,
        stepsQuestions,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

StepProvider.propTypes = {
  children: PropTypes.any.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onPreviousPage: PropTypes.func.isRequired,
  diagnosisType: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  stepsQuestions: PropTypes.object.isRequired,
  updateData: PropTypes.func.isRequired,
};

export default StepProvider;
