const required = (msg = 'error') => (value) => {
  if (!value) {
    return msg;
  }
  return '';
};

const lengthMustBe = (length, msg) => (value) => {
  return `${value}`.length !== length ? msg || `Length must be ${length}` : '';
};

const numbersOnly = (msg = 'error') => (value) => {
  return /^[0-9]*$/.test(value) ? '' : msg;
};

const lettersOnly = (msg = 'error') => (value) => {
  return /^[a-zA-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/.test(value) ? '' : msg;
};

const addressValidation = (msg = 'error') => (value) => {
  return /^[0-9a-zA-Z\-,\s]*$/.test(value) ? '' : msg;
};

export default {
  required,
  lengthMustBe,
  numbersOnly,
  lettersOnly,
  addressValidation,
};
