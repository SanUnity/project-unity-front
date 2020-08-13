const FORM_FEDERAL = [
  [{}],
  [
    {},
    {
      type: 'profile',
      title: 'step1generic',
      questions: {
        name: {
          type: 'text',
          validator: ['required', 'lettersOnly'],
          maxLength: 25,
        },
        lastname1: {
          type: 'text',
          validator: ['lettersOnly'],
          maxLength: 25,
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
        gender: {
          type: 'select',
          validator: ['required'],
        },
        postalCode: {
          type: 'number',
          validator: ['required', 'numbersOnly'],
          maxLength: 5,
          size: 5,
        },
      },
    },
  ],
  [
    {},
    {
      type: 'test',
      title: 'step2generic',
      questions: {
        symptoms: {
          type: 'yesno',
          validator: ['required'],
        },
        symptomWeek: {
          type: 'yesno',
          validator: ['required'],
          if: {
            symptoms: ['no'],
          },
        },
      },
    },
  ],
  [
    {},
    {
      type: 'test',
      title: 'step3generic',
      questions: {
        diabetes: {
          type: 'yesno',
          validator: ['required'],
        },
        obesity: {
          type: 'yesno',
          validator: ['required'],
        },
        hypertension: {
          type: 'yesno',
          validator: ['required'],
        },
        defenses: {
          type: 'yesno',
          validator: ['required'],
        },
        pregnant: {
          type: 'yesno',
          validator: ['required'],
          if: {
            gender: ['female', 'nonBinary'],
          },
        },
        pregnant6: {
          type: 'yesno',
          validator: ['required'],
          if: {
            pregnant: ['yes'],
          },
        },
      },
    },
    {
      type: 'test',
      title: 'step3generic',
      questions: {
        breathing: {
          type: 'yesno',
          validator: ['required'],
        },
      },
    },
  ],
];

export const FORM_CDMX = [
  [{}],
  [
    {},
    {
      type: 'profile',
      title: 'step1generic',
      questions: {
        name: {
          type: 'text',
          validator: ['required', 'lettersOnly'],
          maxLength: 25,
        },
        age: {
          type: 'number',
          validator: ['required', 'numbersOnly'],
          maxLength: 2,
        },
        gender: {
          type: 'select',
          validator: ['required'],
        },
        postalCode: {
          type: 'number',
          validator: ['required', 'numbersOnly'],
          maxLength: 5,
          size: 5,
        },
      },
    },
  ],
  [
    {},
    {
      type: 'test',
      title: 'step2generic',
      questions: {
        meet: {
          type: 'yesno',
          validator: ['required'],
        },
        fever: {
          type: 'yesno',
          validator: ['required'],
        },
        headache: {
          type: 'yesno',
          validator: ['required'],
        },
        cough: {
          type: 'yesno',
          validator: ['required'],
        },
        chestPain: {
          type: 'yesno',
          validator: ['required'],
        },
        throatPain: {
          type: 'yesno',
          validator: ['required'],
        },
        breathing: {
          type: 'yesno',
          validator: ['required'],
          literal: 'breathingCDMX',
        },
        snot: {
          type: 'yesno',
          validator: ['required'],
        },
      },
    },
    {
      type: 'test',
      title: 'step2generic',
      questions: {
        pain: {
          type: 'yesno',
          validator: ['required'],
        },
        conjunctivitis: {
          type: 'yesno',
          validator: ['required'],
        },
        days: {
          type: 'inputq',
          subtype: 'number',
          validator: ['required', 'numbersOnly'],
          maxLength: 2,
        },
        pregnant: {
          type: 'yesno',
          validator: ['required'],
          if: {
            gender: ['female', 'nonBinary'],
          },
        },
        pregnant6: {
          type: 'yesno',
          validator: ['required'],
          if: {
            pregnant: ['yes'],
          },
        },
        blue: {
          type: 'yesno',
          validator: ['required'],
        },
        conditions: {
          type: 'yesno',
          validator: ['required'],
        },
      },
    },
    {
      type: 'test',
      title: 'step2generic',
      questions: {
        respiratoryPain: {
          type: 'yesno',
          validator: ['required'],
        },
        breathing2: {
          type: 'yesno',
          validator: ['required'],
        },
        sickFamily: {
          type: 'yesno',
          validator: ['required'],
        },
      },
    },
  ],
  [
    {},
    {
      type: 'profile',
      title: 'step3generic',
      questions: {
        imss: {
          type: 'yesno',
          validator: ['required'],
        },
        name: {
          type: 'text',
          validator: ['required', 'lettersOnly'],
          maxLength: 25,
        },
        lastname1: {
          type: 'text',
          validator: ['lettersOnly'],
          maxLength: 25,
        },
        lastname2: {
          type: 'text',
          validator: ['lettersOnly'],
          maxLength: 25,
        },
      },
    },
    {
      type: 'profile',
      title: 'step3generic',
      questions: {
        street: {
          type: 'text',
          validator: ['required', 'addressValidation'],
          maxLength: 30,
        },
        numberExternal: {
          type: 'text',
          validator: ['required', 'addressValidation'],
          maxLength: 20,
        },
        numberInternal: {
          type: 'text',
          validator: ['required', 'addressValidation'],
          maxLength: 20,
        },
        municipalityID: {
          type: 'select',
          validator: ['required'],
        },
        suburbID: {
          type: 'select',
          validator: ['required'],
        },
        isAddressCorrect: {
          type: 'yesno',
          validator: ['required'],
        },
      },
    },
  ],
];

export default FORM_FEDERAL;
