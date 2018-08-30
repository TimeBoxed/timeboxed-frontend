import superagent from 'superagent';

const setProfile = profile => ({
  type: 'CLIENT_PROFILE_SET',
  payload: profile,
});

const removeProfile = profile => ({
  type: 'REQUEST_PROFILE_REMOVE',
  payload: profile,
});

const profileFetchRequest = () => (store) => {
  const { token } = store.getState();
  return superagent.get(`${API_URL}/profiles/me`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .then((response) => {
      return store.dispatch(setProfile(response.body));
    });
};

const profileUpdateRequest = profile => (store) => {
  const { token } = store.getState();
  return superagent.put(`${API_URL}/profile`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(profile)
    .then((response) => {
      return store.dispatch(setProfile(response.body));
    });
};

const profileDeleteRequest = profile => (store) => {
  const { token } = store.getState();
  return superagent.delete(`${API_URL}/profile/${profile._id}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(profile)
    .then(() => {
      return store.dispatch(removeProfile(profile));
    });
};

export { profileUpdateRequest, profileFetchRequest, profileDeleteRequest };
