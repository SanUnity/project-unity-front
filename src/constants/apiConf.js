export const API_BASE_URL = process.env.REACT_APP_API_URL;

export const HEADERS = {
  Accept: 'application/json',
};

export async function getHeaders(isFormData = false) {
  const headers = HEADERS;

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
}

export const API_URLS = {
  // USERS
  userSession: 'users/session',
  userSignup: 'users/signup',
  userError: 'users/error',
  userSignupAnonymous: 'users/signup/anonymous',
  userValidate: 'users/validate',
  userProfile: 'users/profiles',
  userSetState: 'users/state',
  userFavoriteStates: 'users/semaphore/fav',
  userProfileId: profileID => `users/profiles/${profileID}`,
  saveUserTest: profileID => `users/profiles/${profileID}/tests`,
  saveUserPCRTest: profileID => `users/profiles/${profileID}/pcr`,
  setProfileAsMain: profileID => `users/profiles/${profileID}/main`,
  validateCenterId: centerID => `users/centers/${centerID}/validate`,
  validatePCRField: (profileID, pcrID) => `users/profiles/${profileID}/pcr/${pcrID}/validate`,
  setPCRReaded: (profileID, pcrID) => `users/profiles/${profileID}/pcr/${pcrID}/readed`,
  sendPCRNotification: (profileID, pcrID) => `users/profiles/${profileID}/pcr/${pcrID}/notify`,
  states: 'states',
  statesMunicipalities: stateID => `states/${stateID}/municipalities`,
  statesMunicipalitiesHospitals: (stateID, municipalityID) => `states/${stateID}/municipalities/${municipalityID}/hospitals`,

  // ADMINS
  adminTests: 'admins/test',

  // POSTAL CODES
  postalCodes: postalCode => `postalCodes/${postalCode}`,

  municipalitiesInfo: 'municipalities/info',
  statesInfo: 'states/info',

  setExposed: 'exposed/contact',
};
