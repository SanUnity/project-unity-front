import { loadingAction } from 'store/globalState/global';
import { getFormConfigurationByMunicipality } from 'utils';
import { SET_FORM_CONFIGURATION } from './types';

export function setFormTestConfiguration(conf) {
  return {
    type: SET_FORM_CONFIGURATION,
    payload: conf,
  };
}

export default function setMunicipalityConfigurationAction(municipality) {
  return (dispatch) => {
    dispatch(loadingAction(true));

    const baseConf = {
      municipality,
      questions: getFormConfigurationByMunicipality(municipality),
    };

    localStorage.setItem('CONF_MUNICIPALITY', municipality);

    dispatch(setFormTestConfiguration(baseConf));
    dispatch(loadingAction(false));
  };
}
