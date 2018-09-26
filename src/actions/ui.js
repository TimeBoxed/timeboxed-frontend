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

export { openSnackbar, closeSnackbar };
