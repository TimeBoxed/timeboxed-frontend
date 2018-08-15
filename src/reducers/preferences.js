const D23_002 = 'No preferences received to set.';

const validatePreferences = (profile) => {
  if (!profile) throw new Error(D23_002);
};

export default (state = null, { type, payload }) => {
  switch (type) {
    case 'PREFERENCES_SET':
      validatePreferences(payload);
      return payload;
    case 'TOKEN_REMOVE':
      return null;
    default:
      return state;
  }
};
