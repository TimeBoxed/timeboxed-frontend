import { deleteCookie } from '../utils/cookie';
import { TOKEN_COOKIE_KEY } from '../constants';

const removeToken = () => ({
  type: 'TOKEN_REMOVE',
});

const logout = () => {
  location.reload();
  deleteCookie(TOKEN_COOKIE_KEY);
  return removeToken();
};

export { removeToken, logout };
