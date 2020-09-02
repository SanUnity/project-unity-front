import { getFormConfigurationByMunicipality } from 'utils';
import { SET_FORM_CONFIGURATION } from './types';

const LOCAL_MUNICIPALITY = localStorage.getItem('CONF_MUNICIPALITY');

export const baseConf = {
  municipality: LOCAL_MUNICIPALITY || '0',
  questions: getFormConfigurationByMunicipality(LOCAL_MUNICIPALITY),
};

const formTestReducer = (state = baseConf, { type, payload }) => {
  switch (type) {
    case SET_FORM_CONFIGURATION:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};

export default formTestReducer;
