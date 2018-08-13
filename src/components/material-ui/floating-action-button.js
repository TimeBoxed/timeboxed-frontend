import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  fab: {
    display: 'none',

    [theme.breakpoints.up('sm')]: {
      display: 'block',
      position: 'absolute',
      bottom: '1rem',
      right: '1rem',
      margin: theme.spacing.unit,
    },
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class AddFAB extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Button variant="fab" color="primary" aria-label="add" className={classes.fab}>
        <AddIcon />
      </Button>
    );
  }
}

AddFAB.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddFAB);
