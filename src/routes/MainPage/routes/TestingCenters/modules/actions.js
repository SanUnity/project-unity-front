import { SAVE_LOCATION } from './types';

export function saveLocation(payload) {
  return {
    type: SAVE_LOCATION,
    payload,
  };
}
