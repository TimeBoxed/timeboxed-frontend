import superagent from 'superagent';
import { deleteCookie } from '../utils/cookie';
import { TOKEN_COOKIE_KEY } from '../constants';

const removeToken = () => ({
  type: 'TOKEN_REMOVE',
});

const logout = () => {
  window.location.reload();
  deleteCookie(TOKEN_COOKIE_KEY);
  return removeToken();
};

const deleteAccountRequest = () => (store) => {
  const { token } = store.getState();
  return superagent.del(`${API_URL}/account`)
    .set('Authorization', `Bearer ${token}`)
    .then(() => {
      return logout();
    });
};

export { logout, deleteAccountRequest };
