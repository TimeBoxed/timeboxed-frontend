import superagent from 'superagent';

const TEMP_API_URL = 'http://localhost:3000';

const setProfile = profile => ({
  type: 'CLIENT_PROFILE_SET',
  payload: profile,
});

const profileFetchRequest = () => (store) => {
  const { token } = store.getState();
  return superagent.get(`${TEMP_API_URL}/profiles/me`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .then((response) => {
      return store.dispatch(setProfile(response.body));
    });
};

const profileUpdateRequest = profile => (store) => {
  const { token } = store.getState();
  return superagent.put(`${TEMP_API_URL}/profile`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(profile)
    .then((response) => {
      return store.dispatch(setProfile(response.body));
    });
};

export { profileUpdateRequest, profileFetchRequest };
