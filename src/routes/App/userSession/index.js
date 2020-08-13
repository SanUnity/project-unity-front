import { sessionService } from 'redux-react-session';
import apiFetch from 'utils/apiFetch';
import { API_URLS } from 'constants/apiConf';
import history from 'store/history';

export const BT_ACTIVE_FOR_ALL = true;
export const BT_ACTIVE_STATES = [];

class UserSession {
  static checked = false;

  static updateSession = async ({
    jwt,
    covidPositive,
    mainProfile,
    exposed,
    state,
    ...rest
  }) => {
    sessionService.saveSession({ token: jwt });

    const BT_ACTIVE = BT_ACTIVE_FOR_ALL || BT_ACTIVE_STATES.indexOf(state) >= 0;

    const user = {
      ...rest, mainProfile, state, bt_active: BT_ACTIVE,
    };
    user.profiles = user.profiles.filter(p => p.name);
    user.profiles = user.profiles.map((p) => {
      const isDefault = p.id === mainProfile;
      return {
        ...p,
        isDefault,
      };
    });

    // if (covidPositive !== undefined && covidPositive && BT_ACTIVE) {
    //   window.sendTraceData();
    // }

    if (exposed !== undefined && exposed) {
      history.push('/main/faq/exposed');
    }

    if (state === null) {
      localStorage.removeItem('CONF_MUNICIPALITY');
    } else {
      localStorage.setItem('CONF_MUNICIPALITY', state);
    }

    sessionService.saveUser(user);

    window.sendUserIdentifier(rest.id, jwt);

    if (BT_ACTIVE) {
      window.getBTStatus();
    }
  };

  static fetchSession = () => {
    return apiFetch({
      method: 'GET',
      url: API_URLS.userSession,
    });
  };

  static checkSession = async () => {
    if (this.checked) return sessionService.loadUser();
    this.checked = true;

    const response = await this.fetchSession();
    this.updateSession(response);
    return response;
  };
}

export default UserSession;
