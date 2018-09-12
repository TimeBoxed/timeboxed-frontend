import preferencesReducer from '../../reducers/preferences';

describe('PREFERENCES_REDUCER_TESTING', () => {
  const mockState = {
    token: 'token',
    profile: {},
    tasks: [],
    preferences: {
      phoneNumber: '1234567890',
      email: 'test1@test.com',
      agendaReceiveTime: '09:30',
      taskLengthDefault: 30,
      breatherTime: 15,
      selectedCalendar: {},
      profile: 1, // profile _id
    },
  };

  test('PREFERENCES_SET', () => {
    const setAction = {
      type: 'PREFERENCES_SET',
      payload: mockState.preferences,
    };
    expect(preferencesReducer(mockState.preferences, setAction)).toEqual(mockState.preferences);
  });

  test('PREFERENCES_SET_ERROR', () => {
    const errorAction = {
      type: 'PREFERENCES_SET',
      payload: null,
    };
    expect(() => preferencesReducer(mockState.preferences, errorAction)).toThrowError('No preferences received to set.');
  });

  test('TOKEN_REMOVE', () => {
    const removeAction = {
      type: 'TOKEN_REMOVE',
      payload: mockState.token,
    };
    expect(preferencesReducer(mockState.token, removeAction)).toBeNull();
  });

  test('DEFAULT', () => {
    const defaultAction = {
      type: 'DEFAULT',
      payload: mockState,
    };
    expect(preferencesReducer(mockState, defaultAction)).toEqual(mockState);
  });
});
