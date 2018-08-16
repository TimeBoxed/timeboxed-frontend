import superagent from 'superagent';

const TEMP_API_URL = 'http://localhost:3000';

const setPreferences = preferences => ({
  type: 'PREFERENCES_SET',
  payload: preferences,
});

const preferencesFetchRequest = () => (store) => {
  const { token, profile } = store.getState();
  console.log(profile);
  const preferencesId = profile.preferences;
  return superagent.get(`${TEMP_API_URL}/preferences/${preferencesId}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .then((response) => {
      return store.dispatch(setPreferences(response.body));
    });
};

const preferencesUpdateRequest = preferences => (store) => {
  const { token, profile } = store.getState();
  const preferencesId = profile.preferences;
  return superagent.put(`${TEMP_API_URL}/preferences/${preferencesId}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(preferences)
    .then((response) => {
      return store.dispatch(setPreferences(response.body));
    });
};

export { preferencesUpdateRequest, preferencesFetchRequest };
