import { combineReducers } from 'redux';

import token from './token';
import profile from './profile';
import tasks from './task';

export default combineReducers({
  token, profile, tasks,
});
