import superagent from 'superagent';

const setTask = task => ({
  type: 'TASK_SET',
  payload: task,
});

const updateTask = task => ({
  type: 'TASK_UPDATE',
  payload: task,
});

const updateBulkTasks = tasks => ({
  type: 'TASK_BULK_UPDATE',
  payload: tasks,
});

const getTasks = tasks => ({
  type: 'TASKS_GET',
  payload: tasks,
});

const deleteBulkTasks = tasks => ({
  type: 'TASKS_BULK_REMOVE',
  payload: tasks,
});

const taskCreateRequest = task => (store) => {
  const { token, profile } = store.getState();
  return superagent.post(`${API_URL}/tasks`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send({ ...task, profile: profile._id })
    .then((response) => {
      return store.dispatch(setTask(response.body));
    });
};

const fetchAllTasks = () => (store) => {
  const { token, profile } = store.getState();
  return superagent.get(`${API_URL}/tasks/${profile._id}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .then((response) => {
      return store.dispatch(getTasks(response.body));
    });
};

const taskUpdateStatus = (task, completed, order) => (store) => {
  const { token } = store.getState();
  return superagent.put(`${API_URL}/tasks/${task}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send({ completed, order })
    .then((response) => {
      return store.dispatch(updateTask(response.body));
    });
};

const taskUpdateRequest = task => (store) => {
  const { token } = store.getState();
  return superagent.put(`${API_URL}/tasks/${task._id}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(task)
    .then((response) => {
      return store.dispatch(updateTask(response.body));
    });
};

const tasksBulkUpdateRequest = tasks => (store) => {
  const { token } = store.getState();
  return superagent.put(`${API_URL}/tasks`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(tasks)
    .then((response) => {
      return store.dispatch(updateBulkTasks(response.body));
    });
};

const tasksDeleteRequest = tasks => (store) => {
  const { token } = store.getState();
  return superagent.delete(`${API_URL}/tasks`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(tasks)
    .then((response) => {
      return store.dispatch(deleteBulkTasks(response.body));
    });
};

export {
  taskCreateRequest,
  fetchAllTasks,
  taskUpdateStatus,
  taskUpdateRequest,
  tasksDeleteRequest,
  tasksBulkUpdateRequest,
};
