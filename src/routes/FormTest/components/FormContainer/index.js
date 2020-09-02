import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import FormProvider, {
  FormContext,
} from 'routes/FormTest/providers/formProvider';
import { convertFormDataToJSONObject, displaySnackbar } from '../../../../utils';

const wrapper = props => (
  <FormProvider>
    <FormContainer {...props} />
  </FormProvider>
);

const FormContainer = ({ children, onSubmit }) => {
  const literals = useSelector(state => state.i18n.literals.formTest);
  const { markAllAsDirtyAndTouched, formValid } = useContext(FormContext);
  const formRef = useRef();

  const handleSubmit = (ev) => {
    ev.preventDefault();

    markAllAsDirtyAndTouched();

    if (formValid) {
      const obj = convertFormDataToJSONObject(new FormData(formRef.current));
      onSubmit(obj);
    } else {
      displaySnackbar();
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      {children}
      <button type='submit' className={formValid ? '' : 'disabled'}>
        {literals.continue}
      </button>
    </form>
  );
};

FormContainer.propTypes = {
  children: PropTypes.element,
  onSubmit: PropTypes.func.isRequired,
};

FormContainer.defaultProps = {
  children: null,
};

export default wrapper;
