import PropTypes from 'prop-types';
import React, {
  useState, useContext, useMemo, useEffect,
} from 'react';
import { FormContext } from 'routes/FormTest/providers/formProvider';

const FormField = ({
  component: Component, validate, onAnswer, ...rest
}) => {
  const { name } = rest;
  const [dirty, setDirty] = useState(false);
  const [touched, setTouched] = useState(false);
  const {
    addMark, reportValidity, updateValueInField, fields,
  } = useContext(
    FormContext,
  );

  const value = (fields[name] || {}).value;

  let error = '';
  addMark(() => {
    setDirty(true);
    setTouched(true);
  });

  error = useMemo(() => {
    if (validate) {
      if (Array.isArray(validate)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const validateFn of validate) {
          const errorMessage = validateFn(value);
          if (errorMessage) {
            return errorMessage;
          }
        }
      } else return validate(value);
    }
    return '';
  }, [validate, value]);

  useEffect(() => {
    reportValidity({
      name,
      valid: Boolean(!error),
    });
  }, [validate, value, error, name, reportValidity]);

  const setValueInProvider = (val) => {
    updateValueInField({
      name,
      value: val,
    });
    if (onAnswer) onAnswer({ name, val });
  };

  const final = typeof Component === 'object' ? (
    React.cloneElement(Component, {
      ...rest,
      value,
      error: touched && dirty ? error : '',
      onChange: val => (val.target
        ? setValueInProvider(val.target.value)
        : setValueInProvider(val)),
    })
  ) : (
    <Component
      {...rest}
      error={touched && dirty ? error : ''}
      value={value}
      onChange={val => (val.target
        ? setValueInProvider(val.target.value)
        : setValueInProvider(val))
      }
    />
  );

  return final;
};

FormField.propTypes = {
  component: PropTypes.any.isRequired,
};

export default FormField;
