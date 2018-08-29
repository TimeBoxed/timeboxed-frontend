import superagent from 'superagent';

const TEMP_API_URL = 'http://localhost:3000';

const setTask = task => ({
  type: 'TASK_SET',
  payload: task,
});

const updateTask = task => ({
  type: 'TASK_UPDATE',
  payload: task,
});

const getTasks = tasks => ({
  type: 'TASKS_GET',
  payload: tasks,
});

const taskCreateRequest = task => (store) => {
  const { token, profile } = store.getState();
  return superagent.post(`${TEMP_API_URL}/tasks`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send({ ...task, profile: profile._id })
    .then((response) => {
      return store.dispatch(setTask(response.body));
    });
};

const fetchAllTasks = () => (store) => {
  const { token, profile } = store.getState();
  return superagent.get(`${TEMP_API_URL}/tasks/${profile._id}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .then((response) => {
      return store.dispatch(getTasks(response.body));
    });
};

const taskUpdateStatus = (task, completed) => (store) => {
  const { token } = store.getState();
  return superagent.put(`${TEMP_API_URL}/tasks/${task}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send({ completed })
    .then((response) => {
      return store.dispatch(updateTask(response.body));
    });
};

export { 
  setTask,
  getTasks,
  updateTask,
  taskCreateRequest,
  fetchAllTasks,
  taskUpdateStatus,
};
