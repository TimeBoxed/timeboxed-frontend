export default (state = [], { type, payload }) => {
  switch (type) {
    case 'TASK_SET':
      if (state.indexOf(payload) < 0 && payload.completed === false) {
        return [payload, ...state];
      }
      return state;
    case 'TASKS_GET':
      return payload.filter(task => task.completed === false);
    case 'TASK_REMOVE':
      return state.filter(task => task._id !== payload._id);
    case 'TASKS_BULK_REMOVE':
      return state.filter(task => payload.indexOf(task._id) === -1);
    case 'TASK_UPDATE':
      if (payload.completed === false) {
        const newState = state.map(task => (task._id !== payload._id ? task : payload));
        if (newState.indexOf(payload) < 0) {
          return [payload, ...state];
        }
        return newState;
      } 
      return state.filter(task => task._id !== payload._id);
    case 'TASK_BULK_UPDATE':
      return payload.filter(task => task.completed === false);
    case 'TOKEN_REMOVE':
      return [];  
    default:
      return state;
  }
};
