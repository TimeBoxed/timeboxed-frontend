import superagent from 'superagent';

const setPreferences = preferences => ({
  type: 'PREFERENCES_SET',
  payload: preferences,
});

const preferencesFetchRequest = () => (store) => {
  const { token, profile } = store.getState();
  const preferencesId = profile.preferences;
  return superagent.get(`${API_URL}/preferences/${preferencesId}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .then((response) => {
      return store.dispatch(setPreferences(response.body));
    });
};

const preferencesUpdateRequest = preferences => (store) => {
  const { token, profile } = store.getState();
  const preferencesId = profile.preferences;
  return superagent.put(`${API_URL}/preferences/${preferencesId}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(preferences)
    .then((response) => {
      return store.dispatch(setPreferences(response.body));
    });
};

export { setPreferences, preferencesUpdateRequest, preferencesFetchRequest };
