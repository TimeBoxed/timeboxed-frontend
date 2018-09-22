import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  spinnerContainer: {
    margin: '200px auto',
  },
});

const CircularIndeterminate = (props) => {
  const { classes } = props;
  return (
    <div className={classes.spinnerContainer}>
      <CircularProgress className={classes.progress} size={100} color="primary"/>
    </div>
  );
};

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

CircularIndeterminate.defaultProps = {
  classes: {},
};

export default withStyles(styles)(CircularIndeterminate);
