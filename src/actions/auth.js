import superagent from 'superagent';
import { deleteCookie } from '../utils/cookie';
import { TOKEN_COOKIE_KEY } from '../constants';
import ROUTES from '../routes';

const removeToken = () => ({
  type: 'TOKEN_REMOVE',
});

const logout = () => (store) => {
  deleteCookie(TOKEN_COOKIE_KEY);
  store.dispatch(removeToken());
  window.location.assign(ROUTES.LANDING);
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
