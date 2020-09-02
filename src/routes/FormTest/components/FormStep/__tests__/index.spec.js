import React from 'react';
import { mount } from 'enzyme';
import FormStep from '..';
import * as redux from 'react-redux';
import EN from 'i18n/EN';
import StepProvider from 'routes/FormTest/providers/stepProvider';
import Input from 'components/UI/Input';
import Question from '../../ToggleQuestion';

const mockApiFetch = Promise.resolve([
  { suburbID: 1, stateID: 1, municipality: 'municipality' },
  { suburbID: 2 },
]);

jest.mock('utils/apiFetch', () => {
  return jest.fn(() => mockApiFetch);
});

const questions = {
  name: {
    type: 'text',
    validator: ['required', 'lettersOnly'],
    maxLength: 25,
  },
  municipalityID: {
    type: 'select',
    validator: ['required'],
  },
  suburbID: {
    type: 'select',
    validator: ['required'],
  },
  lastname2: {
    type: 'text',
    validator: ['lettersOnly'],
    maxLength: 25,
  },
  age: {
    type: 'number',
    validator: ['required', 'numbersOnly'],
    maxLength: 2,
  },
  isAddressCorrect: {
    type: 'yesno',
    validator: ['required'],
  },
  postalCode: {
    type: 'number',
    validator: ['required', 'numbersOnly'],
    maxLength: 5,
    size: 5,
  },
  badField: {
    type: 'non-existant-type',
    validator: ['required', 'numbersOnly'],
    maxLength: 5,
    size: 5,
  },
  days: {
    type: 'inputq',
    subtype: 'number',
    validator: ['required', 'numbersOnly'],
    maxLength: 2,
  },
  symptoms: {
    type: 'yesno',
    validator: ['required'],
  },
  title: {
    type: 'text',
  },
  symptomWeek: {
    type: 'yesno',
    validator: ['required'],
    if: {
      symptoms: ['no'],
    },
  },
};

describe('FormStep tests', () => {
  let wrapper;
  const providerProps = {
    data: { municipalityLoaded: true },
    stepsQuestions: questions,
    onNextPage: jest.fn(),
    onPreviousPage: jest.fn(),
    onGoToPage: jest.fn(),
    diagnosisType: jest.fn(),
    updateData: jest.fn(),
  };

  beforeAll(() => {
    const spyUseSelector = jest.spyOn(redux, 'useSelector');
    spyUseSelector.mockReturnValue(EN.en.formTest);

    const WrappedInProvider = props => (
      <StepProvider {...props}>
        <FormStep />
      </StepProvider>
    );

    wrapper = mount(<WrappedInProvider {...providerProps} />);
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it('renders', () => {
    expect(wrapper.find(FormStep)).toBeTruthy();
    expect(wrapper.find('.si-no').length).toBe(2);
    expect(wrapper.find(Input).length).toBe(6);
    expect(wrapper.find(Question).length).toBe(3);
  });
});
