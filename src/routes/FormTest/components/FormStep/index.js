/* eslint-disable react/no-danger, react-hooks/exhaustive-deps */
import React, {
  useContext, useMemo, useEffect, useCallback,
} from 'react';
import { useSelector } from 'react-redux';
import Question from 'routes/FormTest/components/ToggleQuestion';
import SiNo from 'components/UI/SiNo';
import Input from 'components/UI/Input';
import SelectInput from 'components/SelectInput';
import apiFetch from 'utils/apiFetch';
import { API_URLS } from 'constants/apiConf';
import FormField from 'routes/FormTest/components/FormField';
import validators from 'routes/FormTest/components/validators';
import { StepContext } from 'routes/FormTest/providers/stepProvider';
import FormContainer from '../FormContainer';

const SiNoQuestion = <Question component={SiNo} />;
const InputQuestion = <Question component={Input} />;
const questionsOptions = {};

const questionValidators = {
  required: validators.general.required(),
  lengthMustBe: validators.general.lengthMustBe,
  numbersOnly: validators.general.numbersOnly(),
  lettersOnly: validators.general.lettersOnly(),
  addressValidation: validators.general.addressValidation(),
};

const FormStep = () => {
  /* istanbul ignore next: no need to test a hook */
  const literals = useSelector(state => state.i18n.literals.formTest);
  const {
    nextStep,
    data,
    stepsQuestions,
    updateData,
  } = useContext(StepContext);
  const stableUpdateData = useCallback(updateData, []);

  const baseQuestions = Object.keys(stepsQuestions).filter(q => typeof stepsQuestions[q].if === 'undefined');
  const dependantQuestions = Object.keys(stepsQuestions).filter(q => typeof stepsQuestions[q].if !== 'undefined');
  const dependencies = {};
  dependantQuestions.forEach((d) => {
    Object.keys(stepsQuestions[d].if).forEach((dq) => {
      dependencies[dq] = {
        question: d,
        conditions: stepsQuestions[d].if[dq],
      };
    });
  });

  const handleSubmit = (answers) => {
    nextStep(answers);
  };

  useEffect(() => {
    const checkMunicipalityQuestion = async () => {
      try {
        const postalCodeData = await apiFetch({
          method: 'GET',
          url: `${API_URLS.postalCodes(data.postalCode)}`,
        });

        localStorage.setItem('postalCodeData', JSON.stringify(postalCodeData));

        questionsOptions.municipalityID = postalCodeData.map(({ municipalityID, municipality }) => ({
          id: municipalityID,
          title: municipality,
          value: municipalityID,
        }));

        questionsOptions.municipalityID = Array.from(
          new Set(questionsOptions.municipalityID.map(opt => JSON.stringify(opt))),
        ).map(opt => JSON.parse(opt));

        if (baseQuestions.indexOf('suburbID') >= 0) {
          questionsOptions.suburbID = postalCodeData.map(({ suburbID, suburb }) => ({
            id: suburbID,
            title: suburb,
            value: suburbID,
          }));
        }

        stableUpdateData({ municipalityLoaded: true });
      } catch (error) {
        console.error('error', error);
      }
    };

    if (
      baseQuestions.indexOf('municipalityID') >= 0
      && (!data.municipalityLoaded || typeof questionsOptions.municipalityID === 'undefined')
    ) {
      checkMunicipalityQuestion();
    }
  }, []);

  const questions = useMemo(() => {
    const newQuestions = [...baseQuestions];

    Object.keys(dependencies).forEach((d) => {
      if (dependencies[d].conditions.indexOf(data[d]) >= 0) {
        const qIndex = newQuestions.indexOf(d);

        if (qIndex > 0) {
          newQuestions.splice((qIndex + 1), 0, dependencies[d].question);
        } else {
          newQuestions.push(dependencies[d].question);
        }
      }
    });

    return newQuestions;
  }, [data, baseQuestions, dependencies]);

  return (
    <FormContainer onSubmit={handleSubmit}>
      <div className='question-list'>
        {questions.map((question) => {
          let validations = [];
          let literalsConf = literals[question];

          if (stepsQuestions[question].validator && stepsQuestions[question].validator.length) {
            validations = stepsQuestions[question].validator.map(v => questionValidators[v]);
          }

          if (typeof stepsQuestions[question].size !== 'undefined') {
            validations.push(questionValidators.lengthMustBe(parseInt(stepsQuestions[question].size, 10)));
          }

          if (typeof stepsQuestions[question].literal !== 'undefined') {
            literalsConf = literals[stepsQuestions[question].literal];
          }

          switch (stepsQuestions[question].type) {
            case 'text':
              return (
                <div className='form-group' key={question} name={`question-${question}`}>
                  <FormField
                    key={question}
                    name={question}
                    type='text'
                    component={Input}
                    label={literalsConf.label}
                    placeholder={literalsConf.placeholder}
                    validate={validations}
                    maxLength={stepsQuestions[question].maxLength}
                  />
                  {literalsConf.subLabel && (
                    <span
                      className='form-field-sub-label'
                      dangerouslySetInnerHTML={{ __html: literalsConf.subLabel }}
                    />
                  )}
                </div>
              );
            case 'select':
              return (
                <div className='form-group' key={question} name={`question-${question}`}>
                  <FormField
                    name={question}
                    component={SelectInput}
                    label={literalsConf.label}
                    placeholder={literalsConf.placeholder}
                    options={typeof questionsOptions[question] !== 'undefined' ? questionsOptions[question] : literalsConf.options}
                    validate={validations}
                  />
                  {literalsConf.subLabel && (
                    <span
                      className='form-field-sub-label'
                      dangerouslySetInnerHTML={{ __html: literals[question].subLabel }}
                    />
                  )}
                </div>
              );
            case 'number':
              return (
                <div className='form-group' key={question} name={`question-${question}`}>
                  <FormField
                    name={question}
                    type='number'
                    component={Input}
                    label={literalsConf.label}
                    placeholder={literalsConf.placeholder}
                    validate={validations}
                    maxLength={stepsQuestions[question].maxLength}
                  />
                  {literalsConf.subLabel && (
                    <span
                      className='form-field-sub-label'
                      dangerouslySetInnerHTML={{ __html: literalsConf.subLabel }}
                    />
                  )}
                </div>
              );
            case 'yesno':
              return (
                <div className='form-group' key={question} name={`question-${question}`}>
                  <FormField
                    key={question}
                    name={question}
                    component={SiNoQuestion}
                    label={literalsConf.label}
                    subLabel={literalsConf.subLabel}
                    validate={validations}
                  />
                </div>
              );
            case 'inputq':
              return (
                <div className='form-group' key={question} name={`question-${question}`}>
                  <FormField
                    name={question}
                    type={stepsQuestions[question].subtype}
                    component={InputQuestion}
                    label={literalsConf.label}
                    subLabel={literalsConf.subLabel}
                    placeholder={literalsConf.placeholder}
                    validate={validations}
                    maxLength={stepsQuestions[question].maxLength}
                  />
                </div>
              );

            default: return null;
          }
        })}
      </div>
    </FormContainer>
  );
};

export default FormStep;
