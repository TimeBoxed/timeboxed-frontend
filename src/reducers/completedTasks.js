export default (state = [], { type, payload }) => {
  switch (type) {
    case 'TASK_SET':
      if (state.indexOf(payload) < 0 && payload.completed === true) {
        return [payload, ...state];
      }
      return state;
    case 'TASKS_GET':
      return payload.filter(task => task.completed === true);
    case 'TASK_REMOVE':
      return state.filter(task => task._id !== payload._id && task.completed === true);
    case 'TASKS_BULK_REMOVE':
      return state.filter(task => payload.indexOf(task._id) === -1);
    case 'TASK_UPDATE':
      if (payload.completed === true) {
        const newState = state.map(task => (task._id !== payload._id ? task : payload));
        if (newState.indexOf(payload) < 0) {
          return [payload, ...state];
        }
        return newState;
      }
      return state.filter(task => task._id !== payload._id);
    case 'TOKEN_REMOVE':
      return [];
    default:
      return state;
  }
};
