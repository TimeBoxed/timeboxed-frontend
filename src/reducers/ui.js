const defaultState = {
  snackbar: {
    open: false,
    message: '',
    sbType: '',
  },
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'SNACKBAR_OPEN':
      return {
        ...state,
        snackbar: payload,
      };
    case 'SNACKBAR_CLOSE':
      return {
        ...state,
        snackbar: defaultState.snackbar,
      };
    case 'TOKEN_REMOVE':
      return {};
    default:
      return state;
  }
};
