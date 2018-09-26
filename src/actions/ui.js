const openSnackbar = (sbType, message) => ({
  type: 'SNACKBAR_OPEN',
  payload: {
    open: true,
    sbType,
    message,
  },
});

const closeSnackbar = () => ({
  type: 'SNACKBAR_CLOSE',
});

const ERROR_MESSAGE = 'Something went wrong. Please try your request again.';

const triggerSnackbar = (type, message = ERROR_MESSAGE) => (store) => {
  store.dispatch(openSnackbar(type, message));
  setTimeout(() => store.dispatch(closeSnackbar()), 2000);
};

export { triggerSnackbar }; // eslint-disable-line
