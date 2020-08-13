import { SET_DISPLAY_CONTAGIOS_MAP } from './types';

export default function showContagiosMapReducer(
  state = false,
  { type, payload },
) {
  switch (type) {
    case SET_DISPLAY_CONTAGIOS_MAP:
      return payload;
    default:
      return state;
  }
}
