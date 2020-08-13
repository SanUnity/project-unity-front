import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StepContext } from './stepProvider';

export const FormContext = React.createContext();

let fields = {};

const FormProvider = ({ children }) => {
  const marks = new Set();
  const [formValid, setFormValid] = useState(false);
  const { data, updateData } = useContext(StepContext);

  useEffect(() => {
    Object.entries(data)
      .filter(([name]) => Object.keys(fields).includes(name))
      .forEach(([name, value]) => {
        fields[name] = {
          name,
          value,
          valid: true,
        };
      });
  }, [data]);

  useEffect(() => {
    return () => {
      fields = {};
    };
  }, []);

  const addMark = (mark) => {
    marks.add(mark);
  };

  const reportValidity = (field) => {
    const existingField = fields[field.name];
    if (existingField) {
      existingField.valid = field.valid;
    } else {
      fields[field.name] = field;
    }

    const newFormValid = Object.values(fields).every(f => f.valid);
    setFormValid(newFormValid);
  };

  const markAllAsDirtyAndTouched = () => {
    marks.forEach(mark => mark());
  };

  const updateValueInField = (field) => {
    const existingField = fields[field.name];
    if (existingField) {
      existingField.value = field.value;
    } else {
      fields[field.name] = field;
    }

    updateData(
      Object.values(fields).reduce((acc, f) => {
        acc[f.name] = f.value;
        return acc;
      }, {}),
    );
  };

  return (
    <FormContext.Provider
      value={{
        addMark,
        fields,
        updateValueInField,
        markAllAsDirtyAndTouched,
        reportValidity,
        formValid,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

FormProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default FormProvider;
