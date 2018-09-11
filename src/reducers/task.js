export default (state = [], { type, payload }) => {
  switch (type) {
    case 'TASK_SET':
      if (state.indexOf(payload) < 0) {
        return [payload, ...state];
      }
      return state;
    case 'TASKS_GET':
      return payload;
    case 'TASK_REMOVE':
      return state.filter(task => task._id !== payload._id);
    case 'TASKS_BULK_REMOVE':
      return state.filter(task => payload.indexOf(task) === -1);
    case 'TASK_UPDATE':
      return state.map(task => (task._id === payload._id ? payload : task));
    case 'TOKEN_REMOVE':
      return [];  
    default:
      return state;
  }
};
