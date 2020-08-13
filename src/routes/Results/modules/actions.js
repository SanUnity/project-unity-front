/* eslint-disable no-restricted-syntax */
import { sessionService } from 'redux-react-session';
import { API_URLS } from 'constants/apiConf';
import { TEST_RESUL_HIGH } from 'constants/tests';
import apiFetch from '../../../utils/apiFetch';
import { RESULTS_AQUIRED } from './types';

// const testQuestions = [
//   'symptoms',
//   'symptomWeek',
//   'diabetes',
//   'obesity',
//   'hypertension',
//   'defenses',
//   'breathing',
//   'pregnant',
// ];

export function submitTest(data, formTestConf) {
  const testQuestions = formTestConf.reduce((acc, conf) => {
    conf.forEach((value) => {
      if (typeof value.questions !== 'undefined' && value.type === 'test') {
        // eslint-disable-next-line
        acc = [...Object.keys(value.questions), ...acc];
      }
    });
    return acc;
  }, []);

  return async (dispatch) => {
    const user = await sessionService.loadUser();
    const {
      profiles,
      profiles: [defaultProfile],
    } = user;

    const profileID = (
      JSON.parse(localStorage.getItem('profile')) || defaultProfile
    ).id;

    const answers = {};
    const profileData = {};

    // console.log(' ----- submitTest ------ ');
    // console.log('data:', data);
    for (const prop in data) {
      if (testQuestions.includes(prop)) {
        answers[prop] = data[prop];
      } else {
        profileData[prop] = data[prop];
      }
    }

    testQuestions.forEach((prop) => {
      if (typeof answers[prop] === 'undefined') {
        answers[prop] = null;
      }
    });

    // console.log('answers:', answers);
    // console.log('profileData:', profileData);

    const postalCodeData = JSON.parse(localStorage.getItem('postalCodeData'));

    if (postalCodeData) {
      // eslint-disable-next-line
      const postalCodeSelectedData = postalCodeData.find(p => p.suburbID == profileData.suburbID);

      profileData.state = postalCodeSelectedData.state;
      profileData.municipality = postalCodeSelectedData.municipality;
      profileData.suburb = postalCodeSelectedData.suburb;
    }

    apiFetch({
      method: 'PUT',
      url: `${API_URLS.userProfile}/${profileID}`,
      params: profileData,
    }).then((editedProfile) => {
      apiFetch({
        method: 'POST',
        url: `${API_URLS.userProfile}/${profileID}/tests`,
        params: answers,
      }).then((testResult) => {
        sessionService.saveUser({
          ...user,
          profiles: profiles.map((profile) => {
            if (profile.id === profileID) return { ...profile, ...editedProfile, ...testResult };
            return profile;
          }),
        });

        if (testResult.level === TEST_RESUL_HIGH) {
          // eslint-disable-next-line
          sendTraceData();
        }

        // remove local objects on successful submission
        localStorage.removeItem('profile');
        localStorage.removeItem('postalCodeData');

        dispatch({ type: RESULTS_AQUIRED, payload: testResult });
      }).catch((error) => {
        console.error(error);
      });
    }).catch((error) => {
      console.error(error);
    });
  };
}
