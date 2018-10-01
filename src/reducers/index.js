import { combineReducers } from 'redux';

import token from './token';
import profile from './profile';
import tasks from './task';
import completedTasks from './completedTasks';
import preferences from './preferences';
import ui from './ui';

export default combineReducers({
  token, profile, tasks, preferences, completedTasks, ui,
});
