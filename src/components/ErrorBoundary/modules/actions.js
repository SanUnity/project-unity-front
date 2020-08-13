import apiFetch from 'utils/apiFetch';
import { API_URLS } from 'constants/apiConf';

export function createLog(log) {
  return apiFetch({
    method: 'POST',
    url: API_URLS.userError,
    params: { log },
  });
}
