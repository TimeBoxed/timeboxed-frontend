const D23_001 = 'Profile is required';

const validateProfile = (profile) => {
  if (!profile) throw new Error(D23_001);
};

export default (state = null, { type, payload }) => {
  switch (type) {
    case 'CLIENT_PROFILE_SET':
      validateProfile(payload);
      return payload;
    case 'TOKEN_REMOVE':
      return null;
    case 'REQUEST_PROFILE_REMOVE':
      validateProfile(payload);
      return null;
    default:
      return state;
  }
};
