import axios from 'axios';
import { sessionService } from 'redux-react-session';
import { getHeaders, API_BASE_URL } from '../constants/apiConf';

/**
 * @name transformGetParams
 * Transforms an object param into a key/value string
 *
 * @param {object} params
 *
 * @return {String}
 */
function transformGetParams(params) {
  let paramsString = '?';

  Object.keys(params).map((param, index) => {
    paramsString += index > 0 ? '&' : '';
    paramsString += `${param}=${params[param]}`;

    return param;
  });

  return paramsString;
}

/**
 * @name apiFetch
 * Sends a request with the required headers to API
 *
 * @param {string} method           HTTP Method (GET, POST, PUT, PATCH, etc)
 * @param {object} url              Object with an endPoint attribute (required)
 * @param {(string|object)} params  Request params. If it's an object, it will be stringified before doing the request.
 *
 * @return {string|object}          Returns the body of the request, trying to parse it as JSON first. If an error ocurrs during parsing, the raw body is returned as a string.
 */
export default async function apiFetch({
  method,
  url,
  params,
  headers: additionalHeaders,
  withAuthorization = true,
  isFormData = false,
}) {
  let token;
  try {
    token = (await sessionService.loadSession()).token;
  // eslint-disable-next-line no-empty
  } catch (err) {
  }

  const headers = {
    ...(await getHeaders(isFormData)),
    ...additionalHeaders,
    ...(withAuthorization && token && { Authorization: `Bearer ${token}` }),
  };

  const CONFIG = {
    method,
    headers,
    withCredentials: false,
  };

  let URL = `${API_BASE_URL}/${url}`;
  if (params) {
    if (typeof params === 'object') {
      switch (method) {
        case 'GET':
        case 'DELETE':
          URL += transformGetParams(params);
          break;

        case 'POST':
        case 'PUT':
        default:
          CONFIG.body = JSON.stringify(params);
          if (isFormData) {
            const formData = new FormData();
            Object.keys(params).forEach((key) => {
              formData.append(
                key,
                typeof params[key] === 'object'
                  ? JSON.stringify(params[key])
                  : params[key],
              );
            });
            CONFIG.data = formData;
          } else {
            CONFIG.data = JSON.stringify(params);
          }
          break;
      }
    }
  }
  CONFIG.url = URL;
  return axios(CONFIG)
    .then(response => response.data)
    .catch((error) => {
      throw error;
    });
}
