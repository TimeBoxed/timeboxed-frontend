import { combineReducers } from 'redux';

import token from './token';
import profile from './profile';
import tasks from './task';
import preferences from './preferences';

export default combineReducers({
  token, profile, tasks, preferences,
});
