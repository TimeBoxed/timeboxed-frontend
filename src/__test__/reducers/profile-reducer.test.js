import profileReducer from '../../reducers/profile';

describe('PROFILE_REDUCER_TESTING', () => {
  const testState = {
    token: 'token',
    profile: {
      username: 'testName',
      email: 'testEmail',
      phoneNumber: '1234567890',
      privacySigned: true,
      account: 1,
      calendars: [],
    },
    tasks: [],
    preferences: {},
  };

  test('CLIENT_PROFILE_SET', () => {
    const setAction = {
      type: 'CLIENT_PROFILE_SET',
      payload: testState.profile,
    };
    expect(profileReducer(testState.profile, setAction)).toEqual(testState.profile);
  });

  test('CLIENT_PROFILE_SET_ERROR', () => {
    const errorAction = {
      type: 'CLIENT_PROFILE_SET',
      payload: null,
    };
    expect(() => profileReducer(testState.profile, errorAction)).toThrowError('Profile is required');
  });

  test('TOKEN_REMOVE', () => {
    const removeAction = {
      type: 'TOKEN_REMOVE',
      payload: testState.token,
    };
    expect(profileReducer(testState.token, removeAction)).toBeNull();
  });

  test('REQUEST_PROFILE_REMOVE', () => {
    const removeProfileAction = {
      type: 'REQUEST_PROFILE_REMOVE',
      payload: testState.profile,
    };
    expect(profileReducer(testState.profile, removeProfileAction)).toBeNull();
  });

  test('DEFAULT', () => {
    const defaultAction = {
      type: 'DEFAULT',
      payload: testState,
    };
    expect(profileReducer(testState, defaultAction)).toEqual(testState);
  });
});
