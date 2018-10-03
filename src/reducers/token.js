import { fetchCookie } from '../utils/cookie';

const token = fetchCookie('GT1234567890');
const initialState = token || null;

export default (state = initialState, { type }) => {
  switch (type) {
    case 'TOKEN_REMOVE':
      return null;
    default:
      return state;
  }
};
